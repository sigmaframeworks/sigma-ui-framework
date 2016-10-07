var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "../../utils/ui-utils", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, aurelia_router_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UIViewport = (function () {
        function UIViewport(element, container) {
            this.element = element;
            document.documentElement.classList.add(browserAgent());
            var __resizeTimer;
            document.ondragstart = function (e) { return getParentByClass(e.target, '.ui-draggable') != null; };
            document.onmouseup = function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); };
            window.onresize = function (e) {
                window.clearTimeout(__resizeTimer);
                window.setTimeout(function () { return ui_event_1.UIEvent.broadcast('windowresize'); }, 500);
            };
            ui_utils_1.UIUtils.auContainer = container;
            ui_utils_1.UIUtils.taskbar = this.__taskbar;
            ui_utils_1.UIUtils.dialogContainer = this.__dialogContainer;
            ui_utils_1.UIUtils.overlayContainer = this.__overlayContainer;
        }
        UIViewport.prototype.attached = function () {
            ui_event_1.UIEvent.broadcast('appready');
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', aurelia_router_1.Router)
        ], UIViewport.prototype, "router", void 0);
        UIViewport = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-viewport'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-viewport\">\n  <slot name=\"app-header\"></slot>\n  <slot></slot>\n  <router-view class=\"ui-router-view\"></router-view>\n  <slot name=\"app-taskbar\" ref=\"__taskbar\"></slot>\n  <slot name=\"app-footer\"></slot>\n\n  <div class=\"ui-dialog-container\" ref=\"__dialogContainer\"></div>\n  <div class=\"ui-overlay-container\" ref=\"__overlayContainer\"></div>\n\n  <div class=\"ui-loader\" show.bind=\"router.isNavigating\">\n    <div class=\"ui-loader-div\">\n      <span class=\"fi-ui-settings ui-spin\"></span>\n      <span class=\"fi-ui-settings ui-spin-opp\"></span>\n    </div>\n  </div>\n</template>"), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.Container])
        ], UIViewport);
        return UIViewport;
    }());
    exports.UIViewport = UIViewport;
    var UIAppHeader = (function () {
        function UIAppHeader(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppHeader.prototype, "class", void 0);
        UIAppHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-app-header'),
            aurelia_framework_1.inlineView('<template><div class="ui-app-header ${class}" slot="app-header"><slot></slot></div></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIAppHeader);
        return UIAppHeader;
    }());
    exports.UIAppHeader = UIAppHeader;
    var UIAppTitle = (function () {
        function UIAppTitle(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppTitle.prototype, "src", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppTitle.prototype, "class", void 0);
        UIAppTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-app-title'),
            aurelia_framework_1.inlineView('<template><img class="ui-app-logo" src.bind="src" if.bind="src"/><a href="/#" class="ui-app-title ${class}"><slot></slot></a></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIAppTitle);
        return UIAppTitle;
    }());
    exports.UIAppTitle = UIAppTitle;
    var UIAppFooter = (function () {
        function UIAppFooter(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppFooter.prototype, "class", void 0);
        UIAppFooter = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-app-footer'),
            aurelia_framework_1.inlineView('<template><div class="ui-app-footer ${class}" slot="app-footer"><slot></slot></div></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIAppFooter);
        return UIAppFooter;
    }());
    exports.UIAppFooter = UIAppFooter;
    var UIAppTaskbar = (function () {
        function UIAppTaskbar(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIAppTaskbar.prototype, "class", void 0);
        UIAppTaskbar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-app-taskbar'),
            aurelia_framework_1.inlineView('<template><div class="ui-app-taskbar ${class}" slot="app-taskbar"><slot></slot></div></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIAppTaskbar);
        return UIAppTaskbar;
    }());
    exports.UIAppTaskbar = UIAppTaskbar;
});
