// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView} from "aurelia-framework";

// Drawer
@autoinject()
@customElement('ui-drawer')
@inlineView(`
<template class="ui-drawer \${position}">
  <div class="ui-drawer-content ui-row-column ui-align-stretch">
    <a class="fi-ui ui-drawer-close ui-col-auto" click.trigger="__closeDrawer()"></a>
    <div class="ui-drawer-body ui-col-fill \${__class}"><slot></slot></div>
  </div>
  <div class="ui-drawer-shim" click.trigger="__closeDrawer()"></div>
</template>`)
export class UIAppDrawer {
  constructor(public element: Element) {
    if (element.hasAttribute('close-on-click')) element.addEventListener('mouseup', (e: any) => { if (e.button == 0) this.__closeDrawer(); });
  }
  bind() {
    if (this.element.hasAttribute('scroll')) this.__class += ' ui-scroll';
    if (this.element.hasAttribute('padded')) this.__class += ' ui-pad-all';
  }

  __closeOnClick;
  __class = '';

  @bindable() position = "start";

  __closeDrawer() {
    this.element.classList.remove('show');
  }
}

// Drawer Toggle
@autoinject()
@customElement('ui-drawer-toggle')
@inlineView('<template class="ui-drawer-toggle" click.trigger="__openDrawer($event)"><slot><span class="fi-ui-drawer"></span></slot></template>')
export class UIAppDrawerToggle {
  constructor(public element: Element) { }

  @bindable() class = '';
  @bindable() drawer;

  __openDrawer(evt) {
    if (evt.button != 0) return true;
    if (this.drawer && this.drawer.classList) {
      this.drawer.classList.add('show');
    }
  }
}