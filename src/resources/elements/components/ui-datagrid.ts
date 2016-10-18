// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, children, customElement, inlineView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as Tether from "tether";

@autoinject()
@customElement('ui-datagrid')
@inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<table>
  <ui-dg-col-group columns.bind="columns"></ui-dg-col-group>
</table>
</template>`)
export class UIDatagrid {
  constructor(public element: Element) { }

  bind() {
    this.__columns = _.sortBy(this.columns, 'locked');
  }

  columnsChanged(newValue) {
    this.__columns = _.sortBy(this.columns, 'locked');
  }

  @children('ui-data-column') columns;

  __columns = [];
}