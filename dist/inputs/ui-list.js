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
define(["require", "exports", "aurelia-framework", "./ui-listing", "../utils/ui-utils", "../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_listing_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UIList = (function (_super) {
        __extends(UIList, _super);
        function UIList(element) {
            _super.call(this, element);
            this.element = element;
            this.value = '';
            this.options = [];
            this.disabled = false;
            this.readonly = false;
            this.valueProperty = 'id';
            this.displayProperty = 'name';
            this.countProperty = 'count';
            this.iconProperty = '';
            this.iconClass = '';
            this.placeholder = 'Filter...';
            this.__modeCopy = false;
            this.__searchable = false;
            this.__value = [];
            this.__onlyAvailable = true;
            this.__ignoreChange = false;
            if (element.hasAttribute('copy'))
                this.__modeCopy = true;
            if (element.hasAttribute('searchable'))
                this.__searchable = true;
        }
        UIList.prototype.bind = function () {
            this.disabled = this.element.hasAttribute('disabled') || isTrue(this.disabled);
            this.readonly = this.element.hasAttribute('readonly') || isTrue(this.readonly);
            _super.prototype.bind.call(this);
            this.optionsChanged(this.options);
            this.valueChanged(this.value);
        };
        UIList.prototype.valueChanged = function (newValue) {
            if (this.__ignoreChange)
                return;
            var v = newValue || [];
            if (!ui_utils_1._.isArray(v))
                v = v.split(',');
            this.__options = this.__available = ui_utils_1._.cloneDeep(this.options);
            this.__value = ui_utils_1._['removeByValues'](this.__available, this.valueProperty, v);
        };
        UIList.prototype.optionsChanged = function (newValue) {
            this.__noResult = isEmpty(newValue);
            this.options = newValue;
            this.__isFiltered = false;
            this.__isGrouped = !ui_utils_1._.isArray(newValue);
            this.__options = this.__available = ui_utils_1._.cloneDeep(this.options);
        };
        UIList.prototype.formatter = function () {
            return this.value;
        };
        UIList.prototype.__select = function (item) {
            this.__isNew = true;
            this.__moveRight(item.model[this.valueProperty]);
            if (this.__isFiltered) {
                this.__isFiltered = false;
                this.__searchText = '';
                this.__options = ui_utils_1._.cloneDeep(this.__available);
                this.__noResult = isEmpty(this.__options);
            }
            this.__focus = false;
        };
        UIList.prototype.addAll = function () {
            this.__searchText = '';
            if (!this.__modeCopy) {
                this.__value = ui_utils_1._.cloneDeep(this.options);
                this.__options = this.__available = [];
            }
            this.__updateValue();
        };
        UIList.prototype.removeAll = function () {
            this.__searchText = '';
            this.__value = [];
            this.__options = this.__available = ui_utils_1._.cloneDeep(this.options);
            this.__updateValue();
        };
        UIList.prototype.addEl = function ($event) {
            var el = getParentByClass($event.target, 'ui-list-item', 'ui-list-group');
            this.__isNew = true;
            if (el)
                this.__moveRight(el.model[this.valueProperty]);
        };
        UIList.prototype.removeEl = function ($event) {
            var el = getParentByClass($event.target, 'ui-list-item', 'ui-list-group');
            this.__isNew = false;
            if (el)
                this.__moveLeft(el.model[this.valueProperty]);
        };
        UIList.prototype.__moveLeft = function (value) {
            if (this.__isNew)
                return;
            if (!this.__modeCopy) {
                this.__options = ui_utils_1._.concat(this.__options, ui_utils_1._.remove(this.__value, [this.valueProperty, value]));
                this.__searchText = '';
                this.__available = ui_utils_1._.cloneDeep(this.__options || []);
            }
            else {
                var o = ui_utils_1._.find(this.__value, [this.valueProperty, value]);
                if (o[this.countProperty] > 1)
                    o[this.countProperty]--;
                else {
                    ui_utils_1._.remove(this.__value, [this.valueProperty, value]);
                }
            }
            this.__updateValue();
        };
        UIList.prototype.__moveRight = function (value) {
            if (!this.__isNew)
                return;
            if (!this.__modeCopy) {
                this.__value = ui_utils_1._.concat(this.__value, ui_utils_1._.remove(this.__options, [this.valueProperty, value]));
                this.__available = ui_utils_1._.cloneDeep(this.__options || []);
            }
            else {
                var o = ui_utils_1._.find(this.__value, [this.valueProperty, value]);
                var p = ui_utils_1._.find(this.__options, [this.valueProperty, value]);
                if (o !== undefined)
                    o[this.countProperty]++;
                else {
                    p[this.countProperty] = 1;
                    this.__value = ui_utils_1._.concat(this.__value, [p]);
                }
            }
            this.__updateValue();
        };
        UIList.prototype.__updateValue = function () {
            var _this = this;
            this.__ignoreChange = true;
            if (!this.__modeCopy)
                this.value = ui_utils_1._.map(this.__value, this.valueProperty).join(',');
            else
                this.value = ui_utils_1._.chain(this.__value).mapKeys(this.valueProperty)['mapValues']('count');
            ui_event_1.UIEvent.queueTask(function () { return _this.__ignoreChange = false; });
        };
        UIList.prototype.__dragStart = function ($event, isNew) {
            if (!$event.target.classList.contains('ui-list-item'))
                return false;
            this.__isNew = isNew;
            this.__model = $event.target.model[this.valueProperty];
            return true;
        };
        UIList.prototype.__dragEnter = function ($event) {
            $event.preventDefault();
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIList.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Array)
        ], UIList.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIList.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIList.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIList.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIList.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "countProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIList.prototype, "iconClass", void 0);
        UIList = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement('ui-list'), 
            __metadata('design:paramtypes', [Element])
        ], UIList);
        return UIList;
    }(ui_listing_1.UIListBehaviour));
    exports.UIList = UIList;
});
