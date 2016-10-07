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
    var UIPanel = (function () {
        function UIPanel(element) {
            this.element = element;
        }
        UIPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-panel'),
            aurelia_framework_1.inlineView("<template class=\"ui-panel\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIPanel);
        return UIPanel;
    }());
    exports.UIPanel = UIPanel;
    var UIContent = (function () {
        function UIContent(element) {
            this.element = element;
            this.maxHeight = 'auto';
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIContent.prototype, "maxHeight", void 0);
        UIContent = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-panel-body'),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-body\" css.bind=\"{'max-height': maxHeight}\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIContent);
        return UIContent;
    }());
    exports.UIContent = UIContent;
    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
            this.icon = '';
            if (this.element.hasAttribute('primary'))
                element.classList.add('ui-bg-primary');
            else if (this.element.hasAttribute('secondary'))
                element.classList.add('ui-bg-secondary');
            else if (this.element.hasAttribute('dark'))
                element.classList.add('ui-bg-dark');
            else if (this.element.hasAttribute('info'))
                element.classList.add('ui-bg-info');
            else if (this.element.hasAttribute('danger'))
                element.classList.add('ui-bg-danger');
            else if (this.element.hasAttribute('success'))
                element.classList.add('ui-bg-success');
            else if (this.element.hasAttribute('warning'))
                element.classList.add('ui-bg-warning');
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIHeader.prototype, "icon", void 0);
        UIHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-header'),
            aurelia_framework_1.inlineView("<template class=\"ui-header\"><span if.bind=\"icon\" class=\"${icon}\"></span><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIHeader);
        return UIHeader;
    }());
    exports.UIHeader = UIHeader;
});
