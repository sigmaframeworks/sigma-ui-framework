// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, children, customElement, inlineView, bindingMode, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import {UIConstants} from "../../utils/ui-constants";
import * as _ from "lodash";
import * as Tether from "tether";

// TODO: Allow custom value
// TODO: Add tag input

export class ListGeneric {
  input;
  element;
  dropdown;

  __tether;

  __list = false;
  __tags = false;
  __value = '';
  __hilight = null;
  __allowSearch = true;

  __options = [];
  __listGroups = [];

  value = '';
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

  busy;
  disable(disabled?) {
    this.busy = disabled;
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
      else if (!this.__value) this.value = '';
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
    if (this.__list) {
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
@inlineView(`<template class="ui-input-wrapper ui-combo \${__focus?'ui-focus':''} \${disabled?'ui-disabled':''} \${readonly || busy?'ui-readonly':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of __errors">\${e.message}</li></ul></span>
  <div class="ui-input-div"><input class="ui-input" size="1" value.bind="__value" placeholder.bind="placeholder" 
    click.trigger="openDropdown(true)"
    keydown.trigger="keyDown($event)" 
    input.trigger="search() & debounce:200"
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled || busy" readonly.bind="!__allowSearch" type="text"/>
  <span class="ui-clear" if.bind="__clear && __value" click.trigger="clear()">&times;</span>
  <span class="ui-input-addon ui-dropdown-handle" click.trigger="openDropdown()"><span class="fi-ui-angle-down"></span></span></div>
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
    this.__list = true;
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
    DOM.removeNode(this.dropdown);
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
@inlineView(`<template class="ui-input-wrapper ui-tag \${__focus?'ui-focus':''} \${disabled?'ui-disabled':''} \${readonly || busy?'ui-readonly':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of __errors">\${e.message}</li></ul></span>
  <div class="ui-input-div"><div class="ui-tag-item" repeat.for="tag of value | split" if.bind="tag!=''">\${getDisplay(tag)}<span class="ui-clear" click.trigger="removeValue(tag)">&times;</span></div>
  <input class="ui-input" size="1" value.bind="__value" placeholder.bind="placeholder" 
    click.trigger="openDropdown(true)"
    keydown.trigger="keyDown($event)" 
    input.trigger="search() & debounce:200"
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled || busy" readonly.bind="!__allowSearch" type="text"/></div>
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
    DOM.removeNode(this.dropdown);
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
@inlineView(`<template class="ui-input-wrapper ui-list \${disabled?'ui-disabled':''} \${readonly || busy?'ui-readonly':''} \${__focus?'ui-focus':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of __errors">\${e.message}</li></ul></span>
  <div class="ui-input-div"><input class="ui-input \${!__allowSearch?'ui-remove':''}" size="1" value.bind="__value" placeholder.bind="placeholder" 
    keydown.trigger="keyDown($event)" 
    input.trigger="search() & debounce:200"
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled || busy" readonly.bind="!__allowSearch" type="text"/>
  <div class="ui-list-container" ref="dropdown">
    <p if.bind="__listGroups.length==0" class="ui-list-group-label">\${emptyText}</p>
    <template repeat.for="group of __listGroups"><p if.bind="group.label" class="ui-list-group-label">\${group.label}</p>
    <div class="ui-list-item \${item.value==value?'ui-selected':''} \${item.disabled?'ui-disabled':''}" repeat.for="item of group.items" 
      mouseover.trigger="highlightItem($event)" mouseout.trigger="unhighlightItem($event)"
      click.trigger="fireSelect(item.model)"><span class="fi-ui \${iconClass} \${item.icon}" if.bind="item.icon"></span><span innerhtml.bind="item.display"></span></div>
    </template>
  </div></div></template>`)
export class UIList extends ListGeneric {
  constructor(public element: Element) {
    super();
    this.__list = true;
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



@autoinject()
@customElement('ui-language')
@inlineView(`<template class="ui-input-wrapper ui-language \${__focus?'ui-focus':''} \${disabled?'ui-disabled':''} \${readonly || busy?'ui-readonly':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of __errors">\${e.message}</li></ul></span>
  <div class="ui-input-div"><input class="ui-input" size="1" value.bind="__value" 
    click.trigger="openDropdown(true)"
    keydown.trigger="keyDown($event)" 
    focus.trigger="focusing()" blur.trigger="unfocusing()"
    ref="input" disabled.bind="disabled" readonly.bind="true" type="text"/>
  <span class="ui-input-addon ui-dropdown-handle" click.trigger="openDropdown()"><span class="fi-ui-angle-down"></span></span></div>
  <div class="ui-list-dropdown" show.bind="__focus && __showDropdown" ref="dropdown" mousedown.trigger="stopUnfocus()">
    <p class="ui-list-group-label">Added</p>
    <p if.bind="__selected.length==0" class="ui-text-muted ui-pad-h">No Languages Added</p>
    <div class="ui-lang-item" repeat.for="item of __selected | sort:'name'">
        <div click.trigger="fireSelect(item)" class="ui-list-item \${item.id==value?'ui-selected':''}" 
          mouseover.trigger="highlightItem($event)" mouseout.trigger="unhighlightItem($event)">
          <span class="fi-ui-danger ui-text-warning" if.bind="errors.indexOf(item.id)>=0"></span>
          <span innerhtml.bind="item.name"></span>
        </div>
        <div class="fi-ui fi-ui-tree-collapse ui-text-danger" show.bind="__selected.length>1" click.trigger="remove(item)"></div></div>
    <p class="ui-list-group-label">Available</p>
    <p if.bind="__available.length==0" class="ui-text-muted ui-pad-h">No Languages Available</p>
    <div class="ui-lang-item" repeat.for="item of __available | sort:'name'">
      <div innerhtml.bind="item.name" click.trigger="add(item)" class="ui-list-item"
        mouseover.trigger="highlightItem($event)" mouseout.trigger="unhighlightItem($event)"></div>
        <div class="fi-ui fi-ui-tree-expand ui-text-info"></div></div>
    </template>
  </div></template>`)
export class UILanguage extends ListGeneric {
  constructor(public element: Element) {
    super();
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
    DOM.removeNode(this.dropdown);
  }

  bind() {
    this.__available = _.clone(UIConstants.Languages);
    _.forEach(this.languages, l => this.__selected = this.__selected.concat(_.remove(this.__available, ['id', l])));
    if (this.width) this.element['style'].width = this.width;
  }

  __tether;
  __selected = [];
  __available = [];
  errors = [];

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';

  @bindable() languages: any = [];
  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() width;

  valueChanged(newValue) {
  }

  languagesChanged(newValue) {
  }

  addError(lang) {
    this.errors.push(lang);
    this.errors = [].concat(this.errors);
  }
  removeError(lang) {
    if (this.errors.indexOf(lang) > -1) this.errors.splice(this.errors.indexOf(lang), 1);
    this.errors = [].concat(this.errors);
  }

  busy;
  disable(disabled?) {
    this.busy = disabled;
  }

  fireSelect(model?) {
    if (!model) return;
    if (UIEvent.fireEvent('beforeselect', this.element, model.id) !== false) {
      this.__showDropdown = false;
      this.__value = model.name;
      this.value = model.id;
      UIEvent.fireEvent('select', this.element, model);
    }
  }

  add(model) {
    this.__showDropdown = false;
    this.__value = model.name;
    this.languages.push(this.value = model.id);
    this.__selected = this.__selected.concat(_.remove(this.__available, ['id', model.id]));
    UIEvent.fireEvent('add', this.element, model);
    UIEvent.fireEvent('select', this.element, model);
  }

  remove(model) {
    this.__showDropdown = false;
    _.remove(this.languages, model.id);
    this.__available = this.__available.concat(_.remove(this.__selected, ['id', model.id]));
    UIEvent.fireEvent('remove', this.element, model);
    if (this.__available.length > 0) UIEvent.fireEvent('select', this.element, this.__available[0]);
  }
}

@autoinject()
@inlineView(`<template class="ui-input-wrapper ui-list ui-reorder">
    <div class="ui-list-container">
        <div model.bind="opt" repeat.for="opt of options & oneTime" class="ui-list-item" data-value="\${$index}" mousedown.trigger="startDrag(opt, $event)">
            <span class="fi-ui-drawer"></span>
            <span class="ui-col-fill" innerhtml.bind="opt[displayProperty] || opt"></span>
        </div>

        <div class="ui-list-item ui-ghost" if.bind="ghostModel" ref="__ghostEl" css.bind="{top:__top+'px'}">
            <span class="fi-ui-drawer"></span>
            <span class="ui-col-fill" innerhtml.bind="ghostModel[displayProperty] || ghostModel"></span>
        </div>
    </div>
</template>`)
@customElement('ui-reorder')
export class UIReorder {
  private ghostModel;

	/**
	   * @property    list
	   * @type        array
	   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  options: Array<any> = [];
	/**
	 * @property    display-property
	 * @type        string
	 */
  @bindable()
  displayProperty: any = 'name';


  constructor(public element: Element) {
  }

  private __startY = 0;
  private __ghostEl;
  private __dragEl;
  private __diff = 0
  private __top = 0;

  private __move;
  private __stop;
  private __list;

  startDrag(opt, $event) {
    if ($event.button != 0) return;
    this.ghostModel = opt;

    this.__dragEl = getParentByClass($event.target, 'ui-list-item', 'ui-list-group');
    this.__top = this.__diff = this.__dragEl.offsetTop;
    this.__dragEl.classList.add('dragging');
    this.__list = this.element.querySelectorAll('.ui-list-item');

    this.__startY = ($event.y || $event.clientY);

    document.addEventListener('mousemove', this.__move = e => this.move(e));
    document.addEventListener('mouseup', this.__stop = e => this.stopDrag(e));
  }

  move($event) {
    var y = ($event.y || $event.clientY) - this.__startY;

    this.__startY = ($event.y || $event.clientY);
    this.__diff += y;

    let sh = this.__dragEl.offsetParent.scrollHeight;
    this.__top = this.__diff < 0 ? 0 : (this.__diff > sh ? sh : this.__diff);
    this.__dragEl.offsetParent.scrollTop = this.__top - (sh / 2);

    if (this.__top >= this.__dragEl.offsetTop + this.__dragEl.offsetHeight) {
      let next = this.__dragEl.nextSibling;
      if (next) this.__dragEl.parentElement.insertBefore(next, this.__dragEl);
    }
    if (this.__top + this.__dragEl.offsetHeight <= this.__dragEl.offsetTop) {
      let prev = this.__dragEl.previousSibling;
      if (prev) this.__dragEl.parentElement.insertBefore(this.__dragEl, prev);
    }

  }
  stopDrag($event) {
    this.__dragEl.classList.remove('dragging');
    this.ghostModel = null;

    let list = this.element.querySelectorAll('.ui-list-item');
    let newList = [];
    _.forEach(list, (l: any) => {
      if (l.model) newList.push(l.model);
    });
    this.options = newList;

    document.removeEventListener('mousemove', this.__move);
    document.removeEventListener('mouseup', this.__stop);
  }
}
