// UI Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, inlineView, useView} from "aurelia-framework";
import {UIEvent} from "../utils/ui-event";

@autoinject()
@customElement('ui-panel')
export class UIPanel {
    @bindable
    expanded = false;
    @bindable
    collapsed = false;

    constructor(public element: Element) {
    }

    close() {
        this.element.remove();
    }
}

@autoinject()
@useView('./ui-header.html')
@customElement("ui-header")
export class UIHeader {
    @bindable
    icon: string;
    @bindable
    close: boolean = false;
    @bindable
    expand: boolean = false;
    @bindable
    collapse: boolean = false;


    constructor(public element: Element) {
        if (element.hasAttribute('primary')) this.element.classList.add('ui-primary');
        if (element.hasAttribute('secondary')) this.element.classList.add('ui-secondary');
    }

    bind() {
        this.close = isTrue(this.close);
        this.expand = isTrue(this.expand);
        this.collapse = isTrue(this.collapse);
    }

    closeChanged(newValue) {
        this.close = isTrue(newValue);
    }

    expandChanged(newValue) {
        this.expand = isTrue(newValue);
    }

    collapseChanged(newValue) {
        this.collapse = isTrue(newValue);
    }

    fireClose() {
        UIEvent.fireEvent('close', this.element);
    }

    fireExpand() {
        UIEvent.fireEvent('expand', this.element);
    }

    fireCollapse() {
        UIEvent.fireEvent('collapse', this.element);
    }
}

@autoinject()
@customElement("ui-body")
@inlineView('<template class="ui-panel-body"><slot></slot></template>')
export class UIBody {

    constructor(public element: Element) {
        if (this.element.hasAttribute('scroll')) this.element.classList.add('ui-scroll');
        if (this.element.hasAttribute('padded')) this.element.classList.add('ui-pad-all');
        if (this.element.hasAttribute('flex')) this.element.classList.add('ui-column-row');
    }

    expand($event) {
        if ($event) $event.cancelBubble = true;
        this.element.classList.toggle('ui-expanded');
    }
}
