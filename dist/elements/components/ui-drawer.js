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
    var UIAppDrawer = (function () {
        function UIAppDrawer(element) {
            var _this = this;
            this.element = element;
            this.class = '';
            this.position = "start";
            if (element.hasAttribute('close-on-click'))
                element.addEventListener('mouseup', function (e) { if (e.button == 0)
                    _this.__closeDrawer(); });
        }
        UIAppDrawer.prototype.bind = function () {
            if (this.element.hasAttribute('scroll'))
                this.class += ' ui-scroll';
            if (this.element.hasAttribute('padded'))
                this.class += ' ui-pad-all';
        };
        UIAppDrawer.prototype.__closeDrawer = function () {
            this.element.classList.remove('show');
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppDrawer.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppDrawer.prototype, "position", void 0);
        UIAppDrawer = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-drawer'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-drawer ${position}\">\n  <div class=\"ui-drawer-content ui-row-column ui-align-stretch\">\n    <a class=\"fi-ui ui-drawer-close ui-col-auto\" click.trigger=\"__closeDrawer()\"></a>\n    <div class=\"ui-col-fill ${class}\"><slot></slot></div>\n  </div>\n  <div class=\"ui-drawer-shim\" click.trigger=\"__closeDrawer()\"></div>\n</template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIAppDrawer);
        return UIAppDrawer;
    }());
    exports.UIAppDrawer = UIAppDrawer;
    var UIAppDrawerToggle = (function () {
        function UIAppDrawerToggle(element) {
            this.element = element;
            this.class = '';
        }
        UIAppDrawerToggle.prototype.__openDrawer = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.drawer && this.drawer.classList) {
                this.drawer.classList.add('show');
            }
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppDrawerToggle.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppDrawerToggle.prototype, "drawer", void 0);
        UIAppDrawerToggle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-drawer-toggle'),
            aurelia_framework_1.inlineView('<template class="ui-drawer-toggle" click.trigger="__openDrawer($event)"><slot><span class="fi-ui-drawer"></span></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIAppDrawerToggle);
        return UIAppDrawerToggle;
    }());
    exports.UIAppDrawerToggle = UIAppDrawerToggle;
});
