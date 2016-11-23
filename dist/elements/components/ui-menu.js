var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "tether"], function (require, exports, aurelia_framework_1, ui_event_1, Tether) {
    "use strict";
    var UIMenubar = (function () {
        function UIMenubar(element) {
            var _this = this;
            this.element = element;
            this.__isOverflow = false;
            ui_event_1.UIEvent.subscribe('appready', function () { return _this.arrange(); });
        }
        UIMenubar.prototype.attached = function () {
            var _this = this;
            this.__obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
            this.__obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.__overflow.classList.add('ui-hidden'); });
            window.setTimeout(function () { return _this.arrange(); }, 500);
            this.__tether = new Tether({
                element: this.__overflow,
                target: this.element,
                attachment: 'top right',
                targetAttachment: 'bottom right',
                offset: '0 10px',
                constraints: [
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ],
                optimizations: {
                    moveElement: false
                }
            });
        };
        UIMenubar.prototype.detached = function () {
            this.__tether.destroy();
            this.__obClick.dispose();
            this.__obResize.dispose();
            aurelia_framework_1.DOM.removeNode(this.__overflow);
        };
        UIMenubar.prototype.arrange = function () {
            this.__overflow.classList.add('ui-hidden');
            for (var i = 0, c = this.__overflow['children']; i < c.length; i++) {
                this.__wrapper.appendChild(c[i]);
            }
            if (this.__isOverflow = (this.__wrapper.lastElementChild.offsetLeft + this.__wrapper.lastElementChild.offsetWidth > this.__wrapper.offsetWidth)) {
                for (var c = this.__wrapper['children'], i = c.length - 1; i >= 0; i--) {
                    if (c[i].offsetLeft + c[i].offsetWidth > this.__wrapper.offsetWidth) {
                        if (this.__overflow.hasChildNodes)
                            this.__overflow.insertBefore(c[i], this.__overflow.childNodes[0]);
                        else
                            this.__overflow.appendChild(c[i]);
                    }
                }
            }
        };
        UIMenubar.prototype.showOverflow = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.__overflow.classList.contains('ui-hidden')) {
                this.__overflow.classList.remove('ui-hidden');
                this.__tether.position();
            }
            else
                this.__overflow.classList.add('ui-hidden');
        };
        UIMenubar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-menubar'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-menubar\">\n  <div class=\"ui-menubar-wrapper\" ref=\"__wrapper\"><slot></slot></div>\n  <div class=\"ui-menubar-overflow\" ref=\"__overflowToggle\" show.bind=\"__isOverflow\" click.trigger=\"showOverflow($event)\"><span class=\"fi-ui-overflow\"></span></div>\n  <div class=\"ui-hidden\"><div class=\"ui-menu ui-floating\" ref=\"__overflow\"></div></div>\n</template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIMenubar);
        return UIMenubar;
    }());
    exports.UIMenubar = UIMenubar;
    var UIMenu = (function () {
        function UIMenu(element) {
            this.element = element;
        }
        UIMenu = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-menu'),
            aurelia_framework_1.inlineView('<template class="ui-menu"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIMenu);
        return UIMenu;
    }());
    exports.UIMenu = UIMenu;
    var UIMenuGroup = (function () {
        function UIMenuGroup(element) {
            this.element = element;
            this.label = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIMenuGroup.prototype, "label", void 0);
        UIMenuGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-menu-group'),
            aurelia_framework_1.inlineView('<template class="ui-menu-section"><div class="ui-menu-section-title" innerhtml.bind="label"></div><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIMenuGroup);
        return UIMenuGroup;
    }());
    exports.UIMenuGroup = UIMenuGroup;
    var UIMenuSection = (function () {
        function UIMenuSection(element) {
            this.element = element;
        }
        UIMenuSection = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-menu-section'),
            aurelia_framework_1.inlineView('<template class="ui-menu-section-title"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIMenuSection);
        return UIMenuSection;
    }());
    exports.UIMenuSection = UIMenuSection;
    var UIMenuDivider = (function () {
        function UIMenuDivider(element) {
            this.element = element;
        }
        UIMenuDivider = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-menu-divider'),
            aurelia_framework_1.inlineView('<template class="ui-menu-divider"></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIMenuDivider);
        return UIMenuDivider;
    }());
    exports.UIMenuDivider = UIMenuDivider;
    var UIMenuLink = (function () {
        function UIMenuLink(element) {
            this.element = element;
            this.icon = '';
            this.class = '';
            this.active = false;
            this.disabled = false;
            this.href = 'javascript:void(0)';
        }
        UIMenuLink.prototype.bind = function () {
            this.active = isTrue(this.active);
            this.disabled = isTrue(this.disabled);
        };
        UIMenuLink.prototype.click = function (evt) {
            if (evt.button != 0)
                return true;
            evt.cancelBubble = true;
            evt.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('click', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIMenuLink.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIMenuLink.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIMenuLink.prototype, "active", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIMenuLink.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIMenuLink.prototype, "href", void 0);
        UIMenuLink = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-menu-item'),
            aurelia_framework_1.inlineView("<template><a class=\"ui-menu-item ${active?'ui-active':''} ${disabled?'ui-disabled':''} ${class}\" href.bind=\"href\" click.trigger=\"click($event)\">\n    <span if.bind=\"icon\" class=\"ui-menu-icon fi-ui ${icon}\"></span><span class=\"ui-menu-label\"><slot></slot></span></a></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIMenuLink);
        return UIMenuLink;
    }());
    exports.UIMenuLink = UIMenuLink;
});
