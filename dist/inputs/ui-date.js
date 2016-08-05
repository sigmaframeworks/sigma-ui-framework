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
define(["require", "exports", "aurelia-framework", "./ui-input-group", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_input_group_1, ui_utils_1) {
    "use strict";
    var UIDate = (function (_super) {
        __extends(UIDate, _super);
        function UIDate(element) {
            _super.call(this, element);
            this.__dual = false;
            this.date = ui_utils_1.moment().format();
            this.dateEnd = ui_utils_1.moment().format();
            this.checked = false;
            this.disabled = false;
            this.placeholder = '';
            this.placeholderSecond = '';
            this.dir = '';
            this.format = 'DD-MMM-YYYY';
            this.options = new UIDateOptions();
            this.__dateStart = new UIDateOptions();
            this.__dateEnd = new UIDateOptions();
            this.showTime = false;
        }
        UIDate.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.__dual = this.element.hasAttribute('range');
            this.__today = ui_utils_1.moment().format('DD');
            Object.assign(this.__dateStart, this.options);
            Object.assign(this.__dateEnd, this.options);
            this.dateChanged(this.date);
            this.showTime = this.format.toLowerCase().indexOf('hh:mm') > 0;
            if (this.__dual) {
                this.dateEndChanged(this.dateEnd);
                this.__dateEnd.minDate = this.date;
            }
        };
        UIDate.prototype.dateChanged = function (newValue) {
            if (ui_utils_1.moment(newValue).isValid()) {
                this.__value = ui_utils_1.moment(newValue).format(this.format);
                if (this.__dual) {
                    this.__dateEnd.minDate = newValue;
                    if (ui_utils_1.moment(newValue).isAfter(this.dateEnd))
                        this.dateEnd = newValue;
                }
            }
            else {
                this.__value = '';
            }
        };
        UIDate.prototype.dateEndChanged = function (newValue) {
            if (ui_utils_1.moment(newValue).isValid()) {
                this.__value2 = ui_utils_1.moment(newValue).format(this.format);
            }
            else {
                this.__value2 = '';
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIDate.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIDate.prototype, "dateEnd", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UIDate.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIDate.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "suffixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "suffixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "placeholderSecond", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDate.prototype, "format", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', UIDateOptions)
        ], UIDate.prototype, "options", void 0);
        UIDate = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-date'), 
            __metadata('design:paramtypes', [Element])
        ], UIDate);
        return UIDate;
    }(ui_input_group_1.UIInputGroup));
    exports.UIDate = UIDate;
    var UIDateOptions = (function () {
        function UIDateOptions(o) {
            if (o === void 0) { o = {}; }
            this.minDate = null;
            this.maxDate = null;
            this.showTime = false;
            Object.assign(this, o);
        }
        return UIDateOptions;
    }());
    exports.UIDateOptions = UIDateOptions;
});
