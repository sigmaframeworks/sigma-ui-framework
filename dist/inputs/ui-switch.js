var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    var UISwitch = (function () {
        function UISwitch(element) {
            this.element = element;
            this.__id = "auf-" + __seed++;
            this.labelOn = 'On';
            this.labelOff = 'Off';
            this.disabled = false;
            this.checked = false;
        }
        UISwitch.prototype.bind = function () {
            if (this.element.hasAttribute('primary'))
                this.__theme = 'primary';
            if (this.element.hasAttribute('info'))
                this.__theme = 'info';
            if (this.element.hasAttribute('danger'))
                this.__theme = 'danger';
            if (this.element.hasAttribute('success'))
                this.__theme = 'success';
            if (this.element.hasAttribute('warning'))
                this.__theme = 'warning';
            if (this.element.hasAttribute('ampm'))
                this.__theme = 'ampm';
            if (this.element.hasAttribute('gender'))
                this.__theme = 'gender';
            this.checked = isTrue(this.checked);
            this.disabled = isTrue(this.disabled);
        };
        UISwitch.prototype.attached = function () {
            if (!isNaN(this.width))
                this.__switch.style.width = parseInt(this.width) + 'em';
            this.__switch.classList.add("ui-switch-" + this.__theme);
            this.disable();
        };
        UISwitch.prototype.disable = function (disabled) {
            if (this.__input.attributes.getNamedItem('disabled') !== null) {
                this.__input.attributes.removeNamedItem('disabled');
            }
            if (this.__label.attributes.getNamedItem('disabled') !== null) {
                this.__label.attributes.removeNamedItem('disabled');
            }
            if (disabled === true || this.disabled === true) {
                this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
                this.__label.attributes.setNamedItem(document.createAttribute('disabled'));
            }
        };
        UISwitch.prototype.disabledChanged = function (newValue) {
            this.disabled = isTrue(newValue);
            this.disable();
        };
        UISwitch.prototype.valueChanged = function ($event) {
            $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('change', this.element, this.checked);
        };
        UISwitch.prototype.onFocus = function () {
            this.__switch.classList.add('ui-focus');
        };
        UISwitch.prototype.onBlur = function () {
            this.__switch.classList.remove('ui-focus');
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UISwitch.prototype, "labelOn", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UISwitch.prototype, "labelOff", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UISwitch.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UISwitch.prototype, "checked", void 0);
        UISwitch = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-switch'), 
            __metadata('design:paramtypes', [Element])
        ], UISwitch);
        return UISwitch;
    }());
    exports.UISwitch = UISwitch;
});
