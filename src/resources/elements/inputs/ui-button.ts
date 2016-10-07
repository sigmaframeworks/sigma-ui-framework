// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as Tether from "tether";

// Drawer
@autoinject()
@containerless()
@customElement('ui-button')
@inlineView(`<template><button ref="__button" class="ui-button \${class} \${disabled?'ui-disabled':''}" click.trigger="click($event)">
    <span if.bind="icon" class="fi-ui \${icon}"></span><span class="ui-label"><slot>\${label}</slot></span></button></template>`)
export class UIButton {
  constructor(public element: Element) { }

  bind() {
    if (this.element.hasAttribute('primary')) this.__button.classList.add('ui-button-primary');
    else if (this.element.hasAttribute('secondary')) this.__button.classList.add('ui-button-secondary');
    else if (this.element.hasAttribute('dark')) this.__button.classList.add('ui-button-dark');
    else if (this.element.hasAttribute('info')) this.__button.classList.add('ui-button-info');
    else if (this.element.hasAttribute('danger')) this.__button.classList.add('ui-button-danger');
    else if (this.element.hasAttribute('success')) this.__button.classList.add('ui-button-success');
    else if (this.element.hasAttribute('warning')) this.__button.classList.add('ui-button-warning');
    else this.__button.classList.add('ui-button-default');

    if (this.element.hasAttribute('icon-top')) this.__button.classList.add('ui-icon-top');
    if (this.element.hasAttribute('big')) this.__button.classList.add('ui-big');
    if (this.element.hasAttribute('small')) this.__button.classList.add('ui-small');
    if (this.element.hasAttribute('square')) this.__button.classList.add('ui-square');
    if (this.element.hasAttribute('round')) this.__button.classList.add('ui-round');

    this.disabled = isTrue(this.disabled);
  }

  attached() {
    if (this.dropdown) {
      UIEvent.subscribe('mouseclick', () => {
        this.__button.classList.remove('ui-open');
        this.dropdown.classList.add('ui-hidden');
      });
      this.__button.classList.add('ui-dropdown');
      this.dropdown.classList.add('ui-floating');
      this.dropdown.classList.add('ui-hidden');
      this.__tether = new Tether({
        element: this.dropdown,
        target: this.__button,
        attachment: 'top left',
        targetAttachment: 'bottom left',
        // offset: '0 10px',
        constraints: [
          {
            to: 'scrollParent',
            attachment: 'together'
          }
        ],
        optimizations: {
          gpu: false,
          moveElement: false
        }
      });
    }
  }

  unbind() {
    if (this.__tether) this.__tether.destroy();
  }

  __tether;
  __button: Element;

  @bindable() icon = '';
  @bindable() label = '';
  @bindable() class = '';
  @bindable() dropdown;
  @bindable() disabled = false;

  click(evt) {
    if (evt.button != 0) return true;
    if (this.dropdown) {
      this.dropdown.style.minWidth = this.__button.offsetWidth + 'px';
      if (this.dropdown.classList.contains('ui-hidden')) {
        this.__button.classList.add('ui-open');
        this.dropdown.classList.remove('ui-hidden');
        this.__tether.position();
      }
      else {
        this.__button.classList.remove('ui-open');
        this.dropdown.classList.add('ui-hidden');
      }
    }
    let e = DOM.createCustomEvent('click', { bubbles: true, cancelable: true });
    return this.element.dispatchEvent(e);
  }

  disabledChanged(newValue) {
    this.disabled = isTrue(newValue);
  }
}
