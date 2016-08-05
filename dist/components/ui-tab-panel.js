var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_utils_1) {
    "use strict";
    var UITabPanel = (function () {
        function UITabPanel(element) {
            this.element = element;
            this.tabs = [];
            this.activeTab = 0;
        }
        UITabPanel.prototype.bind = function () {
        };
        UITabPanel.prototype.attached = function () {
            var _this = this;
            ui_utils_1._.forEach(this.element.querySelectorAll('ui-tab'), function (t) { return _this.tabs.push(t.au.controller.viewModel); });
            this.activeTabChanged(this.activeTab);
        };
        UITabPanel.prototype.itemsChanged = function (mutations) {
        };
        UITabPanel.prototype.activeTabChanged = function (newValue) {
            if (this.__selectedTab)
                this.__selectedTab.isSelected = false;
            if (this.tabs[newValue]) {
                (this.__selectedTab = this.tabs[newValue]).isSelected = true;
            }
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-tab-panel'), 
            __metadata('design:paramtypes', [Element])
        ], UITabPanel);
        return UITabPanel;
    }());
    exports.UITabPanel = UITabPanel;
    var UITab = (function () {
        function UITab(element) {
            this.element = element;
            this.label = '';
            this.icon = '';
            this.isSelected = false;
            if (this.element.hasAttribute('scroll'))
                this.element.classList.add('ui-scroll');
            if (this.element.hasAttribute('padded'))
                this.element.classList.add('ui-pad-all');
            if (this.element.hasAttribute('flex'))
                this.element.classList.add('ui-column-row');
        }
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], UITab.prototype, "icon", void 0);
        UITab = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-tab-content ${isSelected?\'ui-active\':\'\'}"><slot></slot></template>'),
            aurelia_framework_1.customElement('ui-tab'), 
            __metadata('design:paramtypes', [Element])
        ], UITab);
        return UITab;
    }());
    exports.UITab = UITab;
});
