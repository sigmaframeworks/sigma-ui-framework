var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-utils", "./ui-event", "aurelia-metadata", "aurelia-framework", "lodash"], function (require, exports, aurelia_framework_1, ui_utils_1, ui_event_1, aurelia_metadata_1, aurelia_framework_2, _) {
    "use strict";
    var UIDialogService = (function () {
        function UIDialogService(compiler, container, resources, compositionEngine) {
            this.compiler = compiler;
            this.container = container;
            this.resources = resources;
            this.compositionEngine = compositionEngine;
            this.__windows = [];
            this.__isDragging = false;
            this.__isResizing = false;
            this.__startX = 0;
            this.__startY = 0;
        }
        UIDialogService.prototype.show = function (vm, model) {
            var _this = this;
            if (!this.__inited) {
                this.__inited = true;
                if (ui_utils_1.UIUtils.dialogContainer) {
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('close', function (e) { return _this.__closeDialog(e.detail); });
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('collapse', function (e) { return _this.__collapse(e); });
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('mousedown', function (e) { return _this.moveStart(e); });
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('mousemove', function (e) { return _this.move(e); });
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('mouseup', function () { return _this.moveEnd(); });
                }
                if (ui_utils_1.UIUtils.taskbar)
                    ui_utils_1.UIUtils.taskbar.addEventListener('click', function (e) { return _this.__taskClick(e.target['window']); });
            }
            var instruction = {
                viewModel: vm,
                container: this.container,
                childContainer: this.container.createChild(),
                model: model ? model : {}
            };
            return this.__getViewModel(instruction)
                .then(function (newInstruction) {
                var viewModel = newInstruction.viewModel;
                return _this.__invokeLifecycle(viewModel, 'canActivate', model)
                    .then(function (canActivate) {
                    if (canActivate != false) {
                        return _this.compositionEngine.createController(instruction)
                            .then(function (controller) {
                            controller.automate();
                            var view = _this.__createDialog(controller.viewModel);
                            var childSlot = new aurelia_framework_2.ViewSlot(view['fragment'].querySelector('.ui-dialog'), true);
                            childSlot.add(controller.view);
                            childSlot.viewModel = controller.viewModel;
                            childSlot.attached();
                            var slot = new aurelia_framework_2.ViewSlot(ui_utils_1.UIUtils.dialogContainer, true);
                            slot.add(view);
                            slot.attached();
                            _this.__initDialog(controller.viewModel);
                        });
                    }
                });
            });
        };
        UIDialogService.prototype.__createDialog = function (vm) {
            if (!(vm instanceof UIDialog))
                throw new Error("ViewModel must extend from UIDialog");
            var viewFactory = this.compiler.compile("<template><div class=\"${modal?'ui-modal':''} ui-dialog-wrapper\" ref=\"__dialogWrapper\">\n      <div class=\"ui-dialog ${__active?'ui-active':'ui-inactive'}\" ref=\"__dialog\" css.bind=\"__current\">\n      <ui-header primary>\n      \n        <ui-header-icon icon=\"${icon}\" if.bind=\"icon\"></ui-header-icon>\n        <ui-header-title>${title}</ui-header-title>\n        <ui-header-tool minimize click.trigger=\"collapse($event)\" if.bind=\"!modal\"></ui-header-tool>\n        <ui-header-tool maximize click.trigger=\"expand($event)\" if.bind=\"maximize\"></ui-header-tool>\n        <ui-header-tool close click.trigger=\"close($event)\" ></ui-header-tool>\n      \n      </ui-header>\n      <span class=\"ui-resizer fi-ui-dialog-resize\" if.bind=\"resize\"></span>\n      </div></div></template>", this.resources);
            var view = viewFactory.create(this.container);
            if (vm.modal) {
                vm.__current.top = '0px';
                vm.__current.left = '0px';
            }
            view.bind(vm);
            return view;
        };
        UIDialogService.prototype.__getViewModel = function (instruction) {
            if (typeof instruction.viewModel === 'function') {
                instruction.viewModel = aurelia_metadata_1.Origin.get(instruction.viewModel).moduleId;
            }
            if (typeof instruction.viewModel === 'string') {
                return this.compositionEngine.ensureViewModel(instruction);
            }
            return Promise.resolve(instruction);
        };
        UIDialogService.prototype.__invokeLifecycle = function (instance, name, model) {
            if (instance && typeof instance[name] === 'function') {
                var result = instance[name](model);
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        };
        UIDialogService.prototype.__initDialog = function (dialog) {
            dialog.__current.width = dialog.width || '600px';
            dialog.__current.height = dialog.height || '400px';
            if (!dialog.modal) {
                this.__windows.push(dialog);
                dialog.__taskButton = document.createElement('button');
                dialog.__taskButton.classList.add('ui-button');
                dialog.__taskButton.classList.add('ui-active');
                dialog.__taskButton.classList.add('ui-small');
                dialog.__taskButton.classList.add('ui-button-default');
                dialog.__taskButton.innerHTML = "<span class=\"" + dialog.icon + "\"></span>&nbsp;<span class=\"ui-label\">" + dialog.title + "</span>";
                dialog.__taskButton.window = dialog;
                if (ui_utils_1.UIUtils.taskbar)
                    ui_utils_1.UIUtils.taskbar.appendChild(dialog.__taskButton);
                this.__changeActive(dialog);
            }
        };
        UIDialogService.prototype.__closeDialog = function (dialog) {
            var _this = this;
            if (!dialog)
                return;
            this.__invokeLifecycle(dialog, 'canDeactivate', null)
                .then(function (canDeactivate) {
                if (canDeactivate) {
                    dialog.__dialog.viewSlot.detached();
                    dialog.__dialogWrapper.remove();
                    _.remove(_this.__windows, ['__id', dialog.__id]);
                    if (!dialog.modal) {
                        dialog.__taskButton.remove();
                        _this.__setNextActive();
                    }
                    _this.__invokeLifecycle(dialog, 'unbind', null);
                    _this.__invokeLifecycle(dialog, 'deactivate', null);
                }
            });
        };
        UIDialogService.prototype.__setNextActive = function () {
            var nextActive;
            if (!isEmpty(nextActive = _.findLast(this.__windows, ['__minimized', false]))) {
                this.__changeActive(nextActive);
            }
        };
        UIDialogService.prototype.__collapse = function ($event) {
            $event.detail.__minimized = true;
            $event.detail.__dialog.classList.add('ui-minimize');
            $event.detail.__taskButton.classList.remove('ui-active');
            if ($event.detail.__id === this.__active.__id)
                this.__setNextActive();
        };
        UIDialogService.prototype.__taskClick = function (dialog) {
            if (!dialog)
                return;
            if (dialog.__minimized === true) {
                dialog.__minimized = false;
                dialog.__dialog.classList.remove('ui-minimize');
                this.__changeActive(dialog);
            }
            else if (dialog.__active !== true) {
                this.__changeActive(dialog);
            }
            else {
                this.__collapse({ detail: dialog });
            }
        };
        UIDialogService.prototype.__changeActive = function (dialog) {
            if (!isEmpty(this.__active)) {
                this.__active.__active = false;
                if (!this.__active.modal)
                    this.__active.__taskButton.classList.remove('ui-active');
            }
            this.__active = dialog;
            dialog.__active = true;
            if (!dialog.modal)
                dialog.__taskButton.classList.add('ui-active');
        };
        UIDialogService.prototype.moveStart = function ($event) {
            this.__dialog = getParentByClass($event.target, 'ui-dialog');
            if (this.__dialog === null)
                return;
            var dialog = this.__dialog.viewSlot.viewModel;
            if (getParentByClass($event.target, 'ui-header-button') !== null) {
                return;
            }
            if ($event.button != 0) {
                return;
            }
            if (!dialog.modal)
                this.__changeActive(dialog);
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
            ui_utils_1.UIUtils.dialogContainer.classList.add('ui-dragging');
        };
        UIDialogService.prototype.moveEnd = function () {
            if (!this.__isDragging || this.__dialog == null) {
                return;
            }
            this.__dialog.classList.remove('ui-dragging');
            ui_utils_1.UIUtils.dialogContainer.classList.remove('ui-dragging');
            this.__isDragging = false;
            this.__dialog = null;
        };
        UIDialogService.prototype.move = function ($event) {
            if (!this.__isDragging) {
                return;
            }
            var x = ($event.x || $event.clientX) - this.__startX;
            var y = ($event.y || $event.clientY) - this.__startY;
            var t = convertToPx(this.__dialog.style.top, this.__dialog);
            var l = convertToPx(this.__dialog.style.left, this.__dialog);
            var w = convertToPx(this.__dialog.style.width, this.__dialog);
            var h = convertToPx(this.__dialog.style.height, this.__dialog);
            var pw = ui_utils_1.UIUtils.dialogContainer.offsetWidth;
            var ph = ui_utils_1.UIUtils.dialogContainer.offsetHeight;
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
                if (l + x + w + 16 > pw)
                    x = 0;
                if (t + y + h + 42 > ph)
                    y = 0;
                this.__dialog.style.width = (w + x) + 'px';
                this.__dialog.style.height = (h + y) + 'px';
            }
            this.__startX = x !== 0 ? ($event.x || $event.clientX) : this.__startX;
            this.__startY = y !== 0 ? ($event.y || $event.clientY) : this.__startY;
        };
        UIDialogService = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_2.singleton(), 
            __metadata('design:paramtypes', [aurelia_framework_2.ViewCompiler, aurelia_framework_2.Container, aurelia_framework_2.ViewResources, aurelia_framework_2.CompositionEngine])
        ], UIDialogService);
        return UIDialogService;
    }());
    exports.UIDialogService = UIDialogService;
    var UIDialog = (function () {
        function UIDialog() {
            this.__id = "win-" + UIDialog.__id++;
            this.__active = true;
            this.__minimized = false;
            this.__current = {
                top: UIDialog.__y + 'px',
                left: (UIDialog.__x += 30) + 'px',
                height: '400px', width: '600px'
            };
            this.title = 'Dialog';
            this.width = '';
            this.height = '';
            this.modal = false;
            this.drag = true;
            this.resize = true;
            this.maximize = true;
        }
        UIDialog.show = function (model) {
            if (!UIDialog.dlgService)
                UIDialog.dlgService = ui_utils_1.UIUtils.lazy(UIDialogService);
            UIDialog.dlgService.show(this, model);
        };
        UIDialog.prototype.bind = function () {
            this.__current.width = this.width || this.__current.width;
            this.__current.height = this.height || this.__current.height;
        };
        UIDialog.prototype.close = function ($event) {
            if ($event)
                $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('close', this.__dialogWrapper, this);
        };
        UIDialog.prototype.focus = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var el = _this.__dialog.querySelector('.ui-input-group .ui-input-control .ui-input');
                if (el !== null)
                    el.focus();
            });
        };
        UIDialog.prototype.expand = function ($event) {
            if ($event)
                $event.cancelBubble = true;
            this.__dialog.classList.toggle('ui-maximize');
        };
        UIDialog.prototype.collapse = function ($event) {
            if ($event)
                $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('collapse', this.__dialogWrapper, this);
        };
        UIDialog.prototype.toast = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            config.extraClass = 'ui-page-toast';
            ui_utils_1.UIUtils.showToast(config, this.__dialog);
        };
        UIDialog.__id = 0;
        UIDialog.__x = 0;
        UIDialog.__y = 30;
        return UIDialog;
    }());
    exports.UIDialog = UIDialog;
});
