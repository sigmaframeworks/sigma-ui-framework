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
    var UITags = (function (_super) {
        __extends(UITags, _super);
        function UITags(element) {
            _super.call(this, element);
            this.__tags = [];
            this.__onlyAvailable = true;
            this.value = '';
            this.checked = false;
            this.disabled = false;
            this.readonly = false;
            this.placeholder = '';
            this.dir = '';
            this.options = [];
            this.valueProperty = 'id';
            this.displayProperty = 'name';
            this.iconProperty = '';
            this.iconClass = '';
            this.emptyText = 'No Results Found...';
        }
        UITags.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.optionsChanged(this.options);
            this.__noList = this.element.hasAttribute('no-list');
        };
        UITags.prototype.attached = function () {
            var _this = this;
            _super.prototype.attached.call(this);
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UITags.prototype.detached = function () {
        };
        UITags.prototype.valueChanged = function (newValue) {
            var v = newValue || [];
            if (!ui_utils_1._.isArray(v))
                v = v.split(',');
            if (this.__noList) {
                this.__tags = v;
            }
            else {
                this.__options = this.__available = ui_utils_1._.cloneDeep(this.options);
                this.__tags = ui_utils_1._['removeByValues'](this.__available, this.valueProperty, v);
            }
        };
        UITags.prototype.optionsChanged = function (newValue) {
            this.__noResult = isEmpty(newValue);
            this.options = newValue;
            this.__isFiltered = false;
            this.__isGrouped = !ui_utils_1._.isArray(newValue);
            this.__options = this.__available = ui_utils_1._.cloneDeep(this.options);
        };
        UITags.prototype.readonlyChanged = function () {
            _super.prototype.readonlyChanged.call(this);
            if (isTrue(this.readonly))
                this.__tagInput.classList.add('ui-readonly');
            else
                this.__tagInput.classList.remove('ui-readonly');
        };
        UITags.prototype.disable = function (disabled) {
            _super.prototype.disable.call(this, disabled);
            if (disabled === true || this.disabled === true || this.checked === false)
                this.__tagInput.classList.add('ui-disabled');
            else
                this.__tagInput.classList.remove('ui-disabled');
        };
        UITags.prototype.__select = function (item) {
            if (this.__noList) {
                var v = ui_utils_1._.trim(this.__searchText);
                if (!isEmpty(v) && this.__tags.indexOf(v) == -1)
                    this.__tags.push(v);
                this.value = this.__tags.join(',');
                this.__searchText = '';
                this.__focus = true;
            }
            else if (item) {
                this.__searchText = '';
                this.__tags.push(item['model']);
                this.value = ui_utils_1._.map(this.__tags, this.valueProperty).join(',');
            }
        };
        UITags.prototype.__deselect = function (item) {
            this.__tags.splice(this.__tags.indexOf(item), 1);
            if (this.__noList) {
                this.value = this.__tags.join(',');
            }
            else {
                this.value = ui_utils_1._.map(this.__tags, this.valueProperty).join(',');
            }
        };
        UITags.prototype.__clicked = function ($event) {
            var o = getParentByClass($event.target, 'ui-list-item', 'ui-list');
            if (o !== null) {
                this.__select(o);
            }
        };
        UITags.prototype.__gotFocus = function (show) {
            var _this = this;
            if (show)
                this.__focus = true;
            if (!this.__noList) {
                var el = this.__input;
                if (this.showReverse()) {
                    this.__reverse = true;
                    this.__list.style.bottom = el.offsetHeight + 'px';
                }
                else {
                    this.__reverse = false;
                    this.__list.style.bottom = "auto";
                }
                ui_event_1.UIEvent.queueTask(function () {
                    _this.__input.select();
                    _this.__scrollIntoView();
                });
            }
            this.__tagInput.classList.add('ui-focus');
        };
        UITags.prototype.__lostFocus = function () {
            this.__focus = false;
            this.__tagInput.classList.remove('ui-focus');
        };
        UITags.prototype.inputClicked = function (evt) {
            var b = getParentByClass(evt.target, 'ui-tag', 'ui-input');
            if (b !== null)
                this.__deselect(b['model']);
        };
        UITags.prototype.formatter = function () {
            return this.value;
        };
        UITags.prototype.__scrollIntoView = function () {
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UITags.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UITags.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UITags.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UITags.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "prefixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "prefixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "suffixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "suffixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITags.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITags.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITags.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITags.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITags.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITags.prototype, "emptyText", void 0);
        UITags = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement('ui-tags'), 
            __metadata('design:paramtypes', [Element])
        ], UITags);
        return UITags;
    }(ui_listing_1.UIListBehaviour));
    exports.UITags = UITags;
});
