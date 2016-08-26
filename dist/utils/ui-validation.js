var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var UIValidationRenderer = (function () {
        function UIValidationRenderer() {
        }
        UIValidationRenderer.prototype.render = function (instruction) {
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var _b = _a[_i], error = _b.error, elements = _b.elements;
                for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                    var element = elements_1[_c];
                    this.remove(element, error);
                }
            }
            for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
                var _f = _e[_d], error = _f.error, elements = _f.elements;
                for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                    var element = elements_2[_g];
                    this.add(element, error);
                }
            }
        };
        UIValidationRenderer.prototype.add = function (element, error) {
            var formGroup = getParentByClass(element, 'ui-input-group');
            if (!formGroup)
                return;
            var isDual = formGroup.isDual;
            formGroup.classList.add('ui-invalid');
            formGroup.classList.remove('ui-valid');
            if (formGroup.lastElementChild !== null)
                formGroup = formGroup.lastElementChild;
            var helpBlock;
            if (!helpBlock) {
                helpBlock = aurelia_framework_1.DOM.createElement('div');
                helpBlock.classList.add('ui-input-help');
                helpBlock.classList.add('ui-input-error');
                helpBlock.errorId = error.id;
                formGroup.appendChild(helpBlock);
            }
            helpBlock.error = error;
            helpBlock.textContent = error ? error.message : 'Invalid';
        };
        UIValidationRenderer.prototype.remove = function (element, error) {
            var formGroup = getParentByClass(element, 'ui-input-group');
            if (!formGroup)
                return;
            var messages = formGroup.querySelectorAll('.ui-input-error');
            var i = messages.length;
            while (i--) {
                var message = messages[i];
                if (message.errorId == error.id) {
                    message.remove();
                    break;
                    ;
                }
            }
            if (formGroup.querySelectorAll('.ui-input-error').length == 0) {
                formGroup.classList.remove('ui-invalid');
                formGroup.classList.add('ui-valid');
            }
        };
        UIValidationRenderer = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [])
        ], UIValidationRenderer);
        return UIValidationRenderer;
    }());
    exports.UIValidationRenderer = UIValidationRenderer;
});
