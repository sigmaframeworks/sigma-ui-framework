// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, bindingMode, containerless, children, customElement, inlineView, noView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import {UIFormat} from "../../utils/ui-format";
import * as Tether from "tether";

@autoinject()
@customElement('ui-datagrid')
@inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<div show.bind="__resizing" ref="__ghost" class="ui-dg-ghost"></div>
<div show.bind="data.length==0" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div class="ui-dg-wrapper" ref="__dgWrapHead">
<table width.bind="calculateWidth(__columns)" css.bind="{'table-layout': __tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of __columns" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <thead><tr>
    <td repeat.for="col of __columns" click.trigger="doSort(col)" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>
      <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
      <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
      <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col, __columns[$index+1])"></span>
    </div></td>
    <td class="ui-expander"><div><span class="ui-dg-header">&nbsp;</span></div></td>
  </tr></thead>
</table>
</div>
<div class="ui-dg-wrapper scrolling" scroll.trigger="scrolling($event)" ref="__scroller">
<table width.bind="calculateWidth(__columns)" css.bind="{'table-layout': __tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of __columns" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody>
    <tr if.bind="!__virtual" repeat.for="record of data" click.delegate="fireSelect($parent.selected=record)" class="\${$parent.__rowSelect && $parent.selected==record?'ui-selected':''}">
    <td repeat.for="col of __columns" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}">
      <div if.bind="col.type=='normal'"><span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>
      <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><span class="fi-ui \${col.getIcon(record[col.dataId],record)}" if.bind="col.icon"></span> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
      <div if.bind="col.type=='button'" class="no-padding"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square icon.bind="col.getIcon(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
      <div if.bind="col.type=='switch'" class="no-padding"><ui-switch change.trigger="col.fireChange($event.detail,record)" theme.bind="col.theme" checked.bind="record[col.dataId]" 
        off-label.bind="col.offLabel" off-value.bind="col.offValue" on-label.bind="col.onLabel" on-value.bind="col.onValue" width.bind="col.width" disabled.bind="col.isDisabled(record[col.dataId],record)"></ui-switch></div>
    </td><td class="ui-expander"><div>&nbsp;</div></td></tr>
    
    <tr if.bind="__virtual" virtual-repeat.for="record of data" click.delegate="fireSelect($parent.selected=record)" class="\${$parent.__rowSelect && $parent.selected==record?'ui-selected':''}">
    <td repeat.for="col of __columns" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}">
      <div if.bind="col.type=='normal'"><span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>
      <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><span class="fi-ui \${col.getIcon(record[col.dataId],record)}" if.bind="col.icon"></span> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
      <div if.bind="col.type=='button'" class="no-padding"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square icon.bind="col.getIcon(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
      <div if.bind="col.type=='switch'" class="no-padding"><ui-switch change.trigger="col.fireChange($event.detail,record)" theme.bind="col.theme" checked.bind="record[col.dataId]" 
        off-label.bind="col.offLabel" off-value.bind="col.offValue" on-label.bind="col.onLabel" on-value.bind="col.onValue" width.bind="col.width" disabled.bind="col.isDisabled(record[col.dataId],record)"></ui-switch></div>
    </td><td class="ui-expander"><div>&nbsp;</div></td></tr>
    
    <tr><td repeat.for="col of __columns" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div if.bind="!__virtual">&nbsp;</div></td><td class="ui-expander"><div if.bind="!__virtual">&nbsp;</div></td></tr>
  </tbody>
</table></div>
<div class="ui-dg-wrapper" ref="__dgWrapFoot">
<table width.bind="calculateWidth(__columns)" css.bind="{'table-layout': __tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of __columns" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tfoot if.bind="summaryRow"><tr>
    <td repeat.for="col of __columns" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div innerhtml.bind='col.getSummary(summaryRow)'></div></td>
    <td class="ui-expander"><div>&nbsp;</div></td>
  </tr></tfoot>
</table></div></template>`)
export class UIDatagrid {
  constructor(public element: Element) {
    if (element.hasAttribute('auto-height')) this.element.classList.add('ui-auto-size');
    if (element.hasAttribute('rowselect')) this.__rowSelect = true;
    if (element.hasAttribute('virtual')) this.__virtual = true;
  }

  bind() {
    this.__columns = _.sortBy(this.columns, 'locked');
  }

  columnsChanged(newValue) {
    this.__columns = _.sortBy(this.columns, 'locked');
  }

  @children('ui-dg-column,ui-dg-button,ui-dg-switch,ui-dg-link,ui-dg-input') columns;

  @bindable() data = [];
  @bindable() summaryRow = false;
  @bindable() sortColumn = '';
  @bindable() sortOrder = '';

  __virtual = false;
  __rowSelect;
  __columns = [];
  __tableWidth = '';

  calculateWidth(cols) {
    let w = 0;
    _.forEach(cols, c => { c.left = w; w += c.getWidth(); });
    return (this.__tableWidth = (w + 20) + 'px');
  }

  dataChanged(newValue) {
    UIEvent.queueTask(() => this.data = _.orderBy(this.data, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]));
  }

  __dgWrapHead;
  __dgWrapFoot;
  scrolling(evt) {
    if (this.__dgWrapHead) this.__dgWrapHead.scrollLeft = evt.target.scrollLeft;
    if (this.__dgWrapFoot) this.__dgWrapFoot.scrollLeft = evt.target.scrollLeft;
  }

  doSort(col) {
    if (!col.sortable) return;
    if (this.sortColumn != col.dataId) this.sortOrder = 'asc';
    if (this.sortColumn == col.dataId) this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    this.sortColumn = col.dataId;
    UIEvent.queueTask(() => this.data = _.orderBy(this.data, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]));
  }

  __move;
  __stop;
  __diff;
  __startX;
  __column;
  __colNext;
  __ghost;
  __scroller;
  __resizing = false;
  resizeColumn(evt, col, next) {
    if (evt.button != 0) return true;
    this.__diff = 0;
    this.__column = col;
    this.__colNext = next;
    this.__resizing = true;
    this.__startX = (evt.x || evt.clientX);
    this.__ghost.style.left = (col.left + parseInt(col.width) - (col.locked == 0 ? 0 : this.__scroller.scrollLeft)) + 'px';
    document.addEventListener('mouseup', this.__stop = evt => this.__resizeEnd(evt));
    document.addEventListener('mousemove', this.__move = evt => this.__resize(evt));
  }
  __resize(evt) {
    var x = (evt.x || evt.clientX) - this.__startX;
    if (x < 0 && (parseInt(this.__column.width) + this.__diff) <= (this.__column.minWidth || 80)) return;
    if (x > 0 && (parseInt(this.__column.width) + this.__diff) >= (500)) return;

    this.__startX = (evt.x || evt.clientX);
    this.__diff += x;
    this.__ghost.style.left = (parseInt(this.__ghost.style.left) + x) + 'px';
  }
  __resizeEnd(evt) {
    this.__resizing = false;
    if (this.__colNext) this.__colNext.left += this.__diff;
    this.__column.width = (parseInt(this.__column.width) + this.__diff);
    this.calculateWidth(this.__columns);
    document.removeEventListener('mousemove', this.__move);
    document.removeEventListener('mouseup', this.__stop);
  }

  fireSelect(record) {
    UIEvent.fireEvent('rowselect', this.element, ({ record }));
  }
}

@containerless()
@customElement('ui-dg-empty')
@inlineView(`<template><div slot="dg-empty"><slot></slot></div></template>`)
export class UIDGEmpty { }

export class UIDataColumn {
  constructor(public element: Element) {
    this.resize = element.hasAttribute('resizeable');
    this.sortable = element.hasAttribute('sortable');
    this.locked = element.hasAttribute('locked') ? 0 : 1;

    //alignment
    if (element.hasAttribute('center')) this.align = 'ui-text-center';
    else if (element.hasAttribute('end')) this.align = 'ui-text-end';

    if (element.hasAttribute('age')) this.dataType = 'age';
    else if (element.hasAttribute('date')) this.dataType = 'date';
    else if (element.hasAttribute('time')) this.dataType = 'time';
    else if (element.hasAttribute('datetime')) this.dataType = 'datetime';
    else if (element.hasAttribute('fromnow')) this.dataType = 'fromnow';
    else if (element.hasAttribute('number')) this.dataType = 'number';
    else if (element.hasAttribute('currency')) this.dataType = 'currency';
    else if (element.hasAttribute('percent')) this.dataType = 'percent';
    else if (element.hasAttribute('exrate')) this.dataType = 'exrate';

  }

  dataId;
  width;
  minWidth;

  value;
  display;

  dataType = 'text';
  format = null;
  align = 'ui-text-start';

  left = 0;
  locked = 1;
  resize = false;
  sortable = false;

  getWidth(tw) {
    this.width = convertToPx(this.width || this.minWidth || 250);
    tw += this.width;
    return this.width;
  }
  getTitle() {
    return this.element.innerHTML;
  }
  getValue(value, record) {
    return this.processValue(value, record) || '&nbsp;';
  }
  processValue(value, record) {
    let retVal = '';
    // let value = record[this.dataId];
    if (isFunction(this.value)) value = this.value(value, record);
    if (isFunction(this.display))
      retVal = this.display(({ value, record })) || '';
    else {
      switch (this.dataType) {
        case 'age': retVal = UIFormat.age(value); break;
        case 'date': retVal = UIFormat.date(value, this.format); break;
        case 'time': retVal = UIFormat.time(value, this.format); break;
        case 'datetime': retVal = UIFormat.datetime(value, this.format); break;
        case 'fromnow': retVal = UIFormat.fromNow(value); break;
        case 'number': retVal = UIFormat.number(value, this.format); break;
        case 'currency': retVal = UIFormat.currency(value, this.format); break;
        case 'percent': retVal = UIFormat.percent(value); break;
        case 'exrate': retVal = UIFormat.exRate(value); break;
        default: retVal = value; break;
      }
    }
    return retVal;
  }

}

@autoinject()
@customElement('ui-dg-column')
@inlineView(`<template><slot></slot></template>`)
export class UIDGColumn extends UIDataColumn {
  type = 'normal';
  constructor(public element: Element) {
    super(element);
  }

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() class;
  @bindable() value;
  @bindable() display;

  @bindable() format;
}

@autoinject()
@customElement('ui-dg-link')
@inlineView(`<template><slot></slot></template>`)
export class UIDGLink extends UIDataColumn {
  type = 'link';
  constructor(public element: Element) {
    super(element);
  }

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() icon;
  @bindable() label;
  @bindable() class;
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }

  getIcon(value, record) {
    if (isFunction(this.icon)) return this.icon(({ value, record }));
    return record[this.icon] || this.icon;
  }

  getLabel(value, record) {
    if (isFunction(this.label)) return this.label(({ value, record }));
    return this.label || this.processValue(value, record) || '';
  }

  fireClick($event, value, record) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.isDisabled(value, record)) return;
    UIEvent.fireEvent('click', this.element, ({ value, record }));
    return false;
  }
}

@autoinject()
@customElement('ui-dg-button')
@inlineView(`<template><slot></slot></template>`)
export class UIDGButton extends UIDataColumn {
  type = 'button';
  constructor(public element: Element) {
    super(element);
    this.align = 'ui-text-center';
  }

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() icon;
  @bindable() label;
  @bindable() dropdown;
  @bindable() theme: any = 'default';
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }

  getIcon(value, record) {
    if (isFunction(this.icon)) return this.icon(({ value, record }));
    return record[this.icon] || this.icon;
  }

  getLabel(value, record) {
    if (isFunction(this.label)) return this.label(({ value, record }));
    return this.label || this.processValue(value, record) || '';
  }

  getTheme(value, record) {
    if (isFunction(this.theme)) return this.theme(({ value, record }));
    return this.theme;
  }

  fireClick($event, value, record) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.isDisabled(value, record)) return;
    UIEvent.fireEvent('click', this.element, ({ value, record }));
    return false;
  }

  fireMenuOpen($event, record) {
    $event.stopPropagation();
    return UIEvent.fireEvent('menuopen', this.element, ({ record }));
  }
}

@autoinject()
@customElement('ui-dg-switch')
@inlineView(`<template><slot></slot></template>`)
export class UIDGSwitch extends UIDataColumn {
  type = 'switch';
  constructor(public element: Element) {
    super(element);
    this.align = 'ui-text-center';
  }

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

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
  @bindable() theme = 'default';
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }
  fireChange(value, record) {
    UIEvent.fireEvent('change', this.element, ({ value, record }));
  }
}