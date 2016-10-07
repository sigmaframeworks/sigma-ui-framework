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
    var UIPage = (function () {
        function UIPage(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPage.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPage.prototype, "pageTitle", void 0);
        UIPage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-page'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-page\">\n  <div class=\"ui-page-title\" if.bind=\"pageTitle\" innerhtml.bind=\"pageTitle\"></div>\n  <div class=\"ui-page-body ${class}\"><slot></slot></div>\n</template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIPage);
        return UIPage;
    }());
    exports.UIPage = UIPage;
    var UISection = (function () {
        function UISection(element) {
            this.element = element;
            this.__columnLayout = true;
            this.__columnLayout = !element.hasAttribute('row-layout');
        }
        UISection = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-section'),
            aurelia_framework_1.inlineView("<template class=\"ui-section ${__columnLayout?'ui-col-layout':'ui-row-layout'}\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UISection);
        return UISection;
    }());
    exports.UISection = UISection;
    var UIRouterView = (function () {
        function UIRouterView(element) {
            this.element = element;
        }
        UIRouterView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-router-view'),
            aurelia_framework_1.inlineView("<template><router-view class=\"ui-router-view\"></router-view></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIRouterView);
        return UIRouterView;
    }());
    exports.UIRouterView = UIRouterView;
    var UIContent = (function () {
        function UIContent(element) {
            this.element = element;
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIContent = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-content'),
            aurelia_framework_1.inlineView("<template class=\"ui-content\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIContent);
        return UIContent;
    }());
    exports.UIContent = UIContent;
    var UISidebar = (function () {
        function UISidebar(element) {
            this.element = element;
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UISidebar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-sidebar'),
            aurelia_framework_1.inlineView("<template class=\"ui-sidebar\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UISidebar);
        return UISidebar;
    }());
    exports.UISidebar = UISidebar;
    var UIToolbar = (function () {
        function UIToolbar(element) {
            this.element = element;
        }
        UIToolbar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-toolbar'),
            aurelia_framework_1.inlineView("<template class=\"ui-toolbar\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIToolbar);
        return UIToolbar;
    }());
    exports.UIToolbar = UIToolbar;
});
