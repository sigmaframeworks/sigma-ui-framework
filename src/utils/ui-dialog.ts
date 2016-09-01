// UI Dialog Service
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject} from "aurelia-framework";
import {_, UIUtils} from "./ui-utils";
import {UIEvent} from "./ui-event";
import {Origin} from "aurelia-metadata";
import {
    customElement,
    useView,
    singleton,
    Container,
    View,
    ViewCompiler,
    ViewResources,
    CompositionEngine,
    ViewSlot
} from "aurelia-framework";
import {child} from "aurelia-templating";

@autoinject()
@singleton()
export class UIDialogService {
    private dialogContainer;
    private taskBar;

    private __active;
    private __windows = [];

    constructor(private compiler: ViewCompiler,
        private container: Container,
        private resources: ViewResources,
        private compositionEngine: CompositionEngine) {
    }

    show(vm, model?) {
        if (!this.dialogContainer) {
            this.dialogContainer = document.body.querySelector('.ui-viewport .ui-dialog-container');

            this.dialogContainer.addEventListener('close', (e: any) => this.__closeDialog(e.detail));
            this.dialogContainer.addEventListener('collapse', (e) => this.__collapse(e));
            this.dialogContainer.addEventListener('mousedown', (e) => this.moveStart(e));
            this.dialogContainer.addEventListener('mousemove', (e) => this.move(e));
            this.dialogContainer.addEventListener('mouseup', () => this.moveEnd());
        }
        if (!this.taskBar) {
            this.taskBar = document.body.querySelector('.ui-viewport .ui-app-taskbar');
            if (this.taskBar) this.taskBar.addEventListener('click', (e) => this.__taskClick(e.target['window']));
        }

        let instruction: any = {
            viewModel: vm,
            container: this.container,
            childContainer: this.container.createChild(),
            model: model ? model : {}
        };
        return this.__getViewModel(instruction)
            .then(newInstruction => {
                let viewModel: any = <any>newInstruction.viewModel;
                return this.__invokeLifecycle(viewModel, 'canActivate', model)
                    .then(canActivate => {
                        if (canActivate) {
                            return this.compositionEngine.createController(instruction)
                                .then(controller => {
                                    controller.automate();

                                    let view = this.__createDialog(controller.viewModel);

                                    let childSlot: any = new ViewSlot(view['fragment'].querySelector('.ui-dialog'), true);
                                    childSlot.add(controller.view);
                                    childSlot.viewModel = controller.viewModel;
                                    childSlot.attached();

                                    let slot = new ViewSlot(this.dialogContainer, true);
                                    slot.add(view);
                                    slot.attached();

                                    this.__initDialog(controller.viewModel);
                                });
                        }
                    });
            });
    }

    private __createDialog(vm) {
        if (!(vm instanceof UIDialog)) throw new Error("ViewModel must extend from UIDialog");

        var viewFactory = this.compiler.compile('<template><div class="${modal?\'ui-modal\':\'\'} ui-dialog-wrapper" ref="__dialogWrapper">' +
            '<div class="ui-dialog ${__active?\'ui-active\':\'ui-inactive\'}" ref="__dialog" css.bind="__current">' +
            '<ui-header primary close="true" close.trigger="close($event)" ' +
            'expand.trigger="expand($event)" collapse.trigger="collapse($event)" ' +
            'icon="${icon}" collapse="${!modal}" expand="${maximize}">${title}</ui-header>' +
            '<span class="ui-resizer fi-ui" if.bind="resize"></span>' +
            '</div></div></template>', this.resources);
        let view = viewFactory.create(this.container);
        if (vm.modal) {
            vm.__current.top = 0;
            vm.__current.left = 0;
        }
        view.bind(vm);
        return view;
    }

    private __getViewModel(instruction) {
        if (typeof instruction.viewModel === 'function') {
            instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
        }

        if (typeof instruction.viewModel === 'string') {
            return this.compositionEngine.ensureViewModel(instruction);
        }

        return Promise.resolve(instruction);
    }

    private __invokeLifecycle(instance, name, model) {
        if (instance && typeof instance[name] === 'function') {
            let result = instance[name](model);

            if (result instanceof Promise) {
                return result;
            }

            if (result !== null && result !== undefined) {
                return Promise.resolve(result);
            }

            return Promise.resolve(true);
        }

        return Promise.resolve(true);
    }

    private __initDialog(dialog) {
        dialog.__current.width = dialog.width || '600px';
        dialog.__current.height = dialog.height || '400px';
        if (!dialog.modal) {
            this.__windows.push(dialog);

            dialog.__taskButton = document.createElement('button');
            dialog.__taskButton.classList.add('ui-button');
            dialog.__taskButton.classList.add('ui-active');
            dialog.__taskButton.classList.add('ui-button-default');
            dialog.__taskButton.innerHTML = `<span class="${dialog.icon}"></span>${dialog.title}`;
            dialog.__taskButton.window = dialog;
            this.taskBar.appendChild(dialog.__taskButton);

            this.__changeActive(dialog);
        }
    }

    private __closeDialog(dialog) {
        this.__invokeLifecycle(dialog, 'canDeactivate', null)
            .then(
            canDeactivate => {
                if (canDeactivate) {
                    dialog.__dialog.viewSlot.detached();
                    dialog.__dialogWrapper.remove();

                    _.remove(this.__windows, ['__id', dialog.__id]);
                    if (!dialog.modal) {
                        dialog.__taskButton.remove();
                        this.__setNextActive();
                    }

                    this.__invokeLifecycle(dialog, 'unbind', null);
                    this.__invokeLifecycle(dialog, 'deactivate', null);
                }
            });
    }

    private __setNextActive() {
        let nextActive;
        if (!isEmpty(nextActive = _.findLast(this.__windows, ['__minimized', false]))) {
            this.__changeActive(nextActive);
        }
    }

    private __collapse($event) {
        $event.detail.__minimized = true;
        $event.detail.__dialog.classList.add('ui-minimize');
        $event.detail.__taskButton.classList.remove('ui-active');
        if ($event.detail.__id === this.__active.__id) this.__setNextActive();
    }

    private __taskClick(dialog) {
        if (!dialog) return;
        if (dialog.__minimized === true) {
            dialog.__minimized = false;
            dialog.__dialog.classList.remove('ui-minimize');
            this.__changeActive(dialog);
        }
        else {
            this.__collapse({ detail: dialog });
        }
    }

    private __changeActive(dialog) {
        if (!isEmpty(this.__active)) {
            this.__active.__active = false;
            if (!this.__active.modal) this.__active.__taskButton.classList.remove('ui-active');
        }
        this.__active = dialog;
        dialog.__active = true;
        if (!dialog.modal) dialog.__taskButton.classList.add('ui-active');
    }

	/**
	 * dialog move
	 */
    private __isDragging = false;
    private __isResizing = false;
    private __startX = 0;
    private __startY = 0;
    private __dialog;

    private moveStart($event) {
        this.__dialog = getParentByClass($event.target, 'ui-dialog');
        if (this.__dialog === null) return;
        let dialog: any = this.__dialog.viewSlot.viewModel;
		/*if ($($event.target)
		 .closest('.ui-lang-select').length == 0 && !$($event.target)
		 .closest('.ui-button')
		 .hasClass('ui-dropdown')) {
		 $('.ui-dropdown')
		 .removeClass('ui-dropdown');
		 }*/

        if (getParentByClass($event.target, 'ui-header-button') !== null) {
            return;
        }
        if ($event.button != 0) {
            return;
        }
        if (!dialog.modal) this.__changeActive(dialog);
        if (getParentByClass($event.target, 'ui-resizer') === null &&
            getParentByClass($event.target, 'ui-header') === null) {
            return;
        }

        this.__startX = ($event.x || $event.clientX);
        this.__startY = ($event.y || $event.clientY);
        this.__isDragging = true;
        this.__isResizing = $event.target.classList.contains('ui-resizer');

        if (this.__isResizing && !dialog.resize) {
            this.__isDragging = false;
            this.__isResizing = false;
            return;
        }
        else if (!this.__isResizing && (!dialog.drag || dialog.modal)) {
            this.__isDragging = false;
            this.__isResizing = false;
            return;
        }

        this.__dialog.classList.add('ui-dragging');
        this.dialogContainer.classList.add('ui-dragging');
    }

    private moveEnd() {
        if (!this.__isDragging || this.__dialog == null) {
            return;
        }
        this.__dialog.classList.remove('ui-dragging');
        this.dialogContainer.classList.remove('ui-dragging');
        this.__isDragging = false;
        this.__dialog = null;
    }

    private move($event) {
        if (!this.__isDragging) {
            return;
        }

        let x = ($event.x || $event.clientX) - this.__startX;
        let y = ($event.y || $event.clientY) - this.__startY;

        let t = convertToPx(this.__dialog.style.top, this.__dialog);
        let l = convertToPx(this.__dialog.style.left, this.__dialog);
        let w = convertToPx(this.__dialog.style.width, this.__dialog);
        let h = convertToPx(this.__dialog.style.height, this.__dialog);
        let pw = this.dialogContainer.offsetWidth;
        let ph = this.dialogContainer.offsetHeight;
        if (!this.__isResizing) {
            if (l + x < 16) {
                x = 0;
                l = 16;
            }
            if (t + y < 16) {
                y = 0;
                t = 16;
            }
            if (l + x + w + 16 > pw) {
                x = 0;
                l = pw - w - 16;
            }
            if (t + y + h + 42 > ph) {
                y = 0;
                t = ph - h - 42;
            }
            this.__dialog.style.top = (t + y) + 'px';
            this.__dialog.style.left = (l + x) + 'px';
        }
        else {
            if (l + x + w + 16 > pw) x = 0;
            if (t + y + h + 42 > ph) y = 0;

            this.__dialog.style.width = (w + x) + 'px';
            this.__dialog.style.height = (h + y) + 'px';
        }

        this.__startX = x !== 0 ? ($event.x || $event.clientX) : this.__startX;
        this.__startY = y !== 0 ? ($event.y || $event.clientY) : this.__startY;
    }
}

export class UIDialog {
    static __id = 0;
    static __x = 0;
    static __y = 30;

    private __id = `win-${UIDialog.__id++}`;
    private __dialog;
    private __dialogWrapper;

    private __active = true;
    private __minimized = false;

    private __taskButton;

    private __current: any = {
        top: UIDialog.__y + 'px',
        left: (UIDialog.__x += 30) + 'px',
        height: '400px', width: '600px'
    };

    public icon;
    public title = 'Dialog';
    public width = '';
    public height = '';
    public modal: boolean = false;
    public drag: boolean = true;
    public resize: boolean = true;
    public maximize: boolean = true;

    bind() {
        this.__current.width = this.width || this.__current.width;
        this.__current.height = this.height || this.__current.height;
    }

    close($event?) {
        if ($event) $event.cancelBubble = true;
        UIEvent.fireEvent('close', this.__dialogWrapper, this);
    }

    focus() {
        UIEvent.queueTask(() => {
            let el: any = this.__dialog.querySelector('ui-input input,textarea,ui-phone input,ui-combo input');
            if (!isEmpty(el)) el.focus();
        });
    }

    expand($event) {
        if ($event) $event.cancelBubble = true;
        this.__dialog.classList.toggle('ui-maximize');
    }

    collapse($event) {
        if ($event) $event.cancelBubble = true;
        UIEvent.fireEvent('collapse', this.__dialogWrapper, this);
    }

    toast(config) {
        if (typeof config === 'string') config = { message: config };
        config.extraClass = 'ui-page-toast';
        UIUtils.showToast(this.__dialog, config);
    }
}
