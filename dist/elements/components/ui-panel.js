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
    var UIPanelGroup = (function () {
        function UIPanelGroup(element) {
            this.element = element;
        }
        UIPanelGroup.prototype.attached = function () {
            if (_.find(this.panels, ['collapsed', false]) == null)
                this.panels[0].collapsed = false;
        };
        UIPanelGroup.prototype.__unCollapse = function () {
            var panel = _.find(this.panels, ['collapsed', false]);
            if (panel)
                panel.collapsed = true;
        };
        __decorate([
            aurelia_framework_1.children('ui-panel'), 
            __metadata('design:type', Object)
        ], UIPanelGroup.prototype, "panels", void 0);
        UIPanelGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-panel-group'),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-group\" collapse.delegate=\"__unCollapse()\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIPanelGroup);
        return UIPanelGroup;
    }());
    exports.UIPanelGroup = UIPanelGroup;
    var UIPanel = (function () {
        function UIPanel(element) {
            this.element = element;
            this.collapsed = false;
            this.collapsed = element.hasAttribute('collapsed');
        }
        UIPanel.prototype.closePanel = function () {
            aurelia_framework_1.DOM.removeNode(this.element);
        };
        UIPanel.prototype.toggleCollapse = function () {
            var _this = this;
            setTimeout(function () { return _this.collapsed = !_this.collapsed; }, 200);
        };
        UIPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-panel'),
            aurelia_framework_1.inlineView("<template class=\"ui-panel ${collapsed?'ui-collapse':''}\" collapse.trigger=\"toggleCollapse()\" close.trigger=\"closePanel()\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIPanel);
        return UIPanel;
    }());
    exports.UIPanel = UIPanel;
    var UIContent = (function () {
        function UIContent(element) {
            this.element = element;
            this.__wrapperClass = '';
            this.height = 'auto';
            this.maxHeight = 'auto';
            if (element.hasAttribute('flex'))
                element.classList.add('ui-row-column');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIContent.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIContent.prototype, "maxHeight", void 0);
        UIContent = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-panel-body'),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-body\" css.bind=\"{'max-height': maxHeight,'flex-basis':height}\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIContent);
        return UIContent;
    }());
    exports.UIContent = UIContent;
    var UIHeaderTool = (function () {
        function UIHeaderTool(element) {
            this.element = element;
            if (element.hasAttribute('collapse'))
                this.__type = "collapse";
            if (element.hasAttribute('collapse'))
                this.__icon = "fi-ui-angle-up";
            if (element.hasAttribute('minimize'))
                this.__type = "minimize";
            if (element.hasAttribute('minimize'))
                this.__icon = "fi-ui-dialog-minimize";
            if (element.hasAttribute('maximize'))
                this.__type = "maximize";
            if (element.hasAttribute('maximize'))
                this.__icon = "fi-ui-dialog-maximize";
            if (element.hasAttribute('close'))
                this.__type = "close";
            if (element.hasAttribute('close'))
                this.__icon = "fi-ui-close";
            if (element.hasAttribute('refresh'))
                this.__type = "refresh";
            if (element.hasAttribute('refresh'))
                this.__icon = "fi-ui-refresh";
        }
        UIHeaderTool.prototype.fireEvent = function (evt) {
            if (evt.button != 0)
                return true;
            return ui_event_1.UIEvent.fireEvent(this.__type, this.element);
        };
        UIHeaderTool = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-header-tool'),
            aurelia_framework_1.inlineView("<template><button tabindex=\"-1\" class=\"ui-header-button ui-${__type}\" click.trigger=\"fireEvent($event)\">\n  <slot><span class=\"${__icon}\"></span></slot></button></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIHeaderTool);
        return UIHeaderTool;
    }());
    exports.UIHeaderTool = UIHeaderTool;
    var UIHeaderIcon = (function () {
        function UIHeaderIcon(element) {
            this.element = element;
            this.icon = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIHeaderIcon.prototype, "icon", void 0);
        UIHeaderIcon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-header-icon'),
            aurelia_framework_1.inlineView("<template class=\"ui-header-icon ui-inline-block\"><span class=\"ui-icon ${icon}\"></span>&nbsp;</template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIHeaderIcon);
        return UIHeaderIcon;
    }());
    exports.UIHeaderIcon = UIHeaderIcon;
    var UIHeaderTitle = (function () {
        function UIHeaderTitle(element) {
            this.element = element;
        }
        UIHeaderTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-header-title'),
            aurelia_framework_1.inlineView("<template class=\"ui-header-title ui-inline-block ui-col-fill\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIHeaderTitle);
        return UIHeaderTitle;
    }());
    exports.UIHeaderTitle = UIHeaderTitle;
    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
            if (this.element.hasAttribute('primary'))
                element.classList.add('ui-primary');
            else if (this.element.hasAttribute('secondary'))
                element.classList.add('ui-secondary');
            else if (this.element.hasAttribute('dark'))
                element.classList.add('ui-dark');
            else if (this.element.hasAttribute('light'))
                element.classList.add('ui-light');
            else if (this.element.hasAttribute('info'))
                element.classList.add('ui-info');
            else if (this.element.hasAttribute('danger'))
                element.classList.add('ui-danger');
            else if (this.element.hasAttribute('success'))
                element.classList.add('ui-success');
            else if (this.element.hasAttribute('warning'))
                element.classList.add('ui-warning');
        }
        UIHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-header'),
            aurelia_framework_1.inlineView("<template class=\"ui-header\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIHeader);
        return UIHeader;
    }());
    exports.UIHeader = UIHeader;
});
