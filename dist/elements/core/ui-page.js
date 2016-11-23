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
    var UIPage = (function () {
        function UIPage(element) {
            this.element = element;
            this.pageClass = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPage.prototype, "pageClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPage.prototype, "pageTitle", void 0);
        UIPage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-page'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-page\">\n  <div class=\"ui-page-title\" if.bind=\"pageTitle\" innerhtml.bind=\"pageTitle\"></div>\n  <div class=\"ui-page-body ${pageClass}\"><slot></slot></div>\n</template>"), 
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
            if (element.hasAttribute('center'))
                element.classList.add('ui-align-center');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-align-middle');
        }
        UISection = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-section'),
            aurelia_framework_1.inlineView("<template class=\"ui-section ${__columnLayout?'ui-column-layout':'ui-row-layout'}\"><slot></slot></template>"), 
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
            var _this = this;
            this.element = element;
            this.__class = '';
            this.__miniDisplay = false;
            this.__collapsible = false;
            this.label = "";
            this.collapsed = false;
            this.position = "start";
            if (element.hasAttribute('scroll'))
                this.__class += ' ui-scroll';
            if (element.hasAttribute('padded'))
                this.__class += ' ui-pad-all';
            if (this.__miniDisplay = element.hasAttribute('mini-display'))
                this.element.classList.add('ui-mini-display');
            this.__collapsible = element.hasAttribute('collapsible');
            this.__obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () {
                _this.element.classList.remove('ui-show-overlay');
            });
        }
        UISidebar.prototype.bind = function () {
            this.collapsed = isTrue(this.collapsed);
        };
        UISidebar.prototype.detached = function () {
            if (this.__obClick)
                this.__obClick.dispose();
        };
        UISidebar.prototype.__toggleCollapse = function ($event) {
            this.collapsed = !this.collapsed;
            this.element.classList.remove('ui-show-overlay');
            $event.cancelBubble = true;
            return true;
        };
        UISidebar.prototype.__showOverlay = function ($event) {
            if (this.__miniDisplay || $event.target != this.element)
                return true;
            if (this.collapsed)
                this.element.classList.add('ui-show-overlay');
            else
                this.element.classList.remove('ui-show-overlay');
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISidebar.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISidebar.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UISidebar.prototype, "position", void 0);
        UISidebar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-sidebar'),
            aurelia_framework_1.inlineView("<template class=\"ui-sidebar ui-row-column ui-align-stretch ${collapsed?'ui-collapse':''} ${position}\" click.trigger=\"__showOverlay($event)\">\n  <div class=\"ui-col-auto ui-row ui-align-end ui-sidebar-head ${position=='start'?'':'ui-reverse'}\" if.bind=\"__collapsible || label\">\n  <h5 class=\"ui-col-fill ui-sidebar-title\">${label}</h5>\n  <a click.trigger=\"__toggleCollapse($event)\" class=\"ui-col-auto ui-pad-all\" if.bind=\"__collapsible\"><span class=\"fi-ui ui-sidebar-close\"></span></a></div>\n  <div class=\"ui-col-fill ui-sidebar-content ${__class}\"><slot></slot></div>\n</template>"), 
            __metadata('design:paramtypes', [Element])
        ], UISidebar);
        return UISidebar;
    }());
    exports.UISidebar = UISidebar;
    var UIDivider = (function () {
        function UIDivider(element) {
            this.element = element;
        }
        UIDivider = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-divider'),
            aurelia_framework_1.inlineView("<template class=\"ui-divider\"></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDivider);
        return UIDivider;
    }());
    exports.UIDivider = UIDivider;
    var UIToolbar = (function () {
        function UIToolbar(element) {
            this.element = element;
            if (element.hasAttribute('start'))
                element.classList.add('ui-start');
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
