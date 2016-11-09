// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, children, customElement, inlineView, bindingMode, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as _ from "lodash";
import * as Tether from "tether";

// TODO: Allow custom value
// TODO: Add tag input

export class ListGeneric {
  input;
  element;
  dropdown;

  __tether;

  __tags = false;
  __value = '';
  __hilight = null;
  __allowSearch = true;

  __options = [];
  __listGroups = [];

  value = null;
  options = [];
  readonly = false;
  disabled = false;
  forceSelect = true;

  valueProperty = 'id';
  iconProperty = 'icon';
  displayProperty = 'text';

  bind() {
    this.readonly = isTrue(this.readonly);
    this.disabled = isTrue(this.disabled);
    this.forceSelect = isTrue(this.forceSelect);
    this.optionsChanged(this.options);
  }

  attached() {
    this.valueChanged(this.value);
    if (this.__tether) this.dropdown.style.minWidth = this.element.offsetWidth + 'px';
  }

  optionsChanged(newValue) {
    let groups = [];
    if (_.isArray(newValue)) {
      let list = [];
      _.forEach(newValue, v => list.push({ value: v[this.valueProperty] || v, text: v[this.displayProperty] || v, display: v[this.displayProperty] || v, icon: v[this.iconProperty], model: v }));
      groups.push({ items: list });
      this.__allowSearch = !this.forceSelect || list.length > 10;
    }
    else {
      let count = 0;
      _.forEach(newValue, (g, k) => {
        let list = [];
        _.forEach(g, v => list.push({ value: v[this.valueProperty] || v, text: v[this.displayProperty] || v, display: v[this.displayProperty] || v, icon: v[this.iconProperty], model: v }));
        groups.push({ label: k, items: list });
        count += list.length;
      });
      this.__allowSearch = !this.forceSelect || count > 10;
    }
    this.__options = this.__listGroups = groups;
  }

  valueChanged(newValue) {
    if (!this.__tags) {
      this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', newValue).text;
      if (!this.forceSelect && !this.__value) this.__value = newValue;
      else if (!this.__value) this.value = null;
    }
    else {
      let v = (newValue || '').split(',');
      _.forEach(v, n => _['findChildren'](this.__listGroups = this.__options, 'items', 'value', n).disabled = true);
    }
    UIEvent.queueTask(() => {
      this.__hilight = this.dropdown.querySelector('.ui-selected');
      this.scrollIntoView();
    });
  }

  __unfocus;
  __focus = false;
  __showDropdown = false;
  focusing() {
    clearTimeout(this.__unfocus);
    this.__focus = true;
    UIEvent.queueTask(() => {
      this.__hilight = this.dropdown.querySelector('.ui-selected');
      if (this.__tether) this.__tether.position();
      this.scrollIntoView();
      this.input.select();
    });
    UIEvent.fireEvent('focus', this.element);
  }
  stopUnfocus() {
    clearTimeout(this.__unfocus);
    this.__focus = true;
  }
  unfocusing() {
    if (this.__hilight) this.__hilight.classList.remove('ui-highlight');
    if (!this.__tags) {
      this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', this.value).text;
      if (!this.forceSelect && !this.__value) this.__value = this.value;
    }
    UIEvent.queueTask(() => {
      this.__hilight = this.dropdown.querySelector('.ui-selected');
      this.scrollIntoView();
    });
    this.__unfocus = setTimeout(() => this.__focus = false, 200);
    UIEvent.fireEvent('blur', this.element);
  }

  openDropdown(force) {
    if (this.__tether) this.dropdown.style.minWidth = this.element.offsetWidth + 'px';
    if (this.__tether) this.__tether.position();
    this.__showDropdown = force || !this.__showDropdown;
    this.input.focus();
    UIEvent.queueTask(() => this.scrollIntoView());
  }

  highlightItem(evt) {
    if (this.__hilight) this.__hilight.classList.remove('ui-highlight');
    (this.__hilight = evt.target).classList.add('ui-highlight');
  }

  unhighlightItem(evt) {
    if (this.__hilight) this.__hilight.classList.remove('ui-highlight');
  }

  scrollIntoView() {
    this.dropdown.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.dropdown.offsetHeight / 2) : 0);
  }

  keyDown(evt) {
    if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
    if (this.readonly || this.disabled) return true;
    let code = (evt.keyCode || evt.which);

    if (code == 13 && this.__showDropdown) {
      if (this.__hilight) this.__hilight.click();
      if (!this.__hilight && this.forceSelect) this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', this.value).text;
      if (!this.__hilight && !this.forceSelect) this.fireChange();
      this.__showDropdown = false;
      return false;
    }
    else if (code == 13 && !this.__showDropdown) {
      return UIEvent.fireEvent('enterpressed', this.element, this);
    }
    if (code == 8 && this.__value == '') {
      return this.removeValue(null);
    }
    if (code === 9) {
      this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', this.value).text;
      if (!this.forceSelect && !this.__value) this.__value = this.value;
      return true;
    }
    if (this.__listGroups.length == 0) return true;

    if (!this.__showDropdown) {
      this.__showDropdown = true;
      if (this.__tether) this.__tether.position();
    }

    if (!this.__hilight) this.__hilight = this.dropdown.querySelector('.ui-selected');

    if (code === 38) {
      if (!this.__hilight) this.__hilight = this.dropdown.querySelector('.ui-list-item:last-child');
      if (this.__hilight) {
        this.__hilight.classList.remove('ui-highlight');
        let prev = this.__hilight.previousElementSibling;
        while (prev != null && (prev.tagName == 'P' || prev.classList.contains('ui-disabled'))) prev = prev.previousElementSibling;
        this.__hilight = prev || this.__hilight;
      }

      UIEvent.queueTask(() => {
        this.__hilight.classList.add('ui-highlight');
        this.scrollIntoView();
      });
      return false;
    }
    if (code === 40) {
      if (!this.__hilight) this.__hilight = this.dropdown.querySelector('.ui-list-item');
      if (this.__hilight) {
        this.__hilight.classList.remove('ui-highlight');
        let next = this.__hilight.nextElementSibling;
        while (next != null && (next.tagName == 'P' || next.classList.contains('ui-disabled'))) next = next.nextElementSibling;
        this.__hilight = next || this.__hilight;
      }
      UIEvent.queueTask(() => {
        this.__hilight.classList.add('ui-highlight');
        this.scrollIntoView();
      });
      return false;
    }

    return true;
  }

  search() {
    if (this.__hilight != null) this.__hilight.classList.remove('hilight');
    this.__hilight = null;
    this.dropdown.scrollTop = 0;

    let groups = [];
    let rx = new RegExp(getAscii(this.__value), 'i');
    _.forEach(_.cloneDeep(this.__options), (v, k) => {
      let list = _.filter(v.items, (n: any) => {
        var lbl = n.text + '';
        let asc = getAscii(lbl);
        if (rx.test(asc)) {
          let start = asc.search(rx);
          lbl = lbl.substr(0, start + this.__value.length) + '</u>' +
            lbl.substr(start + this.__value.length);
          lbl = lbl.substr(0, start) + '<u>' + lbl.substr(start);
          n.display = lbl;
          return true;
        }
        return false;
      });
      if (list.length !== 0) groups.push({ label: v.label, items: list });
    });
    if (!this.forceSelect && !this.__tags) this.value = this.__value;
    UIEvent.queueTask(() => this.__listGroups = groups);;
  }

  fireSelect(model?) {
    this.__listGroups = this.__options;
  }

  fireChange() { }

  removeValue(v) { }
}

@autoinject()
@customElement('ui-combo')
@inlineView(`<template class="ui-input-wrapper ui-combo \${__focus?'ui-focus':''} \${disabled?'ui-disabled':''} \${readonly?'ui-readonly':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of errors">\${e.message}</li></ul></span>
  <input class="ui-input" size="1" value.bind="__value" placeholder.bind="placeholder" 
    click.trigger="openDropdown(true)"
    keydown.trigger="keyDown($event)" 
    input.trigger="search() & debounce:200"
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled" readonly.bind="!__allowSearch" type="text"/>
  <span class="ui-clear" if.bind="__clear && __value" click.trigger="clear()">&times;</span>
  <span class="ui-input-addon ui-dropdown-handle" click.trigger="openDropdown()"><span class="fi-ui-angle-down"></span></span>
  <div class="ui-list-dropdown" show.bind="__focus && __showDropdown" ref="dropdown" mousedown.trigger="stopUnfocus()">
    <p if.bind="__listGroups.length==0" class="ui-list-group-label">\${emptyText}</p>
    <template repeat.for="group of __listGroups"><p if.bind="group.label" class="ui-list-group-label">\${group.label}</p>
    <div class="ui-list-item \${item.value==value?'ui-selected':''} \${item.disabled?'ui-disabled':''}" repeat.for="item of group.items" 
      mouseover.trigger="highlightItem($event)" mouseout.trigger="unhighlightItem($event)"
      click.trigger="fireSelect(item.model)"><span class="fi-ui \${iconClass} \${item.icon}" if.bind="item.icon"></span><span innerhtml.bind="item.display"></span></div>
    </template>
  </div></template>`)
export class UICombo extends ListGeneric {
  constructor(public element: Element) {
    super();
    this.__clear = element.hasAttribute('clear');
  }

  attached() {
    super.attached();
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
  detached() {
    this.__tether.destroy();
  }

  __clear;
  __tether;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';

  @bindable() options = [];
  @bindable() iconClass = '';
  @bindable() placeholder = '';
  @bindable() emptyText = 'No Results';

  @bindable() valueProperty = 'id';
  @bindable() displayProperty = 'text';
  @bindable() iconProperty = 'icon';

  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() forceSelect = true;

  clear() {
    this.__value = '';
    this.value = null;
    UIEvent.fireEvent('change', this.element, this.value);
  }

  fireSelect(model?) {
    super.fireSelect(model);
    if (model) {
      this.value = model[this.valueProperty];
      UIEvent.fireEvent('select', this.element, model);
    }
    this.__showDropdown = false;
  }

  fireChange() {
    UIEvent.fireEvent('change', this.element, this.value = this.__value);
  }
}

@autoinject()
@customElement('ui-tag')
@inlineView(`<template class="ui-input-wrapper ui-tag \${__focus?'ui-focus':''} \${disabled?'ui-disabled':''} \${readonly?'ui-readonly':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of errors">\${e.message}</li></ul></span>
  <div class="ui-tag-item" repeat.for="tag of value | split" if.bind="tag!=''">\${getDisplay(tag)}<span class="ui-clear" click.trigger="removeValue(tag)">&times;</span></div>
  <input class="ui-input" size="1" value.bind="__value" placeholder.bind="placeholder" 
    click.trigger="openDropdown(true)"
    keydown.trigger="keyDown($event)" 
    input.trigger="search() & debounce:200"
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled" readonly.bind="!__allowSearch" type="text"/>
  <div class="ui-list-dropdown" show.bind="!__noList && __focus && __showDropdown" ref="dropdown" mousedown.trigger="stopUnfocus()">
    <p if.bind="__listGroups.length==0" class="ui-list-group-label">\${emptyText}</p>
    <template repeat.for="group of __listGroups"><p if.bind="group.label" class="ui-list-group-label">\${group.label}</p>
    <div class="ui-list-item \${item.disabled?'ui-disabled':''}" repeat.for="item of group.items" 
      mouseover.trigger="highlightItem($event)" mouseout.trigger="unhighlightItem($event)"
      click.trigger="fireSelect(item.model)"><span class="fi-ui \${iconClass} \${item.icon}" if.bind="item.icon"></span><span innerhtml.bind="item.display"></span></div>
    </template>
  </div></template>`)
export class UITag extends ListGeneric {
  constructor(public element: Element) {
    super();
    this.__tags = true;
  }

  attached() {
    super.attached();
    if (this.__noList = this.element.hasAttribute('nolist')) this.forceSelect = false;
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
  detached() {
    this.__tether.destroy();
  }

  __noList;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';

  @bindable() options = [];
  @bindable() iconClass = '';
  @bindable() placeholder = '';
  @bindable() emptyText = 'No Results';

  @bindable() valueProperty = 'id';
  @bindable() displayProperty = 'text';
  @bindable() iconProperty = 'icon';

  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() forceSelect = true;

  clear() {
    this.__value = '';
    this.value = null;
  }

  getDisplay(tag) {
    return _['findChildren'](this.__options, 'items', 'value', tag).text || tag;
  }

  addValue(val) {
    let v = [];
    if (this.value) v = this.value.split(',');
    if (v.indexOf(val) == -1) {
      v.push(val);
      _['findChildren'](this.__listGroups = this.__options, 'items', 'value', val).disabled = true;
    }
    this.value = v.join(',');
    this.__value = '';
    if (this.__hilight) this.__hilight.classList.remove('ui-highlight');
    UIEvent.queueTask(() => this.__tether.position());
  }

  removeValue(val) {
    let v = [];
    if (this.value) v = this.value.split(',');
    if (!val) _['findChildren'](this.__listGroups = this.__options, 'items', 'value', v.pop()).disabled = false;
    else {
      _['findChildren'](this.__listGroups = this.__options, 'items', 'value', val).disabled = false;
      if (v.indexOf(val) != -1) v.splice(v.indexOf(val), 1);
    }
    this.value = v.join(',');
    this.__value = '';
    UIEvent.queueTask(() => this.__tether.position());
  }

  fireSelect(model?) {
    super.fireSelect(model);
    this.addValue(model ? model[this.valueProperty] : this.__value);
    UIEvent.fireEvent('change', this.element, this.value);
  }

  fireChange() {
    this.addValue(this.__value);
    UIEvent.fireEvent('change', this.element, this.value);
  }
}


@autoinject()
@customElement('ui-list')
@inlineView(`<template class="ui-input-wrapper ui-list \${disabled?'ui-disabled':''} \${readonly?'ui-readonly':''} \${__focus?'ui-focus':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of errors">\${e.message}</li></ul></span>
  <input class="ui-input \${!__allowSearch?'ui-remove':''}" size="1" value.bind="__value" placeholder.bind="placeholder" 
    keydown.trigger="keyDown($event)" 
    input.trigger="search() & debounce:200"
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled" readonly.bind="!__allowSearch" type="text"/>
  <div class="ui-list-container" ref="dropdown">
    <p if.bind="__listGroups.length==0" class="ui-list-group-label">\${emptyText}</p>
    <template repeat.for="group of __listGroups"><p if.bind="group.label" class="ui-list-group-label">\${group.label}</p>
    <div class="ui-list-item \${item.value==value?'ui-selected':''} \${item.disabled?'ui-disabled':''}" repeat.for="item of group.items" 
      mouseover.trigger="highlightItem($event)" mouseout.trigger="unhighlightItem($event)"
      click.trigger="fireSelect(item.model)"><span class="fi-ui \${iconClass} \${item.icon}" if.bind="item.icon"></span><span innerhtml.bind="item.display"></span></div>
    </template>
  </div></template>`)
export class UIList extends ListGeneric {
  constructor(public element: Element) {
    super();
    this.__showDropdown = true;
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';

  @bindable() options = [];
  @bindable() iconClass = '';
  @bindable() placeholder = '';
  @bindable() emptyText = 'No Results';

  @bindable() valueProperty = 'id';
  @bindable() displayProperty = 'text';
  @bindable() iconProperty = 'icon';

  @bindable() disabled = false;
  @bindable() readonly = false;

  fireSelect(model) {
    super.fireSelect(model);
    this.value = model[this.valueProperty];
    UIEvent.fireEvent('select', this.element, model);
  }
}
