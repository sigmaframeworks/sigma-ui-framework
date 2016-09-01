// UI Tree Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, bindable, useView, computedFrom, customElement, bindingMode, BindingEngine, TaskQueue} from "aurelia-framework";
import {UITreeModel, UITreeOptions} from "../utils/ui-tree-models";
import {_, UIUtils} from "../utils/ui-utils";
import {UIEvent} from "../utils/ui-event";

@autoinject()
@customElement('ui-tree')
export class UITree {
    private root: UITreeModel;
    private searchText: string = '';
    private selectedNode: any = {};

    __subscribeSelect;
    __subscribeChecked;
    __subscribeSearch;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value;
    @bindable()
    model = [];
    @bindable()
    options: UITreeOptions = new UITreeOptions();

    constructor(public element: Element, public taskQueue: TaskQueue, observer: BindingEngine) {
        var self = this;
        this.__subscribeSelect = UIEvent.subscribe('tree-select', v => self.__itemSelect(v));
        this.__subscribeChecked = UIEvent.subscribe('tree-checked', v => self.__itemChecked(v));
        this.__subscribeSearch = observer.propertyObserver(this, 'searchText')
            .subscribe(v => self.__searchTextChanged(v));

    }

    private bind() {
        this.root = new UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
            id: '',
            name: this.options.rootLabel,
            children: this.model
        }, null);

        // this.valueChanged(this.value);
        if (!this.options.showCheckbox) this.select(this.value, this.options.selectionLevel);
    }

    private attached() {
        this.taskQueue.queueMicroTask(() => {
            let x;
            if ((x = this.element.querySelector('.ui-active')) !== null) x.scrollIntoView();
        });
    }

    private detached() {
        this.__subscribeSelect.dispose();
        this.__subscribeChecked.dispose();
        this.__subscribeSearch.dispose();
    }

    @computedFrom('root')
    private get rootNodes() {
        return this.options.showRoot ? [this.root] : this.root.children;
    }

    private __itemSelect(node) {
        if (this.selectedNode) {
            this.selectedNode.active = false;
        }
        (this.selectedNode = node).active = true;
        this.value = node.id;
        UIEvent.fireEvent('change', this.element, node);
    }

    private __itemChecked(node) {
        UIEvent.fireEvent('checked', this.element, this.getChecked());
    }

    private modelChanged(newValue) {
        this.root = new UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
            id: '',
            name: this.options.rootLabel,
            children: newValue
        }, null);
    }

    private valueChanged(newValue) {
    }

    private __searchTextChanged(newValue) {
        this.__filter(this.root.children, newValue);
    }

    private __filter(obj, value, parentVisible: boolean = false): boolean {
        var self = this, ret = false, rx = new RegExp(UIUtils.getAscii(value), 'gi');

        _.forEach(obj, (n: UITreeModel) => {
            n.name = n.name.replace(/<b>/gi, '')
                .replace(/<\/b>/gi, '');
            n.expanded = !_.isEmpty(value) && n.level <= 2 && parentVisible === false;

            if (_.isEmpty(value) && self.selectedNode.id == n.id && self.selectedNode.level == n.level) {
                var p = n.parent;
                while (p) {
                    p.expanded = true;
                    p = p.parent;
                }
                UIEvent.queueTask(() => {
                    let x;
                    if ((x = this.element.querySelector('.ui-active')) !== null) x.scrollIntoView();
                });
            }
            var match = rx.test(UIUtils.getAscii(n.name));
            if (!_.isEmpty(value) && match) {
                n.parent.expanded = true;
                let start = UIUtils.getAscii(n.name)
                    .search(rx);
                let name = n.name.substr(0, start + value.length) + '</b>' + n.name.substr(start + value.length);
                n.name = name.substr(0, start) + '<b>' + name.substr(start);
            }

            n.isVisible = n.children.length > 0 ? self.__filter(n.children, value, match || parentVisible) : (match || parentVisible);

            ret = ret || n.isVisible;
        });

        return ret;
    }

    private __find(obj, id, level, field, value = true) {
        var self = this;
        return _.find(obj, (n: UITreeModel) => {
            var found = n.id == id && n.level >= level;
            if (!found && _.isArray(n.children)) {
                found = !_.isEmpty(self.__find(n.children, id, level, field, value));
                n.expanded = found;
            }
            else if (found) {
                if (field == 'active') self.__itemSelect(n);
                if (field == 'expanded') n.expanded = value;
                if (field == 'checked') n.isChecked = value ? 1 : 0;

                UIEvent.queueTask(() => {
                    let x;
                    if ((x = this.element.querySelector('.ui-active')) !== null) x.scrollIntoView();
                });
            }

            return found;
        });
    }

    private __getChecked(nodes, retVal) {
        var self = this;
        return _.forEach(nodes, (n: UITreeModel) => {
            if (n.checked == 2) retVal.partial.push(n.id);
            if (n.checked == 1) retVal.checked.push(n.id);
            if (n.checked == 0) retVal.unchecked.push(n.id);
            if (_.isArray(n.children)) self.__getChecked(n.children, retVal);
        });
    }

    getChecked() {
        let nodes = { checked: [], partial: [], unchecked: [] }
        this.__getChecked(this.root.children, nodes);
        return nodes;
    }

    select(id: any, level: number) {
        this.__find(this.root.children, id, level, 'active');
    }

    expand(id: any, level: number, expand: boolean) {
        this.__find(this.root.children, id, level, 'expanded', expand);
    }

    check(id: any, level: number, check: boolean) {
        this.__find(this.root.children, id, level, 'checked', check);
    }
}

@autoinject()
@useView('./ui-tree-node.html')
export class TreeNode {
    @bindable
    node: UITreeModel;
    @bindable
    options: UITreeOptions;

    constructor() {
    }

    private itemSelect() {
        if (this.node.root) return;

        if (this.options.showCheckbox) {
            if (this.node.level >= this.options.checkboxLevel) {
                this.node.isChecked = !this.node.checked;
                UIEvent.broadcast('tree-checked', this.node);
            }
        }
        else if (this.node.level >= this.options.selectionLevel) {
            UIEvent.broadcast('tree-select', this.node);
        }
    }

}
