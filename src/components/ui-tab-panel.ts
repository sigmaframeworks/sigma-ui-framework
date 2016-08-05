// UI Tabbed Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, inlineView, children} from "aurelia-framework";
import {_} from "../utils/ui-utils";

@autoinject()
@customElement('ui-tab-panel')
export class UITabPanel {
	private __tabs;
	private __tabButtons;
	private __selectedTab;

	//@children({selector: '.ui-tab-content'})
	tabs = [];

	@bindable
	activeTab = 0;

	constructor(public element: Element) {
	}

	bind() {
	}

	attached() {
		_.forEach(this.element.querySelectorAll('ui-tab'),
			t => this.tabs.push(t.au.controller.viewModel));
		this.activeTabChanged(this.activeTab);
	}

	itemsChanged(mutations) {
		// if (this.items.length > 0) {
		// 	if (!this.selectedItem || this.items.indexOf(this.selectedItem) === -1) {
		// 		this.selectItem(this.items[0]);
		// 	}
		// }
	}

	activeTabChanged(newValue) {
		if (this.__selectedTab) this.__selectedTab.isSelected = false;
		if (this.tabs[newValue]) {
			(this.__selectedTab = this.tabs[newValue]).isSelected = true;
		}
		// if (this.tabs[newValue]) {
		// 	try {
		// 		let active;
		// 		if ((active = this.__tabButtons.querySelector('.ui-active')) !== null) {
		// 			active.classList
		// 				  .remove('ui-active');
		// 		}
		// 		if ((active = this.__tabs.querySelector('.ui-active')) !== null) {
		// 			active.classList
		// 				  .remove('ui-active');
		// 		}
		// 	} catch (e) {
		// 	}
		//
		// 	this.__tabButtons
		// 		.querySelector(`[data-index="${newValue}"]`)
		// 		.classList
		// 		.add('ui-active');
		// 	this.tabs[newValue]
		// 		.classList
		// 		.add('ui-active');
		// }
	}
}

@autoinject()
@inlineView('<template class="ui-tab-content ${isSelected?\'ui-active\':\'\'}"><slot></slot></template>')
@customElement('ui-tab')
export class UITab {
	@bindable
	label: string = '';
	@bindable
	icon: string = '';

	isSelected = false;

	constructor(public element: Element) {
		if (this.element.hasAttribute('scroll')) this.element.classList.add('ui-scroll');
		if (this.element.hasAttribute('padded')) this.element.classList.add('ui-pad-all');
		if (this.element.hasAttribute('flex')) this.element.classList.add('ui-column-row');
	}
}
