// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, children, customElement, inlineView, bindingMode, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@customElement('ui-option-group')
@inlineView(`<template class="ui-input-group ui-option-group ui-display" change.trigger="changed($event)"><slot name="inputLabel"></slot>
<div class="ui-group-wrapper"><slot></slot></div></template>`)
export class UIOptionGroup {
  constructor(public element: Element) {
    if (element.hasAttribute('vertical')) element.classList.add('ui-vertical');
    this.name = "opt" + (new Date().getTime());
  }

  attached() {
    let opts = this.element.querySelectorAll('ui-radio');
    for (let i = 0; i < opts.length; i++)  opts[i].au.controller.viewModel.name = this.name;
  }

  valueChanged(newValue) {
    UIEvent.queueTask(() => {
      let opt = this.element.querySelector(`input[value="${newValue}"]`);
      if (opt != null) opt['checked'] = true;
    });
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';
  @bindable() name = '';

  changed($event) {
    this.value = $event.detail;
  }
}

@autoinject()
@customElement('ui-checkbox')
@inlineView(`<template class="ui-self-center"><label class="ui-option-control \${disabled?'ui-disabled':''}" css.bind="{width: size}">
<div class="ui-option checkbox \${class}">
  <input class="ui-option-input" type="checkbox" disabled.bind="disabled" checked.bind="checked" change.trigger="__changed($event)"/>
  <div class="ui-option-handle"></div>
</div><span class="ui-option-label"><slot></slot></span>
</label></template>`)
export class UICheckbox {
  constructor(public element: Element) { }

  bind() {
    this.checked = isTrue(this.checked);
    this.disabled = isTrue(this.disabled);
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  checked: boolean = false;

  @bindable() size = 'auto';
  @bindable() class = '';
  @bindable() disabled = false;

  __changed($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    return UIEvent.fireEvent('checked', this.element, this.checked);
  }
}

@autoinject()
@customElement('ui-radio')
@inlineView(`<template class="ui-self-center"><label class="ui-option-control \${disabled?'ui-disabled':''}" css.bind="{width: size}">
<div class="ui-option radio \${class}">
  <input class="ui-option-input" type="radio" name.bind="name" value.bind="value" disabled.bind="disabled" checked.bind="checked" change.trigger="changed($event)"/>
  <div class="ui-option-handle"></div>
</div><span class="ui-option-label"><slot></slot></span>
</label></template>`)
export class UIRadio {
  constructor(public element: Element) { }

  bind() {
    this.disabled = isTrue(this.disabled);
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  checked: any = false;

  @bindable() size = 'auto';
  @bindable() name = '';
  @bindable() class = '';
  @bindable() value = '';
  @bindable() disabled = false;

  checkedChanged($event) {
    return UIEvent.fireEvent('checked', this.element, this.checked);
  }

  changed($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}

@autoinject()
@containerless()
@customElement('ui-switch')
@inlineView(`<template><label class="ui-switch-control">
<div class="ui-switch \${disabled?'ui-disabled':''} ui-switch-\${theme} \${class}" css.bind="{width: size}">
  <input class="ui-switch-input" type="checkbox" disabled.bind="disabled" checked.bind="checked" change.trigger="changed($event)"/>
  <div class="ui-switch-label" data-on="\${onLabel}" data-off="\${offLabel}"></div>
  <div class="ui-switch-handle"></div>
</div><span class="ui-switch-label"><slot></slot></span>
</label></template>`)
export class UISwitch {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) this.theme = 'primary';
    else if (this.element.hasAttribute('secondary')) this.theme = 'secondary';
    else if (this.element.hasAttribute('dark')) this.theme = 'dark';
    else if (this.element.hasAttribute('info')) this.theme = 'info';
    else if (this.element.hasAttribute('danger')) this.theme = 'danger';
    else if (this.element.hasAttribute('success')) this.theme = 'success';
    else if (this.element.hasAttribute('warning')) this.theme = 'warning';
  }

  bind() {
    this.checked = isTrue(this.checked) || (this.value == this.onValue);
    this.value = isTrue(this.checked) ? this.onValue : this.offValue;
    this.disabled = isTrue(this.disabled);
  }

  checkedChanged(newValue) {
    this.value = newValue ? this.onValue : this.offValue;
  }
  valueChanged(newValue) {
    this.checked = newValue == this.onValue;
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  checked: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';

  @bindable() size = '4em';
  @bindable() class = '';
  @bindable() onLabel = 'on';
  @bindable() offLabel = 'off';
  @bindable() onValue = true;
  @bindable() offValue = false;
  @bindable() disabled = false;
  @bindable() theme = 'default';

  changed($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    this.value = this.checked ? this.onValue : this.offValue;
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}
