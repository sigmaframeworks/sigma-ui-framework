// UI Toggle Switch
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, bindingMode} from "aurelia-framework";
import {UIEvent} from "../utils/ui-event";

@autoinject()
@customElement('ui-switch')
export class UISwitch {
    private __id = `auf-${__seed++}`;
    private __input: Element;
    private __switch: HTMLElement;
    private __label: Element;
    private __theme: string;
    private __checked: boolean;

	/**
	 * @property    label-on
	 * @type        string
	 */
    @bindable()
    onLabel: string = 'On';
	/**
	 * @property    label-off
	 * @type        string
	 */
    @bindable()
    offLabel: string = 'Off';
	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable()
    disabled: boolean = false;
	/**
	 * @property    width
	 * @type        number
	 */
    @bindable()
    width: any;
	/**
	 * @property    value
	 * @type        any
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: any = false;
    /**
  	 * @property    onValue
  	 * @type        any
  	 */
    @bindable()
    onValue: any = true;
    /**
  	 * @property    onValue
  	 * @type        any
  	 */
    @bindable()
    offValue: any = false;

    constructor(public element: Element) {

    }

    bind() {
        // check theme attributes
        if (this.element.hasAttribute('primary')) this.__theme = 'primary';
        if (this.element.hasAttribute('info')) this.__theme = 'info';
        if (this.element.hasAttribute('danger')) this.__theme = 'danger';
        if (this.element.hasAttribute('success')) this.__theme = 'success';
        if (this.element.hasAttribute('warning')) this.__theme = 'warning';
        if (this.element.hasAttribute('ampm')) this.__theme = 'ampm';
        if (this.element.hasAttribute('gender')) this.__theme = 'gender';

        this.__checked = this.value === this.onValue;
        this.disabled = isTrue(this.disabled);
    }

    attached() {
        if (!isNaN(this.width)) this.__switch.style.width = parseInt(this.width) + 'em';
        this.__switch.classList.add(`ui-switch-${this.__theme}`);
        this.disable();
    }

    disable(disabled?) {
        if (this.__input.attributes.getNamedItem('disabled') !== null) {
            this.__input.attributes.removeNamedItem('disabled');
        }
        if (this.__label.attributes.getNamedItem('disabled') !== null) {
            this.__label.attributes.removeNamedItem('disabled');
        }
        if (disabled === true || this.disabled === true) {
            this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
            this.__label.attributes.setNamedItem(document.createAttribute('disabled'));
        }
    }

    valueChanged(newValue) {
        this.__checked = this.value === this.onValue;
    }

    disabledChanged(newValue) {
        this.disabled = isTrue(newValue);
        this.disable();
    }

    checkChanged($event) {
        this.value = this.__checked ? this.onValue : this.offValue;
        $event.cancelBubble = true;
        UIEvent.fireEvent('change', this.element, this.value);
    }

    onFocus() {
        this.__switch.classList.add('ui-focus');
    }

    onBlur() {
        this.__switch.classList.remove('ui-focus');
    }
}
