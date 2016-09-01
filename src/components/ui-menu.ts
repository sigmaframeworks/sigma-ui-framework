// UI Menu
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT


import {customElement, bindable, children} from "aurelia-framework";
import {Router} from "aurelia-router";
import {UIEvent} from "../utils/ui-event";
import {UIApplication} from "../utils/ui-application";

@customElement('ui-menu')
export class UIMenu {
	/**
	 * @property    router
	 * @type        Aurelia Router
	 */
    @bindable()
    router: Router;

    @children('.ui-hidden menu,.ui-hidden divider,.ui-hidden section')
    children: Array<any> = [];

    @bindable()
    menu = [];

    hideTitle = false;

    constructor(public element: Element, public appState: UIApplication) {
        if (element.hasAttribute('floating')) element.classList.add('ui-floating');
        this.hideTitle = element.hasAttribute('hide-title');
    }

    childrenChanged(newValue) {
        if (this.children.length > 0) this.menu = [];
        for (var i = 0, c = this.children; i < c.length; i++) {
            if (c[i].tagName.toLowerCase() === 'menu') {
                this.menu.push({
                    id: c[i].getAttribute('id'),
                    text: c[i].textContent,
                    icon: c[i].getAttribute('icon'),
                    disabled: isTrue(c[i].getAttribute('disabled')),
                    isActive: isTrue(c[i].getAttribute('active')),
                    href: c[i].getAttribute('href') || 'javascript:;',
                });
            }
            if (c[i].tagName.toLowerCase() === 'section') this.menu.push(c[i].textContent);
            if (c[i].tagName.toLowerCase() === 'divider') this.menu.push('-');
        }
    }

    isActive(route) {
        return route.isActive || route.href == location.hash ||
            location.hash.indexOf(route.config.redirect || 'QWER') > -1;
    }

    onClick($event) {
        $event.stopPropagation();
        if (this.router) {
            return true;
        }
        $event.cancelBubble = true;
        this.element.classList.remove('show');
        let link = getParentByClass($event.target, 'ui-menu-link', 'ui-menu');
        if (link !== null) UIEvent.fireEvent('menuclick', this.element, { id: link.dataset['id'], text: link.dataset['text'] });
        return true;
    }
}
