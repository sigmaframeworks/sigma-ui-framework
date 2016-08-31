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
define(["require", "exports", "aurelia-framework", "../utils/ui-event", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    var UIOption = (function () {
        function UIOption(element) {
            this.element = element;
            this.__id = "auf-" + __seed++;
            this.checked = false;
            this.disabled = false;
        }
        UIOption.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
        };
        UIOption.prototype.attached = function () {
            this.disable();
        };
        UIOption.prototype.disable = function (disabled) {
            if (this.__input.attributes.getNamedItem('disabled') !== null) {
                this.__input.attributes.removeNamedItem('disabled');
            }
            if (disabled === true || this.disabled === true) {
                this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
            }
        };
        UIOption.prototype.disabledChanged = function (newValue) {
            this.disabled = isTrue(newValue);
            this.disable();
        };
        return UIOption;
    }());
    exports.UIOption = UIOption;
    var UICheckbox = (function (_super) {
        __extends(UICheckbox, _super);
        function UICheckbox(element) {
            _super.call(this, element);
            this.__type = 'checkbox';
            this.disabled = false;
            this.checked = false;
        }
        UICheckbox.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.checked = isTrue(this.checked);
        };
        UICheckbox.prototype.attached = function () {
            _super.prototype.attached.call(this);
            this.element.classList.add('ui-checkbox');
        };
        UICheckbox.prototype.valueChanged = function ($event) {
            this.checked = !this.checked;
            $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('change', this.element, this.checked);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UICheckbox.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UICheckbox.prototype, "checked", void 0);
        UICheckbox = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.useView('./ui-option.html'),
            aurelia_framework_1.customElement('ui-checkbox'), 
            __metadata('design:paramtypes', [Element])
        ], UICheckbox);
        return UICheckbox;
    }(UIOption));
    exports.UICheckbox = UICheckbox;
    var UIRadio = (function (_super) {
        __extends(UIRadio, _super);
        function UIRadio(element) {
            _super.call(this, element);
            this.__type = 'radio';
            this.value = '';
            this.disabled = false;
            this.checked = '';
        }
        UIRadio.prototype.attached = function () {
            if (!this.element.parentElement.classList.contains('ui-option-group')) {
                throw new Error('UIRadio must be a child of UIOptionGroup');
            }
            _super.prototype.attached.call(this);
            this.element.classList.add('ui-radio');
        };
        UIRadio.prototype.valueChanged = function ($event) {
            $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIRadio.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIRadio.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIRadio.prototype, "checked", void 0);
        UIRadio = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.useView('./ui-option.html'),
            aurelia_framework_1.customElement('ui-radio'), 
            __metadata('design:paramtypes', [Element])
        ], UIRadio);
        return UIRadio;
    }(UIOption));
    exports.UIRadio = UIRadio;
    var UIOptionGroup = (function () {
        function UIOptionGroup(element, taskQueue) {
            this.element = element;
            this.taskQueue = taskQueue;
            this.__name = "auf-" + __seed++;
            this.label = '';
            this.name = '';
            if (this.element.hasAttribute('auto-width'))
                this.element.classList.add('ui-auto');
            if (this.element.hasAttribute('label-top'))
                this.element.classList.add('ui-label-top');
            if (this.element.hasAttribute('label-hide'))
                this.element.classList.add('ui-label-hide');
        }
        UIOptionGroup.prototype.attached = function () {
            var _this = this;
            this.taskQueue.queueMicroTask(function () {
                var radios = _this.element.querySelectorAll('.ui-radio .ui-option-input');
                ui_utils_1._.forEach(radios, function (b) {
                    b.setAttribute('name', _this.name || _this.__name);
                    if (_this.value + '' === b.value + '') {
                        b.setAttribute('checked', "true");
                        b.checked = true;
                    }
                });
            });
            if (this.element.hasAttribute('required'))
                this.__label.classList.add('ui-required');
        };
        UIOptionGroup.prototype.valueChanged = function (newValue) {
            var opt = this.element.querySelector(".ui-option-input[value=\"" + newValue + "\"]");
            if (opt) {
                opt.setAttribute('checked', 'true');
                opt.checked = true;
            }
        };
        UIOptionGroup.prototype.checkChanged = function ($event) {
            var opt = this.element.querySelector(".ui-option-input[value=\"" + this.value + "\"]");
            if (opt && this.value != $event.detail) {
                opt.setAttribute('checked', 'false');
                opt.checked = false;
            }
            this.value = $event.detail;
            $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIOptionGroup.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIOptionGroup.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIOptionGroup.prototype, "value", void 0);
        UIOptionGroup = __decorate([
            aurelia_framework_1.useView('./ui-option-group.html'),
            aurelia_framework_1.customElement('ui-option-group'), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.TaskQueue])
        ], UIOptionGroup);
        return UIOptionGroup;
    }());
    exports.UIOptionGroup = UIOptionGroup;
});
