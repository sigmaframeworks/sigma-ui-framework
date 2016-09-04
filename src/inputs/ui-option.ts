// UI Option Input
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, useView, bindingMode} from "aurelia-framework";
import {UIEvent} from "../utils/ui-event";
import {_, UIUtils} from "../utils/ui-utils";

export class UIOption {
    protected __id = `auf-${__seed++}`;
    protected __input: Element;

    protected checked = false;
    protected disabled = false;

    constructor(public element: Element) {
    }

    bind() {
        this.disabled = isTrue(this.disabled);
    }

    attached() {
        this.disable();
    }

    disable(disabled?) {
        if (this.__input.attributes.getNamedItem('disabled') !== null) {
            this.__input.attributes.removeNamedItem('disabled');
        }
        if (disabled === true || this.disabled === true) {
            this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
        }
    }

    disabledChanged(newValue) {
        this.disabled = isTrue(newValue);
        this.disable();
    }
}

@autoinject()
@useView('./ui-option.html')
@customElement('ui-checkbox')
export class UICheckbox extends UIOption {
    __type = 'checkbox';

	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable()
    disabled: boolean = false;
	/**
	 * @property    checked
	 * @type        boolean
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    checked: boolean = false;

    constructor(element: Element) {
        super(element);
    }

    bind() {
        super.bind();
        this.checked = isTrue(this.checked);
    }

    attached() {
        super.attached();
        this.element.classList.add('ui-checkbox');
    }

    valueChanged($event) {
        this.checked = !this.checked;
        $event.cancelBubble = true;
        UIEvent.fireEvent('change', this.element, this.checked);
    }
}

@autoinject()
@useView('./ui-option.html')
@customElement('ui-radio')
export class UIRadio extends UIOption {
    __type = 'radio';

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable()
    value: string = '';
	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable()
    disabled: boolean = false;
	/**
	 * @property    checked
	 * @type        boolean
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    checked: any = '';

    constructor(element: Element) {
        super(element);
    }

    attached() {
        if (!this.element.parentElement.classList.contains('ui-option-group')) {
            throw new Error('UIRadio must be a child of UIOptionGroup');
        }

        super.attached();
        this.element.classList.add('ui-radio');
    }

    valueChanged($event) {
        $event.cancelBubble = true;
        UIEvent.fireEvent('change', this.element, this.value);
    }
}

@useView('./ui-option-group.html')
@customElement('ui-option-group')
export class UIOptionGroup {
    private __label: Element;

    private __name = `auf-${__seed++}`;

	/**
	 * @property    label
	 * @type        string
	 */
    @bindable()
    label: string = '';
	/**
	 * @property    name
	 * @type        string
	 */
    @bindable()
    name: string = '';
	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: string;

    constructor(public element: Element) {
        if (this.element.hasAttribute('auto-width')) this.element.classList.add('ui-auto');
        if (this.element.hasAttribute('label-top')) this.element.classList.add('ui-label-top');
        if (this.element.hasAttribute('label-hide')) this.element.classList.add('ui-label-hide');
    }

    attached() {
        // Need to iterate to all inputs to set the name
        UIEvent.queueTask(() => {
            let radios = this.element.querySelectorAll('.ui-radio .ui-option-input');
            _.forEach(radios, (b: HTMLInputElement) => {
                b.setAttribute('name', this.name || this.__name);
                if (this.value + '' === b.value + '') {
                    b.setAttribute('checked', "true");
                    b.checked = true;
                }
            });
        });
        if (this.element.hasAttribute('required')) this.__label.classList.add('ui-required');
    }

    valueChanged(newValue) {
        let opt = <HTMLInputElement>this.element.querySelector(`.ui-option-input[value="${newValue}"]`);
        if (opt) {
            opt.setAttribute('checked', 'true');
            opt.checked = true;
        }
    }

    checkChanged($event) {
        let opt = <HTMLInputElement>this.element.querySelector(`.ui-option-input[value="${this.value}"]`);
        if (opt && this.value != $event.detail) {
            opt.setAttribute('checked', 'false');
            opt.checked = false;
        }
        this.value = $event.detail;
        $event.cancelBubble = true;
        UIEvent.fireEvent('change', this.element, this.value);
    }
}
