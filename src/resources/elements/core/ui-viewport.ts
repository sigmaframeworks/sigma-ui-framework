// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, Container} from "aurelia-framework";
import {Router} from "aurelia-router";
import {UIUtils} from "../../utils/ui-utils";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@customElement('ui-viewport')
@inlineView(`
<template class="ui-viewport">
  <slot name="app-header"></slot>
  <slot></slot>
  <slot name="app-taskbar" ref="__taskbar"></slot>
  <slot name="app-footer"></slot>

  <div class="ui-dialog-container" ref="__dialogContainer"></div>
  <div class="ui-overlay-container" ref="__overlayContainer"></div>

  <div class="ui-loader" show.bind="router.isNavigating">
    <div class="ui-loader-div">
      <span class="fi-ui-settings ui-spin"></span>
      <span class="fi-ui-settings ui-spin-opp"></span>
    </div>
  </div>
</template>`)
export class UIViewport {
  constructor(public element: Element, container: Container) {
    document.documentElement.classList.add(browserAgent());

    var __resizeTimer;
    // Browser events hooks
    document.ondragstart = (e: any) => getParentByClass(e.target, '.ui-draggable') != null;
    document.onmouseup = (e: any) => UIEvent.broadcast('mouseclick', e);
    window.onresize = (e: any) => {
      window.clearTimeout(__resizeTimer);
      window.setTimeout(() => UIEvent.broadcast('windowresize'), 500);
    }

    UIUtils.auContainer = container;
    UIUtils.taskbar = this.__taskbar;
    UIUtils.dialogContainer = this.__dialogContainer;
    UIUtils.overlayContainer = this.__overlayContainer;
  }

  attached() {
    UIEvent.broadcast('appready');
  }

  __taskbar;
  __dialogContainer;
  __overlayContainer;

  @bindable() router: Router;
}

// App Header
@autoinject()
@containerless()
@customElement('ui-app-header')
@inlineView('<template><div class="ui-app-header ${class}" slot="app-header"><slot></slot></div></template>')
export class UIAppHeader {
  constructor(public element: Element) { }

  @bindable() class = '';
}

// App Title
@autoinject()
@containerless()
@customElement('ui-app-title')
@inlineView('<template><img class="ui-app-logo" src.bind="src" if.bind="src"/><a href="/#" class="ui-app-title ${class}"><slot></slot></a></template>')
export class UIAppTitle {
  constructor(public element: Element) { }

  @bindable() src;
  @bindable() class = '';
}

// App Footer
@autoinject()
@containerless()
@customElement('ui-app-footer')
@inlineView('<template><div class="ui-app-footer ${class}" slot="app-footer"><slot></slot></div></template>')
export class UIAppFooter {
  constructor(public element: Element) { }

  @bindable() class = '';
}

// App Footer
@autoinject()
@containerless()
@customElement('ui-app-taskbar')
@inlineView('<template><div class="ui-app-taskbar ${class}" slot="app-taskbar"><slot></slot></div></template>')
export class UIAppTaskbar {
  constructor(public element: Element) { }

  @bindable() class = '';
}



