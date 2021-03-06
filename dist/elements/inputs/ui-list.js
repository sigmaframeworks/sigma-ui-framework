var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-constants", "lodash", "tether"], function (require, exports, aurelia_framework_1, ui_event_1, ui_constants_1, _, Tether) {
    "use strict";
    var ListGeneric = (function () {
        function ListGeneric() {
            this.__list = false;
            this.__tags = false;
            this.__value = '';
            this.__hilight = null;
            this.__allowSearch = true;
            this.__options = [];
            this.__listGroups = [];
            this.value = '';
            this.options = [];
            this.readonly = false;
            this.disabled = false;
            this.forceSelect = true;
            this.valueProperty = 'id';
            this.iconProperty = 'icon';
            this.displayProperty = 'text';
            this.__focus = false;
            this.__showDropdown = false;
        }
        ListGeneric.prototype.bind = function () {
            this.readonly = isTrue(this.readonly);
            this.disabled = isTrue(this.disabled);
            this.forceSelect = isTrue(this.forceSelect);
            this.optionsChanged(this.options);
        };
        ListGeneric.prototype.attached = function () {
            this.valueChanged(this.value);
            if (this.__tether)
                this.dropdown.style.minWidth = this.element.offsetWidth + 'px';
        };
        ListGeneric.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        ListGeneric.prototype.optionsChanged = function (newValue) {
            var _this = this;
            var groups = [];
            if (_.isArray(newValue)) {
                var list_1 = [];
                _.forEach(newValue, function (v) { return list_1.push({ value: v[_this.valueProperty] || v, text: v[_this.displayProperty] || v, display: v[_this.displayProperty] || v, icon: v[_this.iconProperty], model: v }); });
                groups.push({ items: list_1 });
                this.__allowSearch = !this.forceSelect || list_1.length > 10;
            }
            else {
                var count_1 = 0;
                _.forEach(newValue, function (g, k) {
                    var list = [];
                    _.forEach(g, function (v) { return list.push({ value: v[_this.valueProperty] || v, text: v[_this.displayProperty] || v, display: v[_this.displayProperty] || v, icon: v[_this.iconProperty], model: v }); });
                    groups.push({ label: k, items: list });
                    count_1 += list.length;
                });
                this.__allowSearch = !this.forceSelect || count_1 > 10;
            }
            this.__options = this.__listGroups = groups;
        };
        ListGeneric.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (!this.__tags) {
                this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', newValue || '').text;
                if (!this.forceSelect && !this.__value)
                    this.__value = newValue || '';
                else if (!this.__value)
                    this.value = '';
            }
            else {
                var v = (newValue || '').split(',');
                _.forEach(v, function (n) { return _['findChildren'](_this.__listGroups = _this.__options, 'items', 'value', n).disabled = true; });
            }
            ui_event_1.UIEvent.queueTask(function () {
                _this.__hilight = _this.dropdown.querySelector('.ui-selected');
                _this.scrollIntoView();
            });
        };
        ListGeneric.prototype.focusing = function () {
            var _this = this;
            clearTimeout(this.__unfocus);
            this.__focus = true;
            ui_event_1.UIEvent.queueTask(function () {
                _this.__hilight = _this.dropdown.querySelector('.ui-selected');
                if (_this.__tether)
                    _this.__tether.position();
                _this.scrollIntoView();
                _this.input.select();
            });
            ui_event_1.UIEvent.fireEvent('focus', this.element);
        };
        ListGeneric.prototype.stopUnfocus = function () {
            clearTimeout(this.__unfocus);
            this.__focus = true;
        };
        ListGeneric.prototype.unfocusing = function () {
            var _this = this;
            if (this.__hilight)
                this.__hilight.classList.remove('ui-highlight');
            if (this.__list) {
                this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', this.value).text;
                if (!this.forceSelect && !this.__value)
                    this.__value = this.value;
            }
            ui_event_1.UIEvent.queueTask(function () {
                _this.__hilight = _this.dropdown.querySelector('.ui-selected');
                _this.scrollIntoView();
            });
            this.__unfocus = setTimeout(function () { return _this.__focus = false; }, 200);
            ui_event_1.UIEvent.fireEvent('blur', this.element);
        };
        ListGeneric.prototype.openDropdown = function (force) {
            var _this = this;
            if (this.__tether)
                this.dropdown.style.minWidth = this.element.offsetWidth + 'px';
            if (this.__tether)
                this.__tether.position();
            this.__showDropdown = force || !this.__showDropdown;
            this.input.focus();
            ui_event_1.UIEvent.queueTask(function () { return _this.scrollIntoView(); });
        };
        ListGeneric.prototype.highlightItem = function (evt) {
            if (this.__hilight)
                this.__hilight.classList.remove('ui-highlight');
            (this.__hilight = evt.target).classList.add('ui-highlight');
        };
        ListGeneric.prototype.unhighlightItem = function (evt) {
            if (this.__hilight)
                this.__hilight.classList.remove('ui-highlight');
        };
        ListGeneric.prototype.scrollIntoView = function () {
            this.dropdown.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.dropdown.offsetHeight / 2) : 0);
        };
        ListGeneric.prototype.keyDown = function (evt) {
            var _this = this;
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            if (this.readonly || this.disabled)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13 && this.__showDropdown) {
                if (this.__hilight)
                    this.__hilight.click();
                if (!this.__hilight && this.forceSelect)
                    this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', this.value).text;
                if (!this.__hilight && !this.forceSelect)
                    this.fireChange();
                this.__showDropdown = false;
                return false;
            }
            else if (code == 13 && !this.__showDropdown) {
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element, this);
            }
            if (code == 8 && this.__value == '') {
                return this.removeValue(null);
            }
            if (code === 9) {
                this.__value = _['findChildren'](this.__listGroups = this.__options, 'items', 'value', this.value).text;
                if (!this.forceSelect && !this.__value)
                    this.__value = this.value;
                return true;
            }
            if (this.__listGroups.length == 0)
                return true;
            if (!this.__showDropdown) {
                this.__showDropdown = true;
                if (this.__tether)
                    this.__tether.position();
            }
            if (!this.__hilight)
                this.__hilight = this.dropdown.querySelector('.ui-selected');
            if (code === 38) {
                if (!this.__hilight)
                    this.__hilight = this.dropdown.querySelector('.ui-list-item:last-child');
                if (this.__hilight) {
                    this.__hilight.classList.remove('ui-highlight');
                    var prev = this.__hilight.previousElementSibling;
                    while (prev != null && (prev.tagName == 'P' || prev.classList.contains('ui-disabled')))
                        prev = prev.previousElementSibling;
                    this.__hilight = prev || this.__hilight;
                }
                ui_event_1.UIEvent.queueTask(function () {
                    _this.__hilight.classList.add('ui-highlight');
                    _this.scrollIntoView();
                });
                return false;
            }
            if (code === 40) {
                if (!this.__hilight)
                    this.__hilight = this.dropdown.querySelector('.ui-list-item');
                if (this.__hilight) {
                    this.__hilight.classList.remove('ui-highlight');
                    var next = this.__hilight.nextElementSibling;
                    while (next != null && (next.tagName == 'P' || next.classList.contains('ui-disabled')))
                        next = next.nextElementSibling;
                    this.__hilight = next || this.__hilight;
                }
                ui_event_1.UIEvent.queueTask(function () {
                    _this.__hilight.classList.add('ui-highlight');
                    _this.scrollIntoView();
                });
                return false;
            }
            return true;
        };
        ListGeneric.prototype.search = function () {
            var _this = this;
            if (this.__hilight != null)
                this.__hilight.classList.remove('hilight');
            this.__hilight = null;
            this.dropdown.scrollTop = 0;
            var groups = [];
            var rx = new RegExp(getAscii(this.__value), 'i');
            _.forEach(_.cloneDeep(this.__options), function (v, k) {
                var list = _.filter(v.items, function (n) {
                    var lbl = n.text + '';
                    var asc = getAscii(lbl);
                    if (rx.test(asc)) {
                        var start = asc.search(rx);
                        lbl = lbl.substr(0, start + _this.__value.length) + '</u>' +
                            lbl.substr(start + _this.__value.length);
                        lbl = lbl.substr(0, start) + '<u>' + lbl.substr(start);
                        n.display = lbl;
                        return true;
                    }
                    return false;
                });
                if (list.length !== 0)
                    groups.push({ label: v.label, items: list });
            });
            if (!this.forceSelect && !this.__tags)
                this.value = this.__value;
            ui_event_1.UIEvent.queueTask(function () { return _this.__listGroups = groups; });
            ;
        };
        ListGeneric.prototype.fireSelect = function (model) {
            this.__listGroups = this.__options;
        };
        ListGeneric.prototype.fireChange = function () { };
        ListGeneric.prototype.removeValue = function (v) { };
        return ListGeneric;
    }());
    exports.ListGeneric = ListGeneric;
    var UICombo = (function (_super) {
        __extends(UICombo, _super);
        function UICombo(element) {
            _super.call(this);
            this.element = element;
            this.value = '';
            this.options = [];
            this.iconClass = '';
            this.placeholder = '';
            this.emptyText = 'No Results';
            this.valueProperty = 'id';
            this.displayProperty = 'text';
            this.iconProperty = 'icon';
            this.disabled = false;
            this.readonly = false;
            this.forceSelect = true;
            this.__list = true;
            this.__clear = element.hasAttribute('clear');
        }
        UICombo.prototype.attached = function () {
            _super.prototype.attached.call(this);
            this.__tether = new Tether({
                element: this.dropdown,
                target: this.element,
                attachment: 'top left',
                targetAttachment: 'bottom left',
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
        };
        UICombo.prototype.detached = function () {
            this.__tether.destroy();
            aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UICombo.prototype.clear = function () {
            this.__value = '';
            this.value = null;
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UICombo.prototype.fireSelect = function (model) {
            _super.prototype.fireSelect.call(this, model);
            if (model) {
                this.value = model[this.valueProperty] || model;
                ui_event_1.UIEvent.fireEvent('select', this.element, model);
            }
            this.__showDropdown = false;
        };
        UICombo.prototype.fireChange = function () {
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value = this.__value);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICombo.prototype, "forceSelect", void 0);
        UICombo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-combo'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-combo ${__focus?'ui-focus':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><input class=\"ui-input\" size=\"1\" value.bind=\"__value\" placeholder.bind=\"placeholder\" \n    click.trigger=\"openDropdown(true)\"\n    keydown.trigger=\"keyDown($event)\" \n    input.trigger=\"search() & debounce:200\"\n    focus.trigger=\"focusing()\" blur.trigger=\"unfocusing()\"\n    ref=\"input\" disabled.bind=\"disabled || busy\" readonly.bind=\"!__allowSearch\" type=\"text\"/>\n  <span class=\"ui-clear\" if.bind=\"__clear && __value\" click.trigger=\"clear()\">&times;</span>\n  <span class=\"ui-input-addon ui-dropdown-handle\" click.trigger=\"openDropdown()\"><span class=\"fi-ui-angle-down\"></span></span></div>\n  <div class=\"ui-list-dropdown\" show.bind=\"__focus && __showDropdown\" ref=\"dropdown\" mousedown.trigger=\"stopUnfocus()\">\n    <p if.bind=\"__listGroups.length==0\" class=\"ui-list-group-label\">${emptyText}</p>\n    <template repeat.for=\"group of __listGroups\"><p if.bind=\"group.label\" class=\"ui-list-group-label\">${group.label}</p>\n    <div class=\"ui-list-item ${item.value==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\" repeat.for=\"item of group.items\" \n      mouseover.trigger=\"highlightItem($event)\" mouseout.trigger=\"unhighlightItem($event)\"\n      click.trigger=\"fireSelect(item.model)\"><span class=\"fi-ui ${iconClass} ${item.icon}\" if.bind=\"item.icon\"></span><span innerhtml.bind=\"item.display\"></span></div>\n    </template>\n  </div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UICombo);
        return UICombo;
    }(ListGeneric));
    exports.UICombo = UICombo;
    var UITag = (function (_super) {
        __extends(UITag, _super);
        function UITag(element) {
            _super.call(this);
            this.element = element;
            this.value = '';
            this.options = [];
            this.iconClass = '';
            this.placeholder = '';
            this.emptyText = 'No Results';
            this.valueProperty = 'id';
            this.displayProperty = 'text';
            this.iconProperty = 'icon';
            this.disabled = false;
            this.readonly = false;
            this.forceSelect = true;
            this.__tags = true;
        }
        UITag.prototype.attached = function () {
            _super.prototype.attached.call(this);
            if (this.__noList = this.element.hasAttribute('nolist'))
                this.forceSelect = false;
            this.__tether = new Tether({
                element: this.dropdown,
                target: this.element,
                attachment: 'top left',
                targetAttachment: 'bottom left',
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
        };
        UITag.prototype.detached = function () {
            this.__tether.destroy();
            aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UITag.prototype.clear = function () {
            this.__value = '';
            this.value = null;
        };
        UITag.prototype.getDisplay = function (tag) {
            return _['findChildren'](this.__options, 'items', 'value', tag).text || tag;
        };
        UITag.prototype.addValue = function (val) {
            var _this = this;
            var v = [];
            if (this.value)
                v = this.value.split(',');
            if (v.indexOf(val) == -1) {
                v.push(val);
                _['findChildren'](this.__listGroups = this.__options, 'items', 'value', val).disabled = true;
            }
            this.value = v.join(',');
            this.__value = '';
            if (this.__hilight)
                this.__hilight.classList.remove('ui-highlight');
            ui_event_1.UIEvent.queueTask(function () { return _this.__tether.position(); });
        };
        UITag.prototype.removeValue = function (val) {
            var _this = this;
            var v = [];
            if (this.value)
                v = this.value.split(',');
            if (!val)
                _['findChildren'](this.__listGroups = this.__options, 'items', 'value', v.pop()).disabled = false;
            else {
                _['findChildren'](this.__listGroups = this.__options, 'items', 'value', val).disabled = false;
                if (v.indexOf(val) != -1)
                    v.splice(v.indexOf(val), 1);
            }
            this.value = v.join(',');
            this.__value = '';
            ui_event_1.UIEvent.queueTask(function () { return _this.__tether.position(); });
        };
        UITag.prototype.fireSelect = function (model) {
            _super.prototype.fireSelect.call(this, model);
            this.addValue(model ? (model[this.valueProperty] || model) : this.__value);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UITag.prototype.fireChange = function () {
            this.addValue(this.__value);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UITag.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITag.prototype, "forceSelect", void 0);
        UITag = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-tag'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-tag ${__focus?'ui-focus':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><div class=\"ui-tag-item\" repeat.for=\"tag of value | split\" if.bind=\"tag!=''\">${getDisplay(tag)}<span class=\"ui-clear\" click.trigger=\"removeValue(tag)\">&times;</span></div>\n  <input class=\"ui-input\" size=\"1\" value.bind=\"__value\" placeholder.bind=\"placeholder\" \n    click.trigger=\"openDropdown(true)\"\n    keydown.trigger=\"keyDown($event)\" \n    input.trigger=\"search() & debounce:200\"\n    focus.trigger=\"focusing()\" blur.trigger=\"unfocusing()\"\n    ref=\"input\" disabled.bind=\"disabled || busy\" readonly.bind=\"!__allowSearch\" type=\"text\"/></div>\n  <div class=\"ui-list-dropdown\" show.bind=\"!__noList && __focus && __showDropdown\" ref=\"dropdown\" mousedown.trigger=\"stopUnfocus()\">\n    <p if.bind=\"__listGroups.length==0\" class=\"ui-list-group-label\">${emptyText}</p>\n    <template repeat.for=\"group of __listGroups\"><p if.bind=\"group.label\" class=\"ui-list-group-label\">${group.label}</p>\n    <div class=\"ui-list-item ${item.disabled?'ui-disabled':''}\" repeat.for=\"item of group.items\" \n      mouseover.trigger=\"highlightItem($event)\" mouseout.trigger=\"unhighlightItem($event)\"\n      click.trigger=\"fireSelect(item.model)\"><span class=\"fi-ui ${iconClass} ${item.icon}\" if.bind=\"item.icon\"></span><span innerhtml.bind=\"item.display\"></span></div>\n    </template>\n  </div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UITag);
        return UITag;
    }(ListGeneric));
    exports.UITag = UITag;
    var UIList = (function (_super) {
        __extends(UIList, _super);
        function UIList(element) {
            _super.call(this);
            this.element = element;
            this.value = '';
            this.options = [];
            this.iconClass = '';
            this.placeholder = '';
            this.emptyText = 'No Results';
            this.valueProperty = 'id';
            this.displayProperty = 'text';
            this.iconProperty = 'icon';
            this.disabled = false;
            this.readonly = false;
            this.__list = true;
            this.__showDropdown = true;
        }
        UIList.prototype.fireSelect = function (model) {
            _super.prototype.fireSelect.call(this, model);
            this.value = model[this.valueProperty] || model;
            ui_event_1.UIEvent.fireEvent('select', this.element, model);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIList.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "readonly", void 0);
        UIList = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-list'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-list ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''} ${__focus?'ui-focus':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><input class=\"ui-input ${!__allowSearch?'ui-remove':''}\" size=\"1\" value.bind=\"__value\" placeholder.bind=\"placeholder\" \n    keydown.trigger=\"keyDown($event)\" \n    input.trigger=\"search() & debounce:200\"\n    focus.trigger=\"focusing()\" blur.trigger=\"unfocusing()\"\n    ref=\"input\" disabled.bind=\"disabled || busy\" readonly.bind=\"!__allowSearch\" type=\"text\"/>\n  <div class=\"ui-list-container\" ref=\"dropdown\">\n    <p if.bind=\"__listGroups.length==0\" class=\"ui-list-group-label\">${emptyText}</p>\n    <template repeat.for=\"group of __listGroups\"><p if.bind=\"group.label\" class=\"ui-list-group-label\">${group.label}</p>\n    <div class=\"ui-list-item ${item.value==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\" repeat.for=\"item of group.items\" \n      mouseover.trigger=\"highlightItem($event)\" mouseout.trigger=\"unhighlightItem($event)\"\n      click.trigger=\"fireSelect(item.model)\"><span class=\"fi-ui ${iconClass} ${item.icon}\" if.bind=\"item.icon\"></span><span innerhtml.bind=\"item.display\"></span></div>\n    </template>\n  </div></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIList);
        return UIList;
    }(ListGeneric));
    exports.UIList = UIList;
    var UILanguage = (function (_super) {
        __extends(UILanguage, _super);
        function UILanguage(element) {
            _super.call(this);
            this.element = element;
            this.__selected = [];
            this.__available = [];
            this.errors = [];
            this.value = '';
            this.languages = [];
            this.disabled = false;
            this.readonly = false;
        }
        UILanguage.prototype.attached = function () {
            _super.prototype.attached.call(this);
            this.__tether = new Tether({
                element: this.dropdown,
                target: this.element,
                attachment: 'top left',
                targetAttachment: 'bottom left',
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
        };
        UILanguage.prototype.detached = function () {
            this.__tether.destroy();
            aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UILanguage.prototype.bind = function () {
            var _this = this;
            this.__available = _.clone(ui_constants_1.UIConstants.Languages);
            _.forEach(this.languages, function (l) { return _this.__selected = _this.__selected.concat(_.remove(_this.__available, ['id', l])); });
            if (this.width)
                this.element['style'].width = this.width;
        };
        UILanguage.prototype.valueChanged = function (newValue) {
        };
        UILanguage.prototype.languagesChanged = function (newValue) {
        };
        UILanguage.prototype.addError = function (lang) {
            this.errors.push(lang);
            this.errors = [].concat(this.errors);
        };
        UILanguage.prototype.removeError = function (lang) {
            if (this.errors.indexOf(lang) > -1)
                this.errors.splice(this.errors.indexOf(lang), 1);
            this.errors = [].concat(this.errors);
        };
        UILanguage.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        UILanguage.prototype.fireSelect = function (model) {
            if (!model) {
                this.__value = this.value = '';
                ui_event_1.UIEvent.fireEvent('select', this.element, null);
            }
            ;
            if (ui_event_1.UIEvent.fireEvent('beforeselect', this.element, model.id) !== false) {
                this.__showDropdown = false;
                this.__value = model.name;
                this.value = model.id;
                ui_event_1.UIEvent.fireEvent('select', this.element, model);
            }
        };
        UILanguage.prototype.add = function (model) {
            this.__showDropdown = false;
            this.__value = model.name;
            this.languages.push(this.value = model.id);
            this.__selected = this.__selected.concat(_.remove(this.__available, ['id', model.id]));
            ui_event_1.UIEvent.fireEvent('add', this.element, model);
            ui_event_1.UIEvent.fireEvent('select', this.element, model);
        };
        UILanguage.prototype.remove = function (model) {
            this.__showDropdown = false;
            _.remove(this.languages, model.id);
            this.__available = this.__available.concat(_.remove(this.__selected, ['id', model.id]));
            ui_event_1.UIEvent.fireEvent('remove', this.element, model);
            if (this.__selected.length > 0)
                ui_event_1.UIEvent.fireEvent('select', this.element, this.__selected[0]);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UILanguage.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UILanguage.prototype, "languages", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UILanguage.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UILanguage.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UILanguage.prototype, "width", void 0);
        UILanguage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-language'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-language ${__focus?'ui-focus':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><input class=\"ui-input\" size=\"1\" value.bind=\"__value\" \n    click.trigger=\"openDropdown(true)\"\n    keydown.trigger=\"keyDown($event)\" \n    focus.trigger=\"focusing()\" blur.trigger=\"unfocusing()\"\n    ref=\"input\" disabled.bind=\"disabled\" readonly.bind=\"true\" type=\"text\"/>\n  <span class=\"ui-input-addon ui-dropdown-handle\" click.trigger=\"openDropdown()\"><span class=\"fi-ui-angle-down\"></span></span></div>\n  <div class=\"ui-list-dropdown\" show.bind=\"__focus && __showDropdown\" ref=\"dropdown\" mousedown.trigger=\"stopUnfocus()\">\n    <p class=\"ui-list-group-label\">Added</p>\n    <p if.bind=\"__selected.length==0\" class=\"ui-text-muted ui-pad-h\">No Languages Added</p>\n    <div class=\"ui-lang-item\" repeat.for=\"item of __selected | sort:'name'\">\n        <div click.trigger=\"fireSelect(item)\" class=\"ui-list-item ${item.id==value?'ui-selected':''}\" \n          mouseover.trigger=\"highlightItem($event)\" mouseout.trigger=\"unhighlightItem($event)\">\n          <span class=\"fi-ui-danger ui-text-warning\" if.bind=\"errors.indexOf(item.id)>=0\"></span>\n          <span innerhtml.bind=\"item.name\"></span>\n        </div>\n        <div class=\"fi-ui fi-ui-tree-collapse ui-text-danger\" show.bind=\"__selected.length>1\" click.trigger=\"remove(item)\"></div></div>\n    <p class=\"ui-list-group-label\">Available</p>\n    <p if.bind=\"__available.length==0\" class=\"ui-text-muted ui-pad-h\">No Languages Available</p>\n    <div class=\"ui-lang-item\" repeat.for=\"item of __available | sort:'name'\">\n      <div innerhtml.bind=\"item.name\" click.trigger=\"add(item)\" class=\"ui-list-item\"\n        mouseover.trigger=\"highlightItem($event)\" mouseout.trigger=\"unhighlightItem($event)\"></div>\n        <div class=\"fi-ui fi-ui-tree-expand ui-text-info\"></div></div>\n    </template>\n  </div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UILanguage);
        return UILanguage;
    }(ListGeneric));
    exports.UILanguage = UILanguage;
    var UIReorder = (function () {
        function UIReorder(element) {
            this.element = element;
            this.options = [];
            this.displayProperty = 'name';
            this.__startY = 0;
            this.__diff = 0;
            this.__top = 0;
        }
        UIReorder.prototype.startDrag = function (opt, $event) {
            var _this = this;
            if ($event.button != 0)
                return;
            this.ghostModel = opt;
            this.__dragEl = getParentByClass($event.target, 'ui-list-item', 'ui-list-group');
            this.__top = this.__diff = this.__dragEl.offsetTop;
            this.__dragEl.classList.add('dragging');
            this.__list = this.element.querySelectorAll('.ui-list-item');
            this.__startY = ($event.y || $event.clientY);
            document.addEventListener('mousemove', this.__move = function (e) { return _this.move(e); });
            document.addEventListener('mouseup', this.__stop = function (e) { return _this.stopDrag(e); });
        };
        UIReorder.prototype.move = function ($event) {
            var y = ($event.y || $event.clientY) - this.__startY;
            this.__startY = ($event.y || $event.clientY);
            this.__diff += y;
            var sh = this.__dragEl.offsetParent.scrollHeight;
            this.__top = this.__diff < 0 ? 0 : (this.__diff > sh ? sh : this.__diff);
            this.__dragEl.offsetParent.scrollTop = this.__top - (sh / 2);
            if (this.__top >= this.__dragEl.offsetTop + this.__dragEl.offsetHeight) {
                var next = this.__dragEl.nextSibling;
                if (next)
                    this.__dragEl.parentElement.insertBefore(next, this.__dragEl);
            }
            if (this.__top + this.__dragEl.offsetHeight <= this.__dragEl.offsetTop) {
                var prev = this.__dragEl.previousSibling;
                if (prev)
                    this.__dragEl.parentElement.insertBefore(this.__dragEl, prev);
            }
        };
        UIReorder.prototype.stopDrag = function ($event) {
            this.__dragEl.classList.remove('dragging');
            this.ghostModel = null;
            var list = this.element.querySelectorAll('.ui-list-item');
            var newList = [];
            _.forEach(list, function (l) {
                if (l.model)
                    newList.push(l.model);
            });
            this.options = newList;
            document.removeEventListener('mousemove', this.__move);
            document.removeEventListener('mouseup', this.__stop);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Array)
        ], UIReorder.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIReorder.prototype, "displayProperty", void 0);
        UIReorder = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-list ui-reorder\">\n    <div class=\"ui-list-container\">\n        <div model.bind=\"opt\" repeat.for=\"opt of options & oneTime\" class=\"ui-list-item\" data-value=\"${$index}\" mousedown.trigger=\"startDrag(opt, $event)\">\n            <span class=\"fi-ui-drawer\"></span>\n            <span class=\"ui-col-fill\" innerhtml.bind=\"opt[displayProperty] || opt\"></span>\n        </div>\n\n        <div class=\"ui-list-item ui-ghost\" if.bind=\"ghostModel\" ref=\"__ghostEl\" css.bind=\"{top:__top+'px'}\">\n            <span class=\"fi-ui-drawer\"></span>\n            <span class=\"ui-col-fill\" innerhtml.bind=\"ghostModel[displayProperty] || ghostModel\"></span>\n        </div>\n    </div>\n</template>"),
            aurelia_framework_1.customElement('ui-reorder'), 
            __metadata('design:paramtypes', [Element])
        ], UIReorder);
        return UIReorder;
    }());
    exports.UIReorder = UIReorder;
});
