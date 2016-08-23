var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "../utils/ui-event", "../utils/ui-application"], function (require, exports, aurelia_framework_1, aurelia_router_1, ui_event_1, ui_application_1) {
    "use strict";
    var UIMenu = (function () {
        function UIMenu(element, appState) {
            this.element = element;
            this.appState = appState;
            this.children = [];
            this.menu = [];
            this.hideTitle = false;
            if (element.hasAttribute('floating'))
                element.classList.add('ui-floating');
            this.hideTitle = element.hasAttribute('hide-title');
        }
        UIMenu.prototype.childrenChanged = function (newValue) {
            this.menu = [];
            for (var i = 0, c = this.children; i < c.length; i++) {
                if (c[i].tagName.toLowerCase() === 'menu') {
                    this.menu.push({
                        id: c[i].getAttribute('id'),
                        text: c[i].textContent,
                        icon: c[i].getAttribute('icon'),
                        disabled: isTrue(c[i].getAttribute('disabled')),
                        isActive: isTrue(c[i].getAttribute('active')),
                        href: c[i].getAttribute('href') || 'javascript:;',
                    });
                }
                if (c[i].tagName.toLowerCase() === 'section')
                    this.menu.push(c[i].textContent);
                if (c[i].tagName.toLowerCase() === 'divider')
                    this.menu.push('-');
            }
        };
        UIMenu.prototype.isActive = function (route) {
            return route.isActive || route.href == location.hash ||
                location.hash.indexOf(route.config.redirect || 'QWER') > -1;
        };
        UIMenu.prototype.onClick = function ($event) {
            $event.stopPropagation();
            if (this.router) {
                return true;
            }
            $event.cancelBubble = true;
            this.element.classList.remove('show');
            var link = getParentByClass($event.target, 'ui-menu-link', 'ui-menu');
            if (link !== null)
                ui_event_1.UIEvent.fireEvent('menuclick', this.element, { id: link.dataset['id'], text: link.dataset['text'] });
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', aurelia_router_1.Router)
        ], UIMenu.prototype, "router", void 0);
        __decorate([
            aurelia_framework_1.children('.ui-hidden menu,.ui-hidden divider,.ui-hidden section'), 
            __metadata('design:type', Array)
        ], UIMenu.prototype, "children", void 0);
        UIMenu = __decorate([
            aurelia_framework_1.customElement('ui-menu'), 
            __metadata('design:paramtypes', [Element, ui_application_1.UIApplication])
        ], UIMenu);
        return UIMenu;
    }());
    exports.UIMenu = UIMenu;
});
