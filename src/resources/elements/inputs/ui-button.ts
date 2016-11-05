// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, children, inlineView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as Tether from "tether";

// Drawer
@autoinject()
@customElement('ui-button')
@inlineView(`<template role="button" class="ui-button \${disabled?'ui-disabled':''}" click.trigger="click($event)">
    <span if.bind="icon" class="fi-ui \${icon}"></span><span class="ui-label"><slot>\${label}</slot></span></template>`)
export class UIButton {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) this.element.classList.add('ui-button-primary');
    else if (this.element.hasAttribute('secondary')) this.element.classList.add('ui-button-secondary');
    else if (this.element.hasAttribute('dark')) this.element.classList.add('ui-button-dark');
    else if (this.element.hasAttribute('info')) this.element.classList.add('ui-button-info');
    else if (this.element.hasAttribute('danger')) this.element.classList.add('ui-button-danger');
    else if (this.element.hasAttribute('success')) this.element.classList.add('ui-button-success');
    else if (this.element.hasAttribute('warning')) this.element.classList.add('ui-button-warning');
    else this.element.classList.add('ui-button-default');

    if (this.element.hasAttribute('icon-top')) this.element.classList.add('ui-icon-top');
    if (this.element.hasAttribute('big')) this.element.classList.add('ui-big');
    if (this.element.hasAttribute('small')) this.element.classList.add('ui-small');
    if (this.element.hasAttribute('square')) this.element.classList.add('ui-square');
    if (this.element.hasAttribute('round')) this.element.classList.add('ui-round');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
  }

  attached() {
    if (this.dropdown) {
      this.__obClick = UIEvent.subscribe('mouseclick', () => {
        this.element.classList.remove('ui-open');
        this.dropdown.classList.add('ui-hidden');
      });
      this.element.classList.add('ui-btn-dropdown');
      this.dropdown.classList.add('ui-floating');
      this.dropdown.classList.add('ui-hidden');
      this.__tether = new Tether({
        element: this.dropdown,
        target: this.element,
        attachment: 'top left',
        targetAttachment: 'bottom left',
        // offset: '0 10px',
        constraints: [
          {
            to: 'scrollParent',
            attachment: 'together'
          },
          {
            to: 'window',
            attachment: 'together'
          }
        ],
        optimizations: {
          moveElement: false
        }
      });
    }
  }

  detached() {
    if (this.__tether) this.__tether.destroy();
    if (this.__obClick) this.__obClick.dispose();
    if (this.dropdown) DOM.removeNode(this.dropdown);
  }

  __tether;

  __obClick;

  @bindable() icon = '';
  @bindable() label = '';
  @bindable() class = '';
  @bindable() dropdown;
  @bindable() disabled = false;

  click(evt) {
    if (evt.button != 0) return true;
    if (this.dropdown) {
      this.dropdown.style.minWidth = this.element.offsetWidth + 'px';
      if (this.dropdown.classList.contains('ui-hidden')) {
        this.element.classList.add('ui-open');
        this.dropdown.classList.remove('ui-hidden');
        this.__tether.position();
      }
      else {
        this.element.classList.remove('ui-open');
        this.dropdown.classList.add('ui-hidden');
      }
    }
    return true;
  }

  disabledChanged(newValue) {
    this.disabled = isTrue(newValue);
  }
}

@autoinject()
@customElement('ui-button-group')
@inlineView(`<template class="ui-button-group \${disabled?'ui-disabled':''}"><slot></slot></template>`)
export class UIButtonGroup {
  constructor(public element: Element) {
    if (this.element.hasAttribute('vertical')) this.element.classList.add('ui-vertical');
    else this.element.classList.add('ui-horizontal');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
  }

  @children('ui-button') buttons;
  @bindable() disabled = false;

  disabledChanged(newValue) {
    this.disabled = isTrue(newValue);
  }
}
