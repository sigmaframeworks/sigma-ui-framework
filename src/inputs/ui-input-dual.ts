// UI Dual Input
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, useView, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";

@autoinject()
@useView("./ui-input.html")
@customElement('ui-input-dual')
export class UIInputDual extends UIInputGroup {
    private __dual = true;

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: string = '';
	/**
	 * @property    value-second
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    valueSecond: string = '';
	/**
	 * @property    checked
	 * @type        boolean
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    checked: boolean = false;
	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable() disabled: boolean = false;
	/**
	 * @property    readonly
	 * @type        boolean
	 */
    @bindable() readonly: boolean = false;

	/**
	 * @property    prefix-icon
	 * @type        string
	 */
    @bindable() prefixIcon: string;
	/**
	 * @property    prefix-text
	 * @type        string
	 */
    @bindable() prefixText: string;

	/**
	 * @property    suffix-icon
	 * @type        string
	 */
    @bindable() suffixIcon: string;
	/**
	 * @property    suffix-text
	 * @type        string
	 */
    @bindable() suffixText: string;

	/**
	 * @property    center-icon
	 * @type        string
	 */
    @bindable() centerIcon: string;
	/**
	 * @property    center-text
	 * @type        string
	 */
    @bindable() centerText: string;

	/**
	 * @property    button-icon
	 * @type        string
	 */
    @bindable() buttonIcon: string;
	/**
	 * @property    button-text
	 * @type        string
	 */
    @bindable() buttonText: string;

	/**
	 * @property    help-text
	 * @type        string
	 */
    @bindable() helpText: string;

	/**
	 * @property    placeholder
	 * @type        string
	 */
    @bindable() placeholder: string = '';
	/**
	 * @property    placeholder-second
	 * @type        string
	 */
    @bindable() placeholderSecond: string = '';

	/**
	 * @property    dir
	 * @type        string
	 */
    @bindable() dir: string = '';

	/**
	 * @property    name
	 * @type        string
	 */
    @bindable()
    name: string = '';

	/**
	 * @property    name
	 * @type        string
	 */
    @bindable()
    nameSecond: string = '';

    constructor(element: Element) {
        super(element);
        this.element['isDual'] = true;
    }

    bind() {
        super.bind();

        if (this.element.hasAttribute('number')) {
            //this.__type   = 'number';
            this.__format = 'number';
        }
        else if (this.element.hasAttribute('decimal')) {
            //this.__type   = 'number';
            this.__format = 'decimal';
        }
        else if (this.element.hasAttribute('capitalize')) {
            this.__format = 'title';
        }
        else if (this.element.hasAttribute('email')) {
            // this.__type   = 'email';
            this.__format = 'email';
        }
        else if (this.element.hasAttribute('url')) {
            // this.__type   = 'url';
            this.__format = 'url';
        }
        else if (this.element.hasAttribute('password')) {
            this.__type = 'password';
        }
        else if (this.element.hasAttribute('search')) {
            this.__type = 'search';
        }
    }

    protected formatter(evt) {
        let val = isEmpty(evt.target.value) ? '' : evt.target.value;
        let start = evt.target.selectionStart;
        if (this.__format === 'title') {
            val = val.replace(new RegExp(`[${this.ALPHA}'\\-']+(?=[\\.&\\s]*)`, 'g'), (txt) => {
                if (txt.toLowerCase().indexOf("mc") == 0) {
                    return txt.substr(0, 1).toUpperCase() +
                        txt.substr(1, 1).toLowerCase() +
                        txt.substr(2, 1).toUpperCase() +
                        txt.substr(3);
                }
                if (txt.toLowerCase().indexOf("mac") == 0) {
                    return txt.substr(0, 1).toUpperCase() +
                        txt.substr(1, 2).toLowerCase() +
                        txt.substr(3, 1).toUpperCase() +
                        txt.substr(4);
                }
                return txt.charAt(0).toUpperCase() + txt.substr(1);
            });
        }
        else if (this.__format === 'email' || this.__format === 'url') {
            val = val.toLowerCase();
        }
        evt.target.value = val;
        setTimeout(() => evt.target.selectionStart = evt.target.selectionEnd = start, 10);
        return val;
    }
}
