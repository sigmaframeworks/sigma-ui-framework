// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView} from "aurelia-framework";

@autoinject()
@customElement('ui-page')
@inlineView(`
<template class="ui-page">
  <div class="ui-page-title" if.bind="pageTitle" innerhtml.bind="pageTitle"></div>
  <div class="ui-page-body \${class}"><slot></slot></div>
</template>`)
export class UIPage {
  constructor(public element: Element) { }

  @bindable() class = '';
  @bindable() pageTitle;
}

@autoinject()
@customElement('ui-section')
@inlineView(`<template class="ui-section \${__columnLayout?'ui-col-layout':'ui-row-layout'}"><slot></slot></template>`)
export class UISection {
  constructor(public element: Element) {
    this.__columnLayout = !element.hasAttribute('row-layout');
  }

  __columnLayout = true;
}

@autoinject()
@containerless()
@customElement('ui-router-view')
@inlineView(`<template><router-view class="ui-router-view"></router-view></template>`)
export class UIRouterView {
  constructor(public element: Element) { }
}

@autoinject()
@customElement('ui-content')
@inlineView(`<template class="ui-content"><slot></slot></template>`)
export class UIContent {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
  }
}
@autoinject()
@customElement('ui-sidebar')
@inlineView(`<template class="ui-sidebar"><slot></slot></template>`)
export class UISidebar {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
  }
}

@autoinject()
@customElement('ui-toolbar')
@inlineView(`<template class="ui-toolbar"><slot></slot></template>`)
export class UIToolbar {
  constructor(public element: Element) {
  }
}