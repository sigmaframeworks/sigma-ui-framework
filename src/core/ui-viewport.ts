// UI Viewport
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, Container} from "aurelia-framework";
import {Router} from "aurelia-router";
import {UIEvent} from "../utils/ui-event";
import {UIUtils} from "../utils/ui-utils";
import {UIApplication} from "../utils/ui-application";

@customElement('ui-viewport')
export class UIViewport {
	/**
	 * @property    router
	 * @type        Aurelia Router
	 */
	@bindable()
	router: Router;


	@bindable()
	icon: string = '';
	@bindable()
	iconClass: string = '';
	@bindable()
	subtitle: string = '';
	@bindable()
	copyright: string = '';
	@bindable()
	showMenu: boolean = true;
	@bindable()
	showOptions: boolean = true;
	@bindable()
	showTaskbar: boolean = true;

	constructor(public element: Element, public appState: UIApplication, container: Container) {
		UIUtils.container(container);
		this.appState.info(this.constructor.name, "UIViewport Created");
		if (element.hasAttribute('menu-end')) element.classList.add('ui-menu-end');
		if (!element.hasAttribute('menu-start')) element.classList.add('ui-menu-start');
	}

	bind() {
		this.showMenu = isTrue(this.showMenu);
		this.showOptions = isTrue(this.showOptions);
		this.showTaskbar = isTrue(this.showTaskbar);
	}

	isActive(route) {
		return route.isActive || route.href == location.hash ||
			location.hash.indexOf(route.config.redirect || 'QWER') > -1;
	}

	__showMenu($event) {
		$event.stopPropagation();
		this.element.classList.add('show-menu');
		this.appState.info(this.constructor.name, "showMenu");
	}

	__hideMenu($event) {
		if (this.element.classList.contains('show-menu')) {
			this.appState.info(this.constructor.name, "hideMenu");
			this.element.classList.remove('show-menu');
		}
		let menu = document.querySelector('.ui-floating.show');
		if (menu) menu.classList.remove('show');
		let focusRow = document.querySelector('.ui-datagrid-row.focus');
		if (focusRow) focusRow.classList.remove('focus');
		return true;
	}

	logout() {
		this.appState.info(this.constructor.name, "fire logout event");
		UIEvent.fireEvent('logout', this.element);
	}
}
