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
@inlineView(`<template class="ui-panel \${collapsed?'ui-collapse':''}" collapse.trigger="collapsed=!collapsed" close.trigger="closePanel()"><slot></slot></template>`)
export class UIPanel {
  constructor(public element: Element) { }

  closePanel() {
    this.element.remove();
  }
}

@autoinject()
@customElement('ui-panel-body')
@inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxHeight}"><div class="ui-wrapper \${__wrapperClass}"><slot></slot></div></template>`)
export class UIContent {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) this.__wrapperClass = 'ui-pad-all';
  }
  __wrapperClass = '';

  @bindable() maxHeight = 'auto';
}

@autoinject()
@customElement('ui-header')
@inlineView(`<template class="ui-header"><span if.bind="icon" class="\${icon}"></span><slot></slot><span class="ui-col-fill"></span>
<button class="ui-header-button ui-collapse" if.bind="collapsable" click.trigger="fireEvent($event,'collapse')"><span class="fi-ui-angle-up"></span></button>
<button class="ui-header-button ui-minimize" if.bind="minimizable" click.trigger="fireEvent($event,'minimize')"><span class="fi-ui-dialog-minimize"></span></button>
<button class="ui-header-button ui-maximize" if.bind="maximizable" click.trigger="fireEvent($event,'maximize')"><span class="fi-ui-dialog-maximize"></span></button>
<button class="ui-header-button ui-close" if.bind="closeable" click.trigger="fireEvent($event,'close')"><span class="fi-ui-cross"></span></button>
</template>`)
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

  bind() {
    this.closeable = isTrue(this.closeable);
    this.collapsable = isTrue(this.collapsable);
    this.minimizable = isTrue(this.minimizable);
    this.maximizable = isTrue(this.maximizable);
  }

  @bindable() icon = '';
  @bindable() closeable = false;
  @bindable() collapsable = false;
  @bindable() minimizable = false;
  @bindable() maximizable = false;

  fireEvent(evt, type) {
    if (evt.button != 0) return true;
    return UIEvent.fireEvent(type, this.element);
  }
}

