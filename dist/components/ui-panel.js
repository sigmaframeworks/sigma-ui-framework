var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    var UIPanel = (function () {
        function UIPanel(element) {
            this.element = element;
            this.expanded = false;
            this.collapsed = false;
        }
        UIPanel.prototype.close = function () {
            this.element.remove();
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], UIPanel.prototype, "expanded", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], UIPanel.prototype, "collapsed", void 0);
        UIPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-panel'), 
            __metadata('design:paramtypes', [Element])
        ], UIPanel);
        return UIPanel;
    }());
    exports.UIPanel = UIPanel;
    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
            this.close = false;
            this.expand = false;
            this.collapse = false;
            if (element.hasAttribute('primary'))
                this.element.classList.add('ui-primary');
            if (element.hasAttribute('secondary'))
                this.element.classList.add('ui-secondary');
        }
        UIHeader.prototype.bind = function () {
            this.close = isTrue(this.close);
            this.expand = isTrue(this.expand);
            this.collapse = isTrue(this.collapse);
        };
        UIHeader.prototype.closeChanged = function (newValue) {
            this.close = isTrue(newValue);
        };
        UIHeader.prototype.expandChanged = function (newValue) {
            this.expand = isTrue(newValue);
        };
        UIHeader.prototype.collapseChanged = function (newValue) {
            this.collapse = isTrue(newValue);
        };
        UIHeader.prototype.fireClose = function () {
            ui_event_1.UIEvent.fireEvent('close', this.element);
        };
        UIHeader.prototype.fireExpand = function () {
            ui_event_1.UIEvent.fireEvent('expand', this.element);
        };
        UIHeader.prototype.fireCollapse = function () {
            ui_event_1.UIEvent.fireEvent('collapse', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], UIHeader.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], UIHeader.prototype, "close", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], UIHeader.prototype, "expand", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], UIHeader.prototype, "collapse", void 0);
        UIHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.useView('./ui-header.html'),
            aurelia_framework_1.customElement("ui-header"), 
            __metadata('design:paramtypes', [Element])
        ], UIHeader);
        return UIHeader;
    }());
    exports.UIHeader = UIHeader;
    var UIBody = (function () {
        function UIBody(element) {
            this.element = element;
            if (this.element.hasAttribute('scroll'))
                this.element.classList.add('ui-scroll');
            if (this.element.hasAttribute('padded'))
                this.element.classList.add('ui-pad-all');
            if (this.element.hasAttribute('flex'))
                this.element.classList.add('ui-column-row');
        }
        UIBody.prototype.expand = function ($event) {
            if ($event)
                $event.cancelBubble = true;
            this.element.classList.toggle('ui-expanded');
        };
        UIBody = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement("ui-body"),
            aurelia_framework_1.inlineView('<template class="ui-panel-body"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIBody);
        return UIBody;
    }());
    exports.UIBody = UIBody;
});
