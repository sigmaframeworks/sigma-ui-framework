// UI Ribbon
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable} from "aurelia-framework";

@autoinject()
@customElement('ui-ribbon')
export class UIRibbon {
	private __ribbon: HTMLElement;
	private __theme: string = 'default';
	private __posH = 'r';
	private __posV = 't';

	constructor(public element: Element) {
		// check theme attributes
		if (element.hasAttribute('primary')) this.__theme = 'primary';
		if (element.hasAttribute('secondary')) this.__theme = 'secondary';
		if (element.hasAttribute('info')) this.__theme = 'info';
		if (element.hasAttribute('danger')) this.__theme = 'danger';
		if (element.hasAttribute('success')) this.__theme = 'success';
		if (element.hasAttribute('warning')) this.__theme = 'warning';
		// position
		if (element.hasAttribute('top')) this.__posV = 't';
		if (element.hasAttribute('bottom')) this.__posV = 'b';
		if (element.hasAttribute('left')) this.__posH = 'l';
		if (element.hasAttribute('right')) this.__posH = 'r';
	}

	attached() {
		this.element.classList.add(`ui-${this.__posV}${this.__posH}`);
		this.__ribbon.classList.add(`ui-ribbon-${this.__theme}`);
	}
}
