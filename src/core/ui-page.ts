// UI Page
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, inlineView, autoinject, TaskQueue} from "aurelia-framework";
import {Router} from "aurelia-router";
import {UIUtils} from "../utils/ui-utils";
import {UIEvent} from "../utils/ui-event";
import {UIFormat} from "../utils/ui-formatters";

@autoinject()
@customElement('ui-page')
export class UIPage {
    private __body;

	/**
	 * @property    page-title
	 * @type        string
	 */
    @bindable()
    pageTitle: string;

    constructor(public element: Element) {
    }

    toast(config) {
        if (typeof config === 'string') config = { message: config };
        config.extraClass = 'ui-page-toast';
        UIUtils.showToast(this.__body, config);
    }
}

@autoinject()
@customElement('ui-section')
@inlineView('<template class="ui-section"><slot></slot></template>')
export class UISection {

    constructor(public element: Element) {
    }

    bind() {
        if (this.element.hasAttribute('column')) {
            this.element.classList.add('ui-section-column');
        }
        else {
            this.element.classList.add('ui-section-row');
        }
    }
}

@autoinject()
@customElement('ui-content')
@inlineView('<template class="ui-content"><slot></slot></template>')
export class UIContent {

    constructor(public element: Element) {
    }

    bind() {
        if (this.element.hasAttribute('auto')) {
            this.element.classList.add('ui-auto-fit');
        }
        else if (this.element.hasAttribute('scroll')) {
            this.element.classList.add('ui-scroll');
        }
        if (this.element.hasAttribute('padded')) this.element.classList.add('ui-pad-all');
    }
}

@autoinject()
@customElement('ui-sidebar')
@inlineView(`<template class="ui-sidebar" role="sidebar" css.bind="{'width':width}" click.trigger="showOverlay()">
<div class="ui-sidebar-collapse" if.bind="collapsible" click.trigger="toggleCollapse($event)"><span class="fi-ui-arrow-left"></span></div>
<div class="ui-sidebar-content" ref="__content"><slot></slot></div></template>`)
export class UISidebar {
    private collapsible: boolean = false;
    private __content;
	/**
	 * @property    width
	 * @type        string
	 */
    @bindable()
    width: string = '220px';

    constructor(public element: Element) {
    }

    bind() {
        // TODO: Add collapse functionality
        this.collapsible = this.element.hasAttribute('collapsible');
        if (this.element.hasAttribute('scroll')) this.__content.classList.add('ui-scroll');
    }

    private __close;
    attached() {
        if (this.element.hasAttribute('padded')) this.element.classList.add('ui-pad-all');
        if (this.collapsible) document.addEventListener('mousedown', this.__close = (evt) => this.closeOverlay(evt));
    }

    dettached() {
        if (this.collapsible) document.removeEventListener('mousedown', this.__close);
    }

    closeOverlay(evt) {
        if (getParentByClass(evt.target, 'ui-sidebar-content') === null)
            this.element.classList.remove('overlay');
    }

    toggleCollapse($event) {
        this.element.classList.remove('overlay');
        this.element.classList.toggle('collapse');
        $event.cancelBubble = true;
        $event.preventDefault();
    }

    showOverlay() {
        if (this.element.classList.contains('collapse')) this.element.classList.toggle('overlay');
    }
}

@autoinject()
@customElement('ui-divider')
@inlineView('<template class="ui-divider" role="separator"><slot></slot></template>')
export class UIDivider {
}

@autoinject()
@customElement('ui-toolbar')
@inlineView(`<template class="ui-toolbar ui-button-bar" role="toolbar" enterpressed.trigger="fireSubmit()"><slot></slot></template>`)
export class UIToolbar {
    constructor(public element: Element) {
    }
    fireSubmit() {
        UIEvent.fireEvent('submit', this.element, this);
    }
}

@autoinject()
@customElement('ui-statsbar')
@inlineView(`<template class="ui-statsbar"><slot></slot></template>`)
export class UIStatsbar {
}

@autoinject()
@customElement('ui-stat')
@inlineView('<template class="ui-stat"><span class="${icon}" if.bind="icon"></span><div><h1>${value}</h1><h6><slot></slot></h6></div></template>')
export class UIStat {
    @bindable()
    value;
    @bindable()
    icon;
}
