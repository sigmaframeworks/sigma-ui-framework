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
define(["require", "exports", "aurelia-framework", "./ui-input-group", "../utils/ui-utils", "../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_input_group_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UIPhone = (function (_super) {
        __extends(UIPhone, _super);
        function UIPhone(element) {
            _super.call(this, element);
            this.__phoneType = PhoneLib.TYPE.FIXED_LINE_OR_MOBILE;
            this.__phoneFormat = PhoneLib.FORMAT.NATIONAL;
            this.placeholder = '';
            this.prefixText = '';
            this.prefixIcon = '';
            this.ignoreUpdate = true;
            this.__type = 'tel';
            this.value = '';
            this.isdCode = '';
            this.areaCode = '';
            this.phone = '';
            this.extension = '';
            this.country = 'us';
            this.checked = false;
            this.disabled = false;
            this.readonly = false;
        }
        UIPhone.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.dir = 'ltr';
            if (this.element.hasAttribute('international')) {
                this.__phoneFormat = PhoneLib.FORMAT.INTERNATIONAL;
                this.prefixIcon = "ui-flag";
            }
            else {
                this.prefixText = '+' + PhoneLib.getDialingCode(this.country);
            }
            this.placeholder = PhoneLib.getExample(this.country, this.__phoneType, this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL);
            this.ignoreUpdate = false;
            var val = this.value;
            if (isEmpty(val)) {
                if (!isEmpty(this.isdCode))
                    val += '+' + this.isdCode;
                if (!isEmpty(this.areaCode))
                    val += this.areaCode;
                if (!isEmpty(this.phone))
                    val += ' ' + this.phone;
                if (!isEmpty(this.extension))
                    val += ',' + this.extension;
            }
            if (this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL && !isEmpty(val)) {
                val = PhoneLib.format(val, this.country, PhoneLib.FORMAT.NATIONAL);
            }
            this.valueChanged(val);
        };
        UIPhone.prototype.countryChanged = function () {
            this.prefixText = '+' + PhoneLib.getDialingCode(this.country);
            this.placeholder = PhoneLib.getExample(this.country, this.__phoneType, this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL);
            this.valueChanged(this.value);
        };
        UIPhone.prototype.valueChanged = function (newValue) {
            if (this.ignoreUpdate)
                return;
            this.ignoreUpdate = true;
            if (this.__phoneFormat === PhoneLib.FORMAT.INTERNATIONAL) {
                if (isEmpty(newValue))
                    this.prefixIcon = 'ui-flag';
                if (!isEmpty(newValue) && !/^\+/.test(newValue))
                    newValue = '+' + newValue;
            }
            if (!isEmpty(newValue)) {
                if (newValue === 'NaN')
                    newValue = '';
                this.__value =
                    PhoneLib.formatInput(newValue, this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '', false, true);
                this.value =
                    PhoneLib.format(this.__value, this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '', PhoneLib.FORMAT.FULL);
            }
            else {
                this.__value = '';
            }
            this.processValue();
            this.ignoreUpdate = false;
        };
        UIPhone.prototype.formatter = function (evt) {
            var _this = this;
            var newValue = evt.target.value;
            var start = this.__input.selectionStart;
            if (this.__phoneFormat === PhoneLib.FORMAT.INTERNATIONAL) {
                if (isEmpty(newValue))
                    this.prefixIcon = 'ui-flag';
                if (!isEmpty(newValue) && !/^\+/.test(newValue))
                    newValue = '+' + newValue;
            }
            if (!isEmpty(newValue)) {
                if (newValue === 'NaN')
                    newValue = '';
                newValue = newValue.replace(/\sext\.\s$/, '');
                evt.target.value =
                    PhoneLib.formatInput(newValue, this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '', false, true);
                newValue = PhoneLib.format(newValue, this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '', PhoneLib.FORMAT.FULL);
            }
            else {
                newValue = '';
            }
            this.processValue();
            ui_event_1.UIEvent.queueTask(function () {
                var x = /(\s\d)|(\+\d)$/.test(_this.__value) ? 2 : 0;
                if (x)
                    _this.__input.setSelectionRange(start + x, start + x);
            });
            return newValue;
        };
        UIPhone.prototype.processValue = function () {
            if (this.__phoneFormat === PhoneLib.FORMAT.INTERNATIONAL) {
                if (isEmpty(this.__value))
                    this.prefixIcon = 'ui-flag';
                if (!isEmpty(this.__value))
                    this.prefixIcon = 'ui-flag ' + (PhoneLib.getIso2Code(this.value) || 'US');
            }
            try {
                var info = PhoneLib.getNumberInfo(ui_utils_1._.trim(this.value), this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : PhoneLib.getIso2Code(this.__value));
                this.isdCode = isNaN(info.countryCode) ? '' : info.countryCode;
                this.areaCode = isNaN(info.areaCode) ? '' : info.areaCode;
                this.phone = isNaN(info.phone) ? '' : info.phone;
                this.extension = isNaN(info.ext) ? '' : info.ext;
            }
            catch (e) {
                this.isdCode = '';
                this.areaCode = '';
                this.phone = '';
                this.extension = '';
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "isdCode", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "areaCode", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "phone", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "extension", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "country", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UIPhone.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIPhone.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIPhone.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPhone.prototype, "helpText", void 0);
        UIPhone = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.useView('./ui-input.html'),
            aurelia_framework_1.customElement('ui-phone'), 
            __metadata('design:paramtypes', [Element])
        ], UIPhone);
        return UIPhone;
    }(ui_input_group_1.UIInputGroup));
    exports.UIPhone = UIPhone;
});
