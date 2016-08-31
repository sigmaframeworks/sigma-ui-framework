// UI Textual Display
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";

@autoinject()
@customElement('ui-display')
export class UIDisplay {
	/**
	 * @property    value
	 * @type        string
	 */
    @bindable()
    value: string = '';

	/**
	 * @property    prefix-icon
	 * @type        string
	 */
    @bindable()
    prefixIcon: string;
	/**
	 * @property    prefix-text
	 * @type        string
	 */
    @bindable()
    prefixText: string;

	/**
	 * @property    suffix-icon
	 * @type        string
	 */
    @bindable()
    suffixIcon: string;
	/**
	 * @property    suffix-text
	 * @type        string
	 */
    @bindable()
    suffixText: string;

	/**
	 * @property    button-icon
	 * @type        string
	 */
    @bindable()
    buttonIcon: string;
	/**
	 * @property    button-text
	 * @type        string
	 */
    @bindable()
    buttonText: string;

	/**
	 * @property    help-text
	 * @type        string
	 */
    @bindable()
    helpText: string;

    constructor(public element: Element) {
        if (this.element.hasAttribute('auto-width')) this.element.classList.add('ui-auto');
        if (this.element.hasAttribute('label-top')) this.element.classList.add('ui-label-top');
        if (this.element.hasAttribute('label-hide')) this.element.classList.add('ui-label-hide');
    }

}
