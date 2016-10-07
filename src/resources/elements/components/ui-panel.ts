// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";

// Panel
@autoinject()
@customElement('ui-panel')
@inlineView(`<template class="ui-panel"><slot></slot></template>`)
export class UIPanel {
  constructor(public element: Element) { }
}

@autoinject()
@customElement('ui-panel-body')
@inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxHeight}"><slot></slot></template>`)
export class UIContent {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
  }
  @bindable() maxHeight = 'auto';
}

@autoinject()
@customElement('ui-header')
@inlineView(`<template class="ui-header"><span if.bind="icon" class="\${icon}"></span><slot></slot></template>`)
export class UIHeader {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) element.classList.add('ui-bg-primary');
    else if (this.element.hasAttribute('secondary')) element.classList.add('ui-bg-secondary');
    else if (this.element.hasAttribute('dark')) element.classList.add('ui-bg-dark');
    else if (this.element.hasAttribute('info')) element.classList.add('ui-bg-info');
    else if (this.element.hasAttribute('danger')) element.classList.add('ui-bg-danger');
    else if (this.element.hasAttribute('success')) element.classList.add('ui-bg-success');
    else if (this.element.hasAttribute('warning')) element.classList.add('ui-bg-warning');
  }
  @bindable() icon = '';
}

