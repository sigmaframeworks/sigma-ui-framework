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
    var UIComboBox = (function (_super) {
        __extends(UIComboBox, _super);
        function UIComboBox(element) {
            _super.call(this, element);
            this.value = '';
            this.checked = false;
            this.disabled = false;
            this.readonly = false;
            this.placeholder = '';
            this.dir = '';
            this.options = [];
            this.valueProperty = 'id';
            this.displayProperty = 'text';
            this.iconProperty = '';
            this.iconClass = '';
            this.emptyText = 'No Results Found...';
        }
        UIComboBox.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.optionsChanged(this.options);
        };
        UIComboBox.prototype.attached = function () {
            var _this = this;
            _super.prototype.attached.call(this);
            ui_event_1.UIEvent.queueTask(function () {
                _this.__tethered = new ui_utils_1.Tether({
                    element: _this.__list,
                    target: _this.__input,
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
                    ]
                });
                _this.valueChanged(_this.value);
            });
        };
        UIComboBox.prototype.detached = function () {
            this.__tethered.element.remove();
            this.__tethered.destroy();
        };
        UIComboBox.prototype.valueChanged = function (newValue) {
            if (!isEmpty(newValue)) {
                var v = ui_utils_1._['findDeep'](this.options, this.valueProperty, newValue);
                this.__searchText = v ? v[this.displayProperty] : '';
                if (v === null)
                    this.value = null;
                ui_event_1.UIEvent.fireEvent('select', this.element, v);
            }
            else {
                this.value = this.__searchText = '';
                ui_event_1.UIEvent.fireEvent('select', this.element, null);
            }
        };
        UIComboBox.prototype.optionsChanged = function (newValue) {
            var _this = this;
            this.__noResult = isEmpty(newValue);
            this.options = newValue;
            this.__isFiltered = false;
            this.__isGrouped = !ui_utils_1._.isArray(newValue);
            this.__options = ui_utils_1._.cloneDeep(this.options || []);
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UIComboBox.prototype.__select = function (item) {
            if (item !== null) {
                this.value = item.dataset['value'];
                this.__searchText = item.model[this.displayProperty];
            }
            else {
                this.value = this.__searchText = '';
            }
            if (this.__isFiltered) {
                this.__isFiltered = false;
                this.__options = ui_utils_1._.cloneDeep(this.options);
                this.__noResult = isEmpty(this.__options);
            }
            this.__focus = false;
        };
        UIComboBox.prototype.__clicked = function ($event) {
            var o = getParentByClass($event.target, 'ui-list-item', 'ui-list');
            if (o !== null) {
                this.__select(this.__hilight = o);
            }
        };
        UIComboBox.prototype.__showFocus = function () {
            if (this.__focus)
                return this.__focus = false;
            this.__input.focus();
            this.__focus = true;
        };
        UIComboBox.prototype.__gotFocus = function (show) {
            var _this = this;
            this.__hilight = this.__list.querySelector("[data-value=\"" + this.value + "\"]");
            if (show)
                this.__focus = true;
            this.__tethered.element.style.minWidth = this.__tethered.target.offsetWidth + 'px';
            this.__tethered.position();
            ui_event_1.UIEvent.queueTask(function () {
                _this.__input.select();
                _this.__scrollIntoView();
            });
        };
        UIComboBox.prototype.__lostFocus = function () {
            var _this = this;
            if (this.__focus)
                this.__select(this.__hilight);
            setTimeout(function () { return _this.__focus = false; }, 500);
        };
        UIComboBox.prototype.formatter = function () {
            return this.value;
        };
        UIComboBox.prototype.__scrollIntoView = function () {
            this.__list.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.__list.offsetHeight / 2) : 0);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UIComboBox.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIComboBox.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIComboBox.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "prefixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "prefixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "suffixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "suffixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIComboBox.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIComboBox.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIComboBox.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIComboBox.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIComboBox.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIComboBox.prototype, "emptyText", void 0);
        UIComboBox = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement('ui-combo'), 
            __metadata('design:paramtypes', [Element])
        ], UIComboBox);
        return UIComboBox;
    }(ui_listing_1.UIListBehaviour));
    exports.UIComboBox = UIComboBox;
});
