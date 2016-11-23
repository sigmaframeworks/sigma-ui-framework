// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, bindingMode, containerless, customElement, children, inlineView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as _ from "lodash";
import * as Tether from "tether";

// Drawer
@autoinject()
@customElement('ui-button')
@inlineView(`<template role="button" class="ui-button ui-button-\${theme} \${disabled?'ui-disabled':''}" click.trigger="click($event)" data-value="\${value}" css.bind="{width: width}">
    <span if.bind="icon" class="fi-ui \${icon}"></span><span class="ui-label"><slot>\${label}</slot></span></button></template>`)
export class UIButton {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) this.theme = 'primary';
    else if (this.element.hasAttribute('secondary')) this.theme = 'secondary';
    else if (this.element.hasAttribute('dark')) this.theme = 'dark';
    else if (this.element.hasAttribute('info')) this.theme = 'info';
    else if (this.element.hasAttribute('danger')) this.theme = 'danger';
    else if (this.element.hasAttribute('success')) this.theme = 'success';
    else if (this.element.hasAttribute('warning')) this.theme = 'warning';

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

  button;
  __tether;
  __obClick;

  @bindable() icon = '';
  @bindable() label = '';
  @bindable() class = '';
  @bindable() value = '';
  @bindable() theme = 'default';
  @bindable() width = 'auto';
  @bindable() dropdown;
  @bindable() disabled = false;

  click(evt) {
    if (evt.button != 0) return true;
    if (this.dropdown) {
      this.dropdown.style.minWidth = this.element.offsetWidth + 'px';
      if (this.dropdown.classList.contains('ui-hidden')) {
        if (UIEvent.fireEvent('menuopen', this.element) !== false) {
          this.element.classList.add('ui-open');
          this.dropdown.classList.remove('ui-hidden');
          this.__tether.position();
        }
      }
      else {
        UIEvent.fireEvent('menuhide', this.element);
        this.element.classList.remove('ui-open');
        this.dropdown.classList.add('ui-hidden');
      }
      return false;
    }
    return true;
  }

  disabledChanged(newValue) {
    this.disabled = isTrue(newValue);
  }
}

@autoinject()
@customElement('ui-button-group')
@inlineView(`<template class="ui-button-group \${disabled?'ui-disabled':''}" click.trigger="__click($event)"><slot></slot></template>`)
export class UIButtonGroup {
  constructor(public element: Element) {
    if (this.element.hasAttribute('vertical')) this.element.classList.add('ui-vertical');
    else this.element.classList.add('ui-horizontal');

    if (this.element.hasAttribute('toggle')) this.element.classList.add('ui-toggle');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
  }

  @children('ui-button') buttons = [];
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable() disabled = false;

  disabledChanged(newValue) {
    this.disabled = isTrue(newValue);
  }

  buttonsChanged() {
    this.valueChanged(this.value);
  }

  __active;
  valueChanged(newValue) {
    if (this.__active) this.__active.element.classList.remove('ui-active');
    if (this.buttons.length > 0 && (this.__active = _.find(this.buttons, (b: any) => b.value === this.value)))
      this.__active.element.classList.add('ui-active');
  }

  __click(evt) {
    if (evt.target.dataset['value']) this.value = evt.target.dataset['value'];
  }
}
