// UI Grid Layout
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {inlineView, customElement, bindable} from "aurelia-framework";

@customElement('ui-row')
@inlineView('<template><slot></slot></template>')
export class UIRow {

	constructor(public element: Element) {
	}

	bind() {
		if (this.element.hasAttribute('column')) {
			this.element.classList.add('ui-column-row');
		}
		else {
			this.element.classList.add('ui-row');
		}

		if (this.element.hasAttribute('start')) this.element.classList.add('ui-align-start');
		if (this.element.hasAttribute('end')) this.element.classList.add('ui-align-end');
		if (this.element.hasAttribute('center')) this.element.classList.add('ui-align-center');
		if (this.element.hasAttribute('spaced')) this.element.classList.add('ui-align-spaced');

		if (this.element.hasAttribute('top')) this.element.classList.add('ui-align-top');
		if (this.element.hasAttribute('bottom')) this.element.classList.add('ui-align-bottom');
		if (this.element.hasAttribute('middle')) this.element.classList.add('ui-align-middle');
		if (this.element.hasAttribute('stretch')) this.element.classList.add('ui-align-stretch');
	}
}


@customElement('ui-column')
@inlineView(`<template class="ui-column" css.bind="{'flex-basis': width}"><slot></slot></template>`)
export class UIColumn {

	@bindable()
	size: string = '';
	@bindable()
	width: string = 'none';

	constructor(public element: Element) {
	}

	bind() {
		if (this.element.hasAttribute('fill')) {
			this.element.classList.add('ui-col-fill');
		}
		else if (this.element.hasAttribute('full')) {
			this.element.classList.add('ui-col-full');
		}
		else if (isEmpty(this.size)) {
			this.element.classList.add('ui-col-auto');
		}

		if (this.element.hasAttribute('padded')) this.element.classList.add('ui-pad-all');

		for (var size of this.size.split(' ')) {
			this.element.classList.add(`ui-col-${size}`);
		}

		if (this.element.hasAttribute('top')) this.element.classList.add('ui-align-top');
		if (this.element.hasAttribute('bottom')) this.element.classList.add('ui-align-bottom');
		if (this.element.hasAttribute('middle')) this.element.classList.add('ui-align-middle');
		if (this.element.hasAttribute('stretch')) this.element.classList.add('ui-align-stretch');
		if (this.element.hasAttribute('flex')) this.element.classList.add('ui-column-row');
	}
}
