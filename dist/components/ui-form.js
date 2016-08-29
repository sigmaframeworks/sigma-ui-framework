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
    var UIForm = (function () {
        function UIForm(element, taskQueue) {
            this.element = element;
            this.taskQueue = taskQueue;
            if (!this.element.hasAttribute('auto-grid'))
                this.element.classList.add('two-column');
        }
        UIForm.prototype.attached = function () {
            var _this = this;
            this.taskQueue.queueMicroTask(function () {
                var el = _this.element.querySelector('ui-input input,textarea,ui-phone input');
                if (!isEmpty(el))
                    el.focus();
                if (_this.busy)
                    _this.busyChanged(true);
            });
        };
        UIForm.prototype.busyChanged = function (newValue) {
            var els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-input-dual,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-phone,ui-switch,ui-tags,ui-textarea');
            ui_utils_1._.forEach(els, function (el) {
                try {
                    el.au.controller.viewModel.disable(isTrue(newValue));
                }
                catch (e) {
                }
            });
        };
        UIForm.prototype.fireSubmit = function () {
            ui_event_1.UIEvent.fireEvent('submit', this.element, this);
        };
        UIForm.prototype.getForm = function () {
            return this.__form;
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], UIForm.prototype, "busy", void 0);
        UIForm = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-form'), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.TaskQueue])
        ], UIForm);
        return UIForm;
    }());
    exports.UIForm = UIForm;
    var UIFieldset = (function () {
        function UIFieldset(element) {
            this.element = element;
            this.label = '';
            this.enabled = true;
            this.checkbox = false;
            this.checkbox = this.element.hasAttribute('enabled');
        }
        UIFieldset.prototype.bind = function () {
            this.enabled = isTrue(this.enabled);
        };
        UIFieldset.prototype.enabledChanged = function (newValue) {
            this.enabled = isTrue(newValue);
            this.element.classList[this.enabled ? 'remove' : 'add']('ui-disabled');
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIFieldset.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UIFieldset.prototype, "enabled", void 0);
        UIFieldset = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement('ui-fieldset'),
            aurelia_framework_1.inlineView('<template class="ui-fieldset"><fieldset><legend if.bind="label"><ui-checkbox checked.bind="enabled" if.bind="checkbox">${label}</ui-checkbox><span if.bind="!checkbox">${label}</span></legend><slot></slot></fieldset></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIFieldset);
        return UIFieldset;
    }());
    exports.UIFieldset = UIFieldset;
});
