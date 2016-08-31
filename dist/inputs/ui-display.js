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
    var UIDisplay = (function () {
        function UIDisplay(element) {
            this.element = element;
            this.value = '';
            if (this.element.hasAttribute('auto-width'))
                this.element.classList.add('ui-auto');
            if (this.element.hasAttribute('label-top'))
                this.element.classList.add('ui-label-top');
            if (this.element.hasAttribute('label-hide'))
                this.element.classList.add('ui-label-hide');
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "prefixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "prefixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "suffixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "suffixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDisplay.prototype, "helpText", void 0);
        UIDisplay = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-display'), 
            __metadata('design:paramtypes', [Element])
        ], UIDisplay);
        return UIDisplay;
    }());
    exports.UIDisplay = UIDisplay;
});
