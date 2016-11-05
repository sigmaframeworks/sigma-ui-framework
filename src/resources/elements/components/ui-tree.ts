// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, bindingMode, customElement, computedFrom, inlineView, children, BindingEngine} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import {UITreeOptions, UITreeModel} from "../../utils/ui-tree-model";
import * as _ from "lodash";

@autoinject()
@customElement('ui-tree')
@inlineView(`<template class="ui-tree-panel \${__searchable?'has-search':''}"><div class="ui-search ui-group-wrapper" if.bind="__searchable">
  <span class="ui-input-addon"><span class="fi-ui-search"></span></span>
  <ui-input type="search" placeholder="Search..." clear value.bind="searchText & debounce:200"></ui-input></div>
  <div class="ui-tree-level">
    <tree-node repeat.for="child of root.children | sort:'name'" node.bind="child" options.bind="options" nodeclick.delegate="__itemClicked($event.detail)"></tree-node>
  </div></template>`)
export class UITreePanel {
  constructor(public element: Element, observer: BindingEngine) {
    this.__searchable = element.hasAttribute('searchable');
    this.__subscribeSearch = observer.propertyObserver(this, 'searchText')
      .subscribe(v => this.__searchTextChanged(v));
  }

  bind() {
    this.modelChanged(this.model || []);
    this.valueChanged(this.value);
  }

  attached() {
    UIEvent.queueTask(() => {
      // let x;
      // if ((x = this.element.querySelector('.ui-active')) !== null) x.scrollIntoView();
    });
  }

  detached() {
    this.__subscribeSearch.dispose();
  }

  valueChanged(newValue) {
    if (this.__ignoreChange) return;
    if (!this.options.showCheckbox) this.__find(this.root.children, newValue, 'active', true, true);
    else {
      _.forEach(this.root.children, n => n.isChecked = false);
      _.forEach((newValue || '').split(','), v => this.__find(this.root.children, v, 'checked', true, true));
    }
  }
  modelChanged(newValue) {
    this.root = new UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
      id: '',
      name: this.options.rootLabel,
      children: newValue
    }, null);
  }

  getChecked() {
    return this.__getChecked(this.root.children);
  }

  @computedFrom('root')
  private get rootNodes() {
    return this.options.showRoot ? [this.root] : this.root.children;
  }

  private root: UITreeModel;
  private searchText: string = '';
  private selectedNode: any = {};

  __searchable;
  __ignoreChange;
  __subscribeSearch;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value;
  @bindable()
  model = [];
  @bindable()
  options: UITreeOptions = new UITreeOptions();

  private __find(obj, id, field, value = true, expand = false) {
    var self = this;
    return _.find(obj, (n: UITreeModel) => {
      var found = n.id == id;
      if (!found && _.isArray(n.children)) {
        found = !_.isEmpty(self.__find(n.children, id, field, value));
        if (expand && found) n.expanded = true;
      }
      else if (found) {
        if (field == 'active') self.__itemSelect(n);
        if (field == 'expanded') n.expanded = value;
        if (field == 'checked') n.isChecked = value ? 1 : 0;
      }

      return found;
    });
  }
  private __getChecked(nodes, retVal = { checked: [], partial: [], unchecked: [] }) {
    var self = this;
    _.forEach(nodes, (n: UITreeModel) => {
      if (n.checked == 2) retVal.partial.push(n.id);
      if (n.checked == 1) retVal.checked.push(n.id);
      if (n.checked == 0) retVal.unchecked.push(n.id);
      if (_.isArray(n.children)) self.__getChecked(n.children, retVal);
    });
    return retVal;
  }
  private __itemSelect(node) {
    if (UIEvent.fireEvent('beforeselect', this.element, node)) {
      let p;
      this.__ignoreChange = true;
      if (this.selectedNode) {
        (p = this.selectedNode).active = false;
        while (p = p.parent) p.childActive = false;
      }
      (p = this.selectedNode = node).active = true;
      while (p = p.parent) p.childActive = true;
      this.value = node.id;
      UIEvent.fireEvent('select', this.element, node);
      UIEvent.queueTask(() => this.__ignoreChange = false);
    }
  }
  private __itemChecked(node) {
    if (UIEvent.fireEvent('beforechecked', this.element, node)) {
      this.__ignoreChange = true;
      node.isChecked = !node.checked;
      let nodes = this.__getChecked(this.root.children);
      this.value = nodes.checked.join(',');
      UIEvent.fireEvent('checked', this.element, node);
      UIEvent.queueTask(() => this.__ignoreChange = false);
    }
  }

  private __itemClicked(node) {
    if (node.root) return;

    if (this.options.showCheckbox) {
      if (node.level >= this.options.checkboxLevel) {
        this.__itemChecked(node);
      }
    }
    else if (node.level < this.options.selectionLevel) {
      node.expanded = !node.expanded;
    }
    else if (node.level >= this.options.selectionLevel) {
      this.__itemSelect(node);
    }
  }



  private __searchTextChanged(newValue) {
    this.__filter(this.root.children, newValue);
  }

  private __filter(obj, value, parentVisible: boolean = false): boolean {
    var self = this, ret = false, rx = new RegExp(getAscii(value), 'gi');

    _.forEach(obj, (n: UITreeModel) => {
      n.text = n.text.replace(/<b>/gi, '')
        .replace(/<\/b>/gi, '');
      n.expanded = !_.isEmpty(value) && n.level <= 2 && parentVisible === false;

      if (_.isEmpty(value) && self.selectedNode.id == n.id && self.selectedNode.level == n.level) {
        var p = n.parent;
        while (p) {
          p.expanded = true;
          p = p.parent;
        }
      }
      var match = rx.test(getAscii(n.text));
      if (!_.isEmpty(value) && match) {
        n.parent.expanded = true;
        let start = getAscii(n.text).search(rx);
        let name = n.text.substr(0, start + value.length) + '</b>' + n.text.substr(start + value.length);
        n.text = name.substr(0, start) + '<b>' + name.substr(start);
      }

      n.isVisible = n.children.length > 0 ? self.__filter(n.children, value, match || parentVisible) : (match || parentVisible);

      ret = ret || n.isVisible;
    });

    return ret;
  }
}

@autoinject()
@inlineView(`<template class="ui-tree-item">
    <div class="ui-tree-item-link \${node.disabled?'ui-disabled':''}" if.bind="node.isVisible">
        <a class="ui-expander \${node.expanded?'expanded':''}" if.bind="!node.leaf" click.trigger="node.expanded=!node.expanded">
            <span class="fi-ui"></span>
        </a>
        <a class="ui-node-checkbox \${node.checked<1?'off':''} \${node.checked==1?'on':''} \${node.checked==2?'partial':''}" if.bind="options.showCheckbox && node.level>=options.checkboxLevel" click.trigger="fireClicked()">
            <span class="fi-ui"></span>
        </a>
        <a class="ui-node-link \${!options.showCheckbox && node.active?'ui-active':node.childActive?'ui-partial':''}" data-id="\${node.id}" click.trigger="fireClicked()">
            <span class="ui-icon fi-ui" if.bind="node.isLeaf"></span>
            <span class="ui-icon \${node.icon}" if.bind="node.icon"></span>
            <span innerhtml.bind="node.text"></span>
        </a>
    </div>
    <div class="ui-tree-level" if.bind="node.isVisible && !node.leaf && node.expanded">
        <tree-node repeat.for="child of node.children | sort:'name'" node.bind="child" options.bind="options"></tree-node>
    </div>
</template>`)
export class TreeNode {
  @bindable
  node: UITreeModel;
  @bindable
  options: UITreeOptions;

  constructor(public element: Element) { }

  fireClicked() {
    UIEvent.fireEvent('nodeclick', this.element, this.node);
  }
}