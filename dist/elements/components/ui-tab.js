var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, _) {
    "use strict";
    var UITabPanel = (function () {
        function UITabPanel(element, tempEngine) {
            this.element = element;
            this.tempEngine = tempEngine;
            this.height = "auto";
            this.tabs = [];
            this.activeTab = 0;
            this.__hideTabs = false;
            this.__activeTab = null;
            if (element.hasAttribute('bottom'))
                element.classList.add('bottom');
            if (element.hasAttribute('noborder'))
                element.classList.add('noborder');
            this.__hideTabs = element.hasAttribute('hide-tabs');
        }
        UITabPanel.prototype.tabsChanged = function () {
            if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                (this.__activeTab = _.find(this.tabs, ['disabled', false])).active = true;
        };
        UITabPanel.prototype.activeTabChanged = function (newValue) {
            if (this.tabs.length == 0)
                return;
            if (this.__activeTab)
                this.__activeTab.active = false;
            (this.__activeTab = (this.tabs[newValue] || this.__activeTab)).active = true;
        };
        UITabPanel.prototype.closeTab = function (tab) {
            if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element, tab)) {
                tab.remove();
                ui_event_1.UIEvent.fireEvent('close', this.element, tab);
            }
        };
        UITabPanel.prototype.activateTab = function (tab) {
            if (ui_event_1.UIEvent.fireEvent('beforechange', this.element, tab)) {
                if (this.__activeTab)
                    this.__activeTab.active = false;
                (this.__activeTab = tab).active = true;
                ui_event_1.UIEvent.fireEvent('change', this.element, tab);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.children('ui-tab'), 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "tabs", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-tab-panel'),
            aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'flex-basis': height}\"><div class=\"ui-tab-bar\" if.bind=\"!__hideTabs\">\n    <a click.trigger=\"activateTab(tab)\" repeat.for=\"tab of tabs\" class=\"ui-tab-button ${tab.active?'ui-active':''} ${tab.disabled?'ui-disabled':''}\">\n      <span if.bind=\"tab.icon\" class=\"fi-ui ${tab.icon}\"></span>\n      <span class=\"ui-label\">${tab.label}</span>\n      <span if.bind=\"tab.closeable\" class=\"ui-close\" click.trigger=\"closeTab(tab)\">&nbsp;&times;</span>\n    </a>\n  </div><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.TemplatingEngine])
        ], UITabPanel);
        return UITabPanel;
    }());
    exports.UITabPanel = UITabPanel;
    var UITab = (function () {
        function UITab(element) {
            this.element = element;
            this.__id = '';
            this.active = false;
            this.closeable = false;
            this.id = '';
            this.icon = '';
            this.label = '';
            this.disabled = false;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            this.__id = 'tab-' + (UITab.__seed++);
            this.closeable = element.hasAttribute('closeable');
        }
        UITab.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
        };
        UITab.prototype.remove = function () {
            aurelia_framework_1.DOM.removeNode(this.element);
        };
        UITab.__seed = 0;
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "disabled", void 0);
        UITab = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-tab'),
            aurelia_framework_1.inlineView("<template class=\"ui-tab ${active?'ui-active':''}\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UITab);
        return UITab;
    }());
    exports.UITab = UITab;
    var UIBreadcrumb = (function () {
        function UIBreadcrumb(element) {
            this.element = element;
            if (element.hasAttribute('primary'))
                element.classList.add('ui-theme');
            if (element.hasAttribute('primary'))
                element.classList.add('primary');
            if (element.hasAttribute('secondary'))
                element.classList.add('ui-theme');
            if (element.hasAttribute('secondary'))
                element.classList.add('secondary');
        }
        UIBreadcrumb.prototype.fireChange = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            ui_event_1.UIEvent.fireEvent('change', this.element, $event.detail);
            return false;
        };
        UIBreadcrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-breadcrumb'),
            aurelia_framework_1.inlineView("<template class=\"ui-breadcrumb\" click.delegate=\"fireChange($event)\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIBreadcrumb);
        return UIBreadcrumb;
    }());
    exports.UIBreadcrumb = UIBreadcrumb;
    var UICrumb = (function () {
        function UICrumb(element) {
            this.element = element;
            this.id = '';
            this.href = 'javascript:;';
        }
        UICrumb.prototype.fireClick = function ($event) {
            $event.stopPropagation();
            ui_event_1.UIEvent.fireEvent('click', this.element, this.id);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICrumb.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UICrumb.prototype, "href", void 0);
        UICrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-crumb'),
            aurelia_framework_1.inlineView("<template class=\"ui-crumb\"><a href=\"crumb.href || 'javascript:;'\" click.trigger=\"fireClick($event)\"><slot></slot></a></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UICrumb);
        return UICrumb;
    }());
    exports.UICrumb = UICrumb;
});
