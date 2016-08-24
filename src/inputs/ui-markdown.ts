// UI Markdown Editor
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";

@autoinject()
@customElement('ui-markdown')
export class UIMarkdown extends UIInputGroup {
    private __help;
    private __close;
    private __preview;
    private __hidePreview;
    private __disableTools;

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: string = '';
	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable()
    disabled: boolean = false;
	/**
	 * @property    readonly
	 * @type        boolean
	 */
    @bindable()
    readonly: boolean = false;
	/**
	 * @property    placeholder
	 * @type        string
	 */
    @bindable()
    placeholder: string = '';

	/**
	 * @property    dir
	 * @type        string
	 */
    @bindable()
    dir: string = '';

	/**
	 * @property    rows
	 * @type        string
	 */
    @bindable()
    rows: string = '10';

    constructor(element: Element) {
        super(element);
    }

    bind() {
        super.bind();
        if (this.element.hasAttribute('full-view')) this.element.classList.add('ui-full-view');
        if (this.element.hasAttribute('side-view')) {
            this.__hidePreview = true;
            this.element.classList.add('ui-full-view');
            this.element.classList.add('ui-side-view');
        }
    }

    disable(disabled?) {
        super.disable(disabled);
        this.__disableTools = isTrue(disabled) || !this.__help.classList.contains('ui-hide') || !this.__preview.classList.contains('ui-hide');
    }

    toolClick($event) {
        let tool = <HTMLElement>getParentByTag($event.target, 'button');
        if (tool === null) return;
        let id = tool.dataset['id'];
        let start = this.__input.selectionStart,
            end = this.__input.selectionEnd,
            sub = (this.value || '').substr(start, end - start) || 'EditThis';

        var diff = 0;

        if (id == 'preview') {
            this.__toggle('preview');
        }
        else if (id == 'help') {
            this.__toggle('help');
        }
        else if (!this.disabled && !this.readonly) {
            if (id == 'h1') {
                diff = 3;
                this.value = this.value.substr(0, start) + `# ${sub}\n\n` + this.value.substr(end);
            }
            else if (id == 'h2') {
                diff = 4;
                this.value = this.value.substr(0, start) + `## ${sub}\n\n` + this.value.substr(end);
            }
            else if (id == 'h3') {
                diff = 5;
                this.value = this.value.substr(0, start) + `### ${sub}\n\n` + this.value.substr(end);
            }
            else if (id == 'h4') {
                diff = 6;
                this.value = this.value.substr(0, start) + `#### ${sub}\n\n` + this.value.substr(end);
            }
            else if (id == 'h5') {
                diff = 7;
                this.value = this.value.substr(0, start) + `##### ${sub}\n\n` + this.value.substr(end);
            }
            else if (id == 'h6') {
                diff = 8;
                this.value = this.value.substr(0, start) + `###### ${sub}\n\n` + this.value.substr(end);
            }
            else if (id == 'b') {
                diff = 2;
                this.value = this.value.substr(0, start) + ` __${sub}__ ` + this.value.substr(end);
            }
            else if (id == 'i') {
                diff = 1;
                this.value = this.value.substr(0, start) + ` _${sub}_ ` + this.value.substr(end);
            }
            else if (id == 's') {
                diff = 2;
                this.value = this.value.substr(0, start) + ` ~~${sub}~~ ` + this.value.substr(end);
            }
            else if (id == 'a') {
                diff = 1;
                this.value = this.value.substr(0, start) + ` [${sub}](Place_Url_Here) ` + this.value.substr(end);
            }
            else if (id == 'img') {
                diff = 2;
                this.value = this.value.substr(0, start) + ` ![${sub}](Place_Url_Here) ` + this.value.substr(end);
            }
            else if (id == 'ul') {
                diff = 1;
                sub = sub.replace(/^.+$/gm, (t) => `* ${t}`);
                this.value = this.value.substr(0, start) + `${sub}\n` + this.value.substr(end);
            }
            else if (id == 'ol') {
                diff = 1;
                var i = 1;
                sub = sub.replace(/^.+$/gm, (t) => `${i++ == 1 ? '1.' : '*'} ${t}`);
                this.value = this.value.substr(0, start) + `${sub}\n` + this.value.substr(end);
            }
            if (id != 'preview' && id != 'help') {
                this.__input.focus();
                this.__input.selectionStart = start + diff;
                this.__input.selectionEnd = start + diff + sub.length;
            }
        }
    }

    private __toggle(type) {
        if (type == 'close') {
            this.__help.classList.add('ui-hide');
            this.__close.classList.add('ui-hide');
            this.__preview.classList.add('ui-hide');
        }
        else if (type == 'help') {
            this.__help.classList.toggle('ui-hide');
            this.__preview.classList.add('ui-hide');
            this.__disableTools = isTrue(this.disabled) || !this.__help.classList.contains('ui-hide');
        }
        else if (type == 'preview') {
            this.__help.classList.add('ui-hide');
            this.__preview.classList.toggle('ui-hide');
            this.__disableTools = isTrue(this.disabled) || !this.__preview.classList.contains('ui-hide');
        }
    }
}
