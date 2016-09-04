var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-tree-models", "../utils/ui-utils", "../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_tree_models_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UITree = (function () {
        function UITree(element, observer) {
            this.element = element;
            this.searchText = '';
            this.selectedNode = {};
            this.model = [];
            this.options = new ui_tree_models_1.UITreeOptions();
            var self = this;
            this.__subscribeSelect = ui_event_1.UIEvent.subscribe('tree-select', function (v) { return self.__itemSelect(v); });
            this.__subscribeChecked = ui_event_1.UIEvent.subscribe('tree-checked', function (v) { return self.__itemChecked(v); });
            this.__subscribeSearch = observer.propertyObserver(this, 'searchText')
                .subscribe(function (v) { return self.__searchTextChanged(v); });
        }
        UITree.prototype.bind = function () {
            this.root = new ui_tree_models_1.UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
                id: '',
                name: this.options.rootLabel,
                children: this.model
            }, null);
            if (!this.options.showCheckbox)
                this.select(this.value, this.options.selectionLevel);
        };
        UITree.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var x;
                if ((x = _this.element.querySelector('.ui-active')) !== null)
                    x.scrollIntoView();
            });
        };
        UITree.prototype.detached = function () {
            this.__subscribeSelect.dispose();
            this.__subscribeChecked.dispose();
            this.__subscribeSearch.dispose();
        };
        Object.defineProperty(UITree.prototype, "rootNodes", {
            get: function () {
                return this.options.showRoot ? [this.root] : this.root.children;
            },
            enumerable: true,
            configurable: true
        });
        UITree.prototype.__itemSelect = function (node) {
            if (this.selectedNode) {
                this.selectedNode.active = false;
            }
            (this.selectedNode = node).active = true;
            this.value = node.id;
            ui_event_1.UIEvent.fireEvent('change', this.element, node);
        };
        UITree.prototype.__itemChecked = function (node) {
            ui_event_1.UIEvent.fireEvent('checked', this.element, this.getChecked());
        };
        UITree.prototype.modelChanged = function (newValue) {
            this.root = new ui_tree_models_1.UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
                id: '',
                name: this.options.rootLabel,
                children: newValue
            }, null);
        };
        UITree.prototype.valueChanged = function (newValue) {
        };
        UITree.prototype.__searchTextChanged = function (newValue) {
            this.__filter(this.root.children, newValue);
        };
        UITree.prototype.__filter = function (obj, value, parentVisible) {
            var _this = this;
            if (parentVisible === void 0) { parentVisible = false; }
            var self = this, ret = false, rx = new RegExp(ui_utils_1.UIUtils.getAscii(value), 'gi');
            ui_utils_1._.forEach(obj, function (n) {
                n.name = n.name.replace(/<b>/gi, '')
                    .replace(/<\/b>/gi, '');
                n.expanded = !ui_utils_1._.isEmpty(value) && n.level <= 2 && parentVisible === false;
                if (ui_utils_1._.isEmpty(value) && self.selectedNode.id == n.id && self.selectedNode.level == n.level) {
                    var p = n.parent;
                    while (p) {
                        p.expanded = true;
                        p = p.parent;
                    }
                    ui_event_1.UIEvent.queueTask(function () {
                        var x;
                        if ((x = _this.element.querySelector('.ui-active')) !== null)
                            x.scrollIntoView();
                    });
                }
                var match = rx.test(ui_utils_1.UIUtils.getAscii(n.name));
                if (!ui_utils_1._.isEmpty(value) && match) {
                    n.parent.expanded = true;
                    var start = ui_utils_1.UIUtils.getAscii(n.name)
                        .search(rx);
                    var name_1 = n.name.substr(0, start + value.length) + '</b>' + n.name.substr(start + value.length);
                    n.name = name_1.substr(0, start) + '<b>' + name_1.substr(start);
                }
                n.isVisible = n.children.length > 0 ? self.__filter(n.children, value, match || parentVisible) : (match || parentVisible);
                ret = ret || n.isVisible;
            });
            return ret;
        };
        UITree.prototype.__find = function (obj, id, level, field, value) {
            var _this = this;
            if (value === void 0) { value = true; }
            var self = this;
            return ui_utils_1._.find(obj, function (n) {
                var found = n.id == id && n.level >= level;
                if (!found && ui_utils_1._.isArray(n.children)) {
                    found = !ui_utils_1._.isEmpty(self.__find(n.children, id, level, field, value));
                    n.expanded = found;
                }
                else if (found) {
                    if (field == 'active')
                        self.__itemSelect(n);
                    if (field == 'expanded')
                        n.expanded = value;
                    if (field == 'checked')
                        n.isChecked = value ? 1 : 0;
                    ui_event_1.UIEvent.queueTask(function () {
                        var x;
                        if ((x = _this.element.querySelector('.ui-active')) !== null)
                            x.scrollIntoView();
                    });
                }
                return found;
            });
        };
        UITree.prototype.__getChecked = function (nodes, retVal) {
            var self = this;
            return ui_utils_1._.forEach(nodes, function (n) {
                if (n.checked == 2)
                    retVal.partial.push(n.id);
                if (n.checked == 1)
                    retVal.checked.push(n.id);
                if (n.checked == 0)
                    retVal.unchecked.push(n.id);
                if (ui_utils_1._.isArray(n.children))
                    self.__getChecked(n.children, retVal);
            });
        };
        UITree.prototype.getChecked = function () {
            var nodes = { checked: [], partial: [], unchecked: [] };
            this.__getChecked(this.root.children, nodes);
            return nodes;
        };
        UITree.prototype.select = function (id, level) {
            this.__find(this.root.children, id, level, 'active');
        };
        UITree.prototype.expand = function (id, level, expand) {
            this.__find(this.root.children, id, level, 'expanded', expand);
        };
        UITree.prototype.check = function (id, level, check) {
            this.__find(this.root.children, id, level, 'checked', check);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UITree.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITree.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', ui_tree_models_1.UITreeOptions)
        ], UITree.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.computedFrom('root'), 
            __metadata('design:type', Object)
        ], UITree.prototype, "rootNodes", null);
        UITree = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-tree'), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.BindingEngine])
        ], UITree);
        return UITree;
    }());
    exports.UITree = UITree;
    var TreeNode = (function () {
        function TreeNode() {
        }
        TreeNode.prototype.itemSelect = function () {
            if (this.node.root)
                return;
            if (this.options.showCheckbox) {
                if (this.node.level >= this.options.checkboxLevel) {
                    this.node.isChecked = !this.node.checked;
                    ui_event_1.UIEvent.broadcast('tree-checked', this.node);
                }
            }
            else if (this.node.level >= this.options.selectionLevel) {
                ui_event_1.UIEvent.broadcast('tree-select', this.node);
            }
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', ui_tree_models_1.UITreeModel)
        ], TreeNode.prototype, "node", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', ui_tree_models_1.UITreeOptions)
        ], TreeNode.prototype, "options", void 0);
        TreeNode = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.useView('./ui-tree-node.html'), 
            __metadata('design:paramtypes', [])
        ], TreeNode);
        return TreeNode;
    }());
    exports.TreeNode = TreeNode;
});
