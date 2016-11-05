// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@customElement('ui-page')
@inlineView(`
<template class="ui-page">
  <div class="ui-page-title" if.bind="pageTitle" innerhtml.bind="pageTitle"></div>
  <div class="ui-page-body \${pageClass}"><slot></slot></div>
</template>`)
export class UIPage {
  constructor(public element: Element) { }

  @bindable() pageClass = '';
  @bindable() pageTitle;
}

@autoinject()
@customElement('ui-section')
@inlineView(`<template class="ui-section \${__columnLayout?'ui-column-layout':'ui-row-layout'}"><slot></slot></template>`)
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
@inlineView(`<template class="ui-sidebar ui-row-column ui-align-stretch \${collapsed?'ui-collapse':''} \${position}" click.trigger="__showOverlay($event)">
  <div class="ui-col-auto ui-row ui-align-end ui-sidebar-head \${position=='start'?'':'ui-reverse'}" if.bind="__collapsible || label">
  <h5 class="ui-col-fill ui-sidebar-title">\${label}</h5>
  <a click.trigger="__toggleCollapse($event)" class="ui-col-auto ui-pad-all" if.bind="__collapsible"><span class="fi-ui ui-sidebar-close"></span></a></div>
  <div class="ui-col-fill ui-sidebar-content \${__class}"><slot></slot></div>
</template>`)
export class UISidebar {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) this.__class += ' ui-scroll';
    if (element.hasAttribute('padded')) this.__class += ' ui-pad-all';
    if (this.__miniDisplay = element.hasAttribute('mini-display'))
      this.element.classList.add('ui-mini-display');
    this.__collapsible = element.hasAttribute('collapsible');

    this.__obClick = UIEvent.subscribe('mouseclick', () => {
      this.element.classList.remove('ui-show-overlay');
    });
  }

  bind() {
    this.collapsed = isTrue(this.collapsed);
  }

  detached() {
    if (this.__obClick) this.__obClick.dispose();
  }

  __obClick;
  __class = '';
  __miniDisplay = false;
  __collapsible = false;

  @bindable() label = "";
  @bindable() collapsed = false;
  @bindable() position = "start";

  __toggleCollapse($event) {
    this.collapsed = !this.collapsed;
    this.element.classList.remove('ui-show-overlay');
    $event.cancelBubble = true;
    return true;
  }

  __showOverlay($event) {
    if (this.__miniDisplay || $event.target != this.element) return true;
    if (this.collapsed)
      this.element.classList.add('ui-show-overlay');
    else
      this.element.classList.remove('ui-show-overlay');
  }
}

@autoinject()
@customElement('ui-divider')
@inlineView(`<template class="ui-divider"></template>`)
export class UIDivider {
  constructor(public element: Element) {
  }
}

@autoinject()
@customElement('ui-toolbar')
@inlineView(`<template class="ui-toolbar"><slot></slot></template>`)
export class UIToolbar {
  constructor(public element: Element) {
  }
}