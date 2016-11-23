var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-tree-model", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_tree_model_1, _) {
    "use strict";
    var UITreePanel = (function () {
        function UITreePanel(element, observer) {
            var _this = this;
            this.element = element;
            this.searchText = '';
            this.selectedNode = {};
            this.model = [];
            this.options = new ui_tree_model_1.UITreeOptions();
            this.__searchable = element.hasAttribute('searchable');
            this.__subscribeSearch = observer.propertyObserver(this, 'searchText')
                .subscribe(function (v) { return _this.__searchTextChanged(v); });
        }
        UITreePanel.prototype.bind = function () {
            this.modelChanged(this.model || []);
            this.valueChanged(this.value);
        };
        UITreePanel.prototype.attached = function () {
            ui_event_1.UIEvent.queueTask(function () {
            });
        };
        UITreePanel.prototype.detached = function () {
            this.__subscribeSearch.dispose();
        };
        UITreePanel.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.__ignoreChange)
                return;
            if (!this.options.showCheckbox)
                this.__find(this.root.children, newValue, 'active', true, true);
            else {
                _.forEach(this.root.children, function (n) { return n.isChecked = false; });
                _.forEach((newValue || '').split(','), function (v) { return _this.__find(_this.root.children, v, 'checked', true, true); });
            }
        };
        UITreePanel.prototype.modelChanged = function (newValue) {
            this.root = new ui_tree_model_1.UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
                id: '',
                name: this.options.rootLabel,
                children: newValue
            }, null);
        };
        UITreePanel.prototype.getChecked = function () {
            return this.__getChecked(this.root.children);
        };
        Object.defineProperty(UITreePanel.prototype, "rootNodes", {
            get: function () {
                return this.options.showRoot ? [this.root] : this.root.children;
            },
            enumerable: true,
            configurable: true
        });
        UITreePanel.prototype.__find = function (obj, id, field, value, expand) {
            if (value === void 0) { value = true; }
            if (expand === void 0) { expand = false; }
            var self = this;
            return _.find(obj, function (n) {
                var found = n.id == id;
                if (!found && _.isArray(n.children)) {
                    found = !_.isEmpty(self.__find(n.children, id, field, value));
                    if (expand && found)
                        n.expanded = true;
                }
                else if (found) {
                    if (field == 'active')
                        self.__itemSelect(n);
                    if (field == 'expanded')
                        n.expanded = value;
                    if (field == 'checked')
                        n.isChecked = value ? 1 : 0;
                }
                return found;
            });
        };
        UITreePanel.prototype.__getChecked = function (nodes, retVal) {
            if (retVal === void 0) { retVal = { checked: [], partial: [], unchecked: [] }; }
            var self = this;
            _.forEach(nodes, function (n) {
                if (n.checked == 2)
                    retVal.partial.push(n.id);
                if (n.checked == 1)
                    retVal.checked.push(n.id);
                if (n.checked == 0)
                    retVal.unchecked.push(n.id);
                if (_.isArray(n.children))
                    self.__getChecked(n.children, retVal);
            });
            return retVal;
        };
        UITreePanel.prototype.__itemSelect = function (node) {
            var _this = this;
            if (ui_event_1.UIEvent.fireEvent('beforeselect', this.element, node)) {
                var p = void 0;
                this.__ignoreChange = true;
                if (this.selectedNode) {
                    (p = this.selectedNode).active = false;
                    while (p = p.parent)
                        p.childActive = false;
                }
                (p = this.selectedNode = node).active = true;
                while (p = p.parent)
                    p.childActive = true;
                this.value = node.id;
                ui_event_1.UIEvent.fireEvent('select', this.element, node);
                ui_event_1.UIEvent.queueTask(function () { return _this.__ignoreChange = false; });
            }
        };
        UITreePanel.prototype.__itemChecked = function (node) {
            var _this = this;
            if (ui_event_1.UIEvent.fireEvent('beforechecked', this.element, node)) {
                this.__ignoreChange = true;
                node.isChecked = !node.checked;
                var nodes = this.__getChecked(this.root.children);
                this.value = nodes.checked.join(',');
                ui_event_1.UIEvent.fireEvent('checked', this.element, node);
                ui_event_1.UIEvent.queueTask(function () { return _this.__ignoreChange = false; });
            }
        };
        UITreePanel.prototype.__itemClicked = function (node) {
            if (node.root)
                return;
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
        };
        UITreePanel.prototype.__searchTextChanged = function (newValue) {
            this.__filter(this.root.children, newValue);
        };
        UITreePanel.prototype.__filter = function (obj, value, parentVisible) {
            if (parentVisible === void 0) { parentVisible = false; }
            var self = this, ret = false, rx = new RegExp(getAscii(value), 'gi');
            _.forEach(obj, function (n) {
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
                    var start = getAscii(n.text).search(rx);
                    var name_1 = n.text.substr(0, start + value.length) + '</b>' + n.text.substr(start + value.length);
                    n.text = name_1.substr(0, start) + '<b>' + name_1.substr(start);
                }
                n.isVisible = n.children.length > 0 ? self.__filter(n.children, value, match || parentVisible) : (match || parentVisible);
                ret = ret || n.isVisible;
            });
            return ret;
        };
        __decorate([
            aurelia_framework_1.computedFrom('root'), 
            __metadata('design:type', Object)
        ], UITreePanel.prototype, "rootNodes", null);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UITreePanel.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITreePanel.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', ui_tree_model_1.UITreeOptions)
        ], UITreePanel.prototype, "options", void 0);
        UITreePanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-tree'),
            aurelia_framework_1.inlineView("<template class=\"ui-tree-panel ${__searchable?'has-search':''}\"><div class=\"ui-search ui-group-wrapper\" if.bind=\"__searchable\">\n  <span class=\"ui-input-addon\"><span class=\"fi-ui-search\"></span></span>\n  <ui-input type=\"search\" placeholder=\"Search...\" clear value.bind=\"searchText & debounce:200\"></ui-input></div>\n  <div class=\"ui-tree-level\">\n    <tree-node repeat.for=\"child of root.children | sort:'name'\" node.bind=\"child\" options.bind=\"options\" nodeclick.delegate=\"__itemClicked($event.detail)\"></tree-node>\n  </div></template>"), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.BindingEngine])
        ], UITreePanel);
        return UITreePanel;
    }());
    exports.UITreePanel = UITreePanel;
    var TreeNode = (function () {
        function TreeNode(element) {
            this.element = element;
        }
        TreeNode.prototype.fireClicked = function () {
            ui_event_1.UIEvent.fireEvent('nodeclick', this.element, this.node);
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', ui_tree_model_1.UITreeModel)
        ], TreeNode.prototype, "node", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', ui_tree_model_1.UITreeOptions)
        ], TreeNode.prototype, "options", void 0);
        TreeNode = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tree-item\">\n    <div class=\"ui-tree-item-link ${node.disabled?'ui-disabled':''}\" if.bind=\"node.isVisible\">\n        <a class=\"ui-expander ${node.expanded?'expanded':''}\" if.bind=\"!node.leaf\" click.trigger=\"node.expanded=!node.expanded\">\n            <span class=\"fi-ui\"></span>\n        </a>\n        <a class=\"ui-node-checkbox ${node.checked<1?'off':''} ${node.checked==1?'on':''} ${node.checked==2?'partial':''}\" if.bind=\"options.showCheckbox && node.level>=options.checkboxLevel\" click.trigger=\"fireClicked()\">\n            <span class=\"fi-ui\"></span>\n        </a>\n        <a class=\"ui-node-link ${!options.showCheckbox && node.active?'ui-active':node.childActive?'ui-partial':''}\" data-id=\"${node.id}\" click.trigger=\"fireClicked()\">\n            <span class=\"ui-icon fi-ui\" if.bind=\"node.isLeaf\"></span>\n            <span class=\"ui-icon ${node.icon}\" if.bind=\"node.icon\"></span>\n            <span innerhtml.bind=\"node.text\"></span>\n        </a>\n    </div>\n    <div class=\"ui-tree-level\" if.bind=\"node.isVisible && !node.leaf && node.expanded\">\n        <tree-node repeat.for=\"child of node.children | sort:'name'\" node.bind=\"child\" options.bind=\"options\"></tree-node>\n    </div>\n</template>"), 
            __metadata('design:paramtypes', [Element])
        ], TreeNode);
        return TreeNode;
    }());
    exports.TreeNode = TreeNode;
});
