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
define(["require", "exports", "aurelia-framework", "./ui-input-group"], function (require, exports, aurelia_framework_1, ui_input_group_1) {
    "use strict";
    var UIInputDual = (function (_super) {
        __extends(UIInputDual, _super);
        function UIInputDual(element) {
            _super.call(this, element);
            this.__dual = true;
            this.value = '';
            this.valueSecond = '';
            this.checked = false;
            this.disabled = false;
            this.readonly = false;
            this.placeholder = '';
            this.placeholderSecond = '';
            this.dir = '';
            this.name = '';
            this.nameSecond = '';
            this.element['isDual'] = true;
        }
        UIInputDual.prototype.bind = function () {
            _super.prototype.bind.call(this);
            if (this.element.hasAttribute('number')) {
                this.__format = 'number';
            }
            else if (this.element.hasAttribute('decimal')) {
                this.__format = 'decimal';
            }
            else if (this.element.hasAttribute('capitalize')) {
                this.__format = 'title';
            }
            else if (this.element.hasAttribute('email')) {
                this.__format = 'email';
            }
            else if (this.element.hasAttribute('url')) {
                this.__format = 'url';
            }
            else if (this.element.hasAttribute('password')) {
                this.__type = 'password';
            }
            else if (this.element.hasAttribute('search')) {
                this.__type = 'search';
            }
        };
        UIInputDual.prototype.formatter = function (evt) {
            var val = isEmpty(evt.target.value) ? '' : evt.target.value;
            var start = evt.target.selectionStart;
            if (this.__format === 'title') {
                val = val.replace(new RegExp("[" + this.ALPHA + "'\\-']+(?=[\\.&\\s]*)", 'g'), function (txt) {
                    if (txt.toLowerCase().indexOf("mc") == 0) {
                        return txt.substr(0, 1).toUpperCase() +
                            txt.substr(1, 1).toLowerCase() +
                            txt.substr(2, 1).toUpperCase() +
                            txt.substr(3);
                    }
                    if (txt.toLowerCase().indexOf("mac") == 0) {
                        return txt.substr(0, 1).toUpperCase() +
                            txt.substr(1, 2).toLowerCase() +
                            txt.substr(3, 1).toUpperCase() +
                            txt.substr(4);
                    }
                    return txt.charAt(0).toUpperCase() + txt.substr(1);
                });
            }
            else if (this.__format === 'email' || this.__format === 'url') {
                val = val.toLowerCase();
            }
            evt.target.value = val;
            setTimeout(function () { return evt.target.selectionStart = evt.target.selectionEnd = start; }, 10);
            return (this.__format == 'number' || this.__format == 'decimal') ? parseFloat(val) : val;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "valueSecond", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UIInputDual.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIInputDual.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIInputDual.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "prefixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "prefixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "suffixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "suffixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "centerIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "centerText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "placeholderSecond", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIInputDual.prototype, "nameSecond", void 0);
        UIInputDual = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.useView("./ui-input.html"),
            aurelia_framework_1.customElement('ui-input-dual'), 
            __metadata('design:paramtypes', [Element])
        ], UIInputDual);
        return UIInputDual;
    }(ui_input_group_1.UIInputGroup));
    exports.UIInputDual = UIInputDual;
});
