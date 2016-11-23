var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    var UIOptionGroup = (function () {
        function UIOptionGroup(element) {
            this.element = element;
            this.value = '';
            this.name = '';
            if (element.hasAttribute('vertical'))
                element.classList.add('ui-vertical');
            this.name = "opt" + (UIOptionGroup.seed++);
        }
        UIOptionGroup.prototype.attached = function () {
            var opts = this.element.querySelectorAll('ui-radio');
            for (var i = 0; i < opts.length; i++)
                opts[i].au.controller.viewModel.name = this.name;
        };
        UIOptionGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var opt = _this.element.querySelector("input[value=\"" + newValue + "\"]");
                if (opt != null)
                    opt['checked'] = true;
            });
        };
        UIOptionGroup.prototype.changed = function ($event) {
            this.value = $event.detail;
        };
        UIOptionGroup.seed = 0;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIOptionGroup.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIOptionGroup.prototype, "name", void 0);
        UIOptionGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-option-group'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-group ui-option-group ui-display\" change.trigger=\"changed($event)\"><slot name=\"inputLabel\"></slot>\n<div class=\"ui-group-wrapper\"><slot></slot></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIOptionGroup);
        return UIOptionGroup;
    }());
    exports.UIOptionGroup = UIOptionGroup;
    var UICheckbox = (function () {
        function UICheckbox(element) {
            this.element = element;
            this.checked = false;
            this.size = 'auto';
            this.class = '';
            this.disabled = false;
        }
        UICheckbox.prototype.bind = function () {
            this.checked = isTrue(this.checked);
            this.disabled = isTrue(this.disabled);
        };
        UICheckbox.prototype.__changed = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('checked', this.element, this.checked);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UICheckbox.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICheckbox.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICheckbox.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICheckbox.prototype, "disabled", void 0);
        UICheckbox = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-checkbox'),
            aurelia_framework_1.inlineView("<template class=\"ui-self-center\"><label class=\"ui-option-control ${disabled?'ui-disabled':''}\" css.bind=\"{width: size}\">\n<div class=\"ui-option checkbox ${class}\">\n  <input class=\"ui-option-input\" type=\"checkbox\" disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"__changed($event)\"/>\n  <div class=\"ui-option-handle\"></div>\n</div><span class=\"ui-option-label\"><slot></slot></span>\n</label></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UICheckbox);
        return UICheckbox;
    }());
    exports.UICheckbox = UICheckbox;
    var UIRadio = (function () {
        function UIRadio(element) {
            this.element = element;
            this.checked = false;
            this.size = 'auto';
            this.name = '';
            this.class = '';
            this.value = '';
            this.disabled = false;
        }
        UIRadio.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
        };
        UIRadio.prototype.checkedChanged = function ($event) {
            return ui_event_1.UIEvent.fireEvent('checked', this.element, this.checked);
        };
        UIRadio.prototype.changed = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "disabled", void 0);
        UIRadio = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-radio'),
            aurelia_framework_1.inlineView("<template class=\"ui-self-center\"><label class=\"ui-option-control ${disabled?'ui-disabled':''}\" css.bind=\"{width: size}\">\n<div class=\"ui-option radio ${class}\">\n  <input class=\"ui-option-input\" type=\"radio\" name.bind=\"name\" value.bind=\"value\" disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"changed($event)\"/>\n  <div class=\"ui-option-handle\"></div>\n</div><span class=\"ui-option-label\"><slot></slot></span>\n</label></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIRadio);
        return UIRadio;
    }());
    exports.UIRadio = UIRadio;
    var UISwitch = (function () {
        function UISwitch(element) {
            this.element = element;
            this.checked = false;
            this.value = '';
            this.size = '4em';
            this.class = '';
            this.onLabel = 'on';
            this.offLabel = 'off';
            this.onValue = true;
            this.offValue = false;
            this.disabled = false;
            this.theme = 'default';
            if (this.element.hasAttribute('primary'))
                this.theme = 'primary';
            else if (this.element.hasAttribute('secondary'))
                this.theme = 'secondary';
            else if (this.element.hasAttribute('dark'))
                this.theme = 'dark';
            else if (this.element.hasAttribute('info'))
                this.theme = 'info';
            else if (this.element.hasAttribute('danger'))
                this.theme = 'danger';
            else if (this.element.hasAttribute('success'))
                this.theme = 'success';
            else if (this.element.hasAttribute('warning'))
                this.theme = 'warning';
        }
        UISwitch.prototype.bind = function () {
            this.checked = isTrue(this.checked) || (this.value == this.onValue);
            this.value = isTrue(this.checked) ? this.onValue : this.offValue;
            this.disabled = isTrue(this.disabled);
        };
        UISwitch.prototype.checkedChanged = function (newValue) {
            this.value = newValue ? this.onValue : this.offValue;
        };
        UISwitch.prototype.valueChanged = function (newValue) {
            this.checked = newValue == this.onValue;
        };
        UISwitch.prototype.changed = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            this.value = this.checked ? this.onValue : this.offValue;
            return ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UISwitch.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "onLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "offLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "onValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "offValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISwitch.prototype, "theme", void 0);
        UISwitch = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-switch'),
            aurelia_framework_1.inlineView("<template><label class=\"ui-switch-control\">\n<div class=\"ui-switch ${disabled?'ui-disabled':''} ui-switch-${theme} ${class}\" css.bind=\"{width: size}\">\n  <input class=\"ui-switch-input\" type=\"checkbox\" disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"changed($event)\"/>\n  <div class=\"ui-switch-label\" data-on=\"${onLabel}\" data-off=\"${offLabel}\"></div>\n  <div class=\"ui-switch-handle\"></div>\n</div><span class=\"ui-switch-label\"><slot></slot></span>\n</label></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UISwitch);
        return UISwitch;
    }());
    exports.UISwitch = UISwitch;
});
