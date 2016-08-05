var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-utils", "../utils/ui-event", "../utils/ui-formatters"], function (require, exports, aurelia_framework_1, ui_utils_1, ui_event_1, ui_formatters_1) {
    "use strict";
    var UIPage = (function () {
        function UIPage(element) {
            this.element = element;
        }
        UIPage.prototype.toast = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            config.extraClass = 'ui-page-toast';
            ui_utils_1.UIUtils.showToast(this.__body, config);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPage.prototype, "pageTitle", void 0);
        UIPage = __decorate([
            aurelia_framework_1.customElement('ui-page'), 
            __metadata('design:paramtypes', [Element])
        ], UIPage);
        return UIPage;
    }());
    exports.UIPage = UIPage;
    var UISection = (function () {
        function UISection(element) {
            this.element = element;
        }
        UISection.prototype.bind = function () {
            if (this.element.hasAttribute('column')) {
                this.element.classList.add('ui-section-column');
            }
            else {
                this.element.classList.add('ui-section-row');
            }
        };
        UISection = __decorate([
            aurelia_framework_1.customElement('ui-section'),
            aurelia_framework_1.inlineView('<template class="ui-section"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UISection);
        return UISection;
    }());
    exports.UISection = UISection;
    var UIContent = (function () {
        function UIContent(element) {
            this.element = element;
        }
        UIContent.prototype.bind = function () {
            if (this.element.hasAttribute('auto')) {
                this.element.classList.add('ui-auto-fit');
            }
            else if (this.element.hasAttribute('scroll')) {
                this.element.classList.add('ui-scroll');
            }
            if (this.element.hasAttribute('padded'))
                this.element.classList.add('ui-pad-all');
        };
        UIContent = __decorate([
            aurelia_framework_1.customElement('ui-content'),
            aurelia_framework_1.inlineView('<template class="ui-content"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIContent);
        return UIContent;
    }());
    exports.UIContent = UIContent;
    var UISidebar = (function () {
        function UISidebar(element) {
            this.element = element;
            this.collapsible = false;
            this.width = '220px';
        }
        UISidebar.prototype.bind = function () {
            this.collapsible = this.element.hasAttribute('collapsible');
            if (!this.collapsible && this.element.hasAttribute('scroll'))
                this.__content.classList.add('ui-scroll');
        };
        UISidebar.prototype.attached = function () {
            var _this = this;
            if (this.element.hasAttribute('padded'))
                this.element.classList.add('ui-pad-all');
            if (this.collapsible)
                document.addEventListener('mousedown', this.__close = function (evt) { return _this.closeOverlay(evt); });
        };
        UISidebar.prototype.dettached = function () {
            if (this.collapsible)
                document.removeEventListener('mousedown', this.__close);
        };
        UISidebar.prototype.closeOverlay = function (evt) {
            if (getParentByClass(evt.target, 'ui-sidebar-content') === null)
                this.element.classList.remove('overlay');
        };
        UISidebar.prototype.toggleCollapse = function ($event) {
            this.element.classList.remove('overlay');
            this.element.classList.toggle('collapse');
            $event.cancelBubble = true;
            $event.preventDefault();
        };
        UISidebar.prototype.showOverlay = function () {
            if (this.element.classList.contains('collapse'))
                this.element.classList.toggle('overlay');
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UISidebar.prototype, "width", void 0);
        UISidebar = __decorate([
            aurelia_framework_1.customElement('ui-sidebar'),
            aurelia_framework_1.inlineView("<template class=\"ui-sidebar\" role=\"sidebar\" css.bind=\"{'width':width}\" click.trigger=\"showOverlay()\">\n<div class=\"ui-sidebar-collapse\" if.bind=\"collapsible\" click.trigger=\"toggleCollapse($event)\"><span class=\"fi-ui-arrow-left\"></span></div>\n<div class=\"ui-sidebar-content\" ref=\"__content\"><slot></slot></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UISidebar);
        return UISidebar;
    }());
    exports.UISidebar = UISidebar;
    var UIDivider = (function () {
        function UIDivider() {
        }
        UIDivider = __decorate([
            aurelia_framework_1.customElement('ui-divider'),
            aurelia_framework_1.inlineView('<template class="ui-divider" role="separator"><slot></slot></template>'), 
            __metadata('design:paramtypes', [])
        ], UIDivider);
        return UIDivider;
    }());
    exports.UIDivider = UIDivider;
    var UIToolbar = (function () {
        function UIToolbar(element) {
            this.element = element;
        }
        UIToolbar.prototype.fireSubmit = function () {
            ui_event_1.UIEvent.fireEvent('submit', this.element, this);
        };
        UIToolbar = __decorate([
            aurelia_framework_1.customElement('ui-toolbar'),
            aurelia_framework_1.inlineView("<template class=\"ui-toolbar ui-button-bar\" role=\"toolbar\" enterpressed.trigger=\"fireSubmit()\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIToolbar);
        return UIToolbar;
    }());
    exports.UIToolbar = UIToolbar;
    var UIStatsbar = (function () {
        function UIStatsbar() {
        }
        UIStatsbar = __decorate([
            aurelia_framework_1.customElement('ui-statsbar'),
            aurelia_framework_1.inlineView("<template class=\"ui-statsbar\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [])
        ], UIStatsbar);
        return UIStatsbar;
    }());
    exports.UIStatsbar = UIStatsbar;
    var UIStat = (function () {
        function UIStat() {
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIStat.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIStat.prototype, "icon", void 0);
        UIStat = __decorate([
            aurelia_framework_1.customElement('ui-stat'),
            aurelia_framework_1.inlineView('<template class="ui-stat"><span class="${icon}" if.bind="icon"></span><div><h1>${value}</h1><h6><slot></slot></h6></div></template>'), 
            __metadata('design:paramtypes', [])
        ], UIStat);
        return UIStat;
    }());
    exports.UIStat = UIStat;
    var UIMdView = (function () {
        function UIMdView(element) {
            this.element = element;
            this.type = 'html';
            if (element.hasAttribute('ts'))
                this.type = 'typescript';
        }
        UIMdView.prototype.attached = function () {
            this.element.innerHTML = ui_formatters_1.UIFormat.mdHilight('```' + this.type + '\n' + this.element.textContent.replace(/^\s{8,8}/gm, '') + '```');
        };
        UIMdView = __decorate([
            aurelia_framework_1.customElement('ui-md-view'),
            aurelia_framework_1.inlineView('<template class="ui-markdown"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIMdView);
        return UIMdView;
    }());
    exports.UIMdView = UIMdView;
});
