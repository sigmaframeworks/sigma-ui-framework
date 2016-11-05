// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, children, inlineView, TemplatingEngine, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as _ from "lodash";

@autoinject()
@customElement('ui-tab-panel')
@inlineView(`<template class="ui-tab-panel"><div class="ui-tab-bar">
    <a click.trigger="activateTab(tab)" repeat.for="tab of tabs" class="ui-tab-button \${tab.active?'ui-active':''} \${tab.disabled?'ui-disabled':''}">
      <span if.bind="tab.icon" class="fi-ui \${tab.icon}"></span>
      <span class="ui-label">\${tab.label}</span>
      <span if.bind="tab.closeable" class="ui-close" click.trigger="closeTab(tab)">&nbsp;&times;</span>
    </a>
  </div><slot></slot></template>`)
export class UITabPanel {
  constructor(public element: Element, public tempEngine: TemplatingEngine) {
    if (element.hasAttribute('bottom')) element.classList.add('bottom');
  }

  tabsChanged() {
    if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
      (this.__activeTab = _.find(this.tabs, ['disabled', false])).active = true;
  }

  @children('ui-tab') tabs = [];

  __activeTab = null;

  closeTab(tab) {
    if (UIEvent.fireEvent('beforeclose', this.element, tab)) {
      tab.remove();
      UIEvent.fireEvent('close', this.element, tab);
    }
  }

  activateTab(tab) {
    if (UIEvent.fireEvent('beforechange', this.element, tab)) {
      if (this.__activeTab) this.__activeTab.active = false;
      (this.__activeTab = tab).active = true;
      UIEvent.fireEvent('change', this.element, tab);
    }
  }
}

@autoinject()
@customElement('ui-tab')
@inlineView(`<template class="ui-tab \${active?'ui-active':''}"><slot></slot></template>`)
export class UITab {
  static __seed = 0;
  constructor(public element: Element) {
    if (element.hasAttribute('flex')) element.classList.add('ui-flexed');
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');

    this.__id = 'tab-' + (UITab.__seed++);
    this.closeable = element.hasAttribute('closeable');
  }


  bind() {
    this.disabled = isTrue(this.disabled);
  }

  __id = '';
  active = false;
  closeable = false;

  @bindable() icon = '';
  @bindable() label = '';
  @bindable() disabled = false;

  remove() {
    DOM.removeNode(this.element);
  }
}
