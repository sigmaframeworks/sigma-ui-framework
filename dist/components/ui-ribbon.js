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
    var UIRibbon = (function () {
        function UIRibbon(element) {
            this.element = element;
            this.__theme = 'default';
            this.__posH = 'r';
            this.__posV = 't';
            if (element.hasAttribute('primary'))
                this.__theme = 'primary';
            if (element.hasAttribute('secondary'))
                this.__theme = 'secondary';
            if (element.hasAttribute('info'))
                this.__theme = 'info';
            if (element.hasAttribute('danger'))
                this.__theme = 'danger';
            if (element.hasAttribute('success'))
                this.__theme = 'success';
            if (element.hasAttribute('warning'))
                this.__theme = 'warning';
            if (element.hasAttribute('top'))
                this.__posV = 't';
            if (element.hasAttribute('bottom'))
                this.__posV = 'b';
            if (element.hasAttribute('left'))
                this.__posH = 'l';
            if (element.hasAttribute('right'))
                this.__posH = 'r';
        }
        UIRibbon.prototype.attached = function () {
            this.element.classList.add("ui-" + this.__posV + this.__posH);
            this.__ribbon.classList.add("ui-ribbon-" + this.__theme);
        };
        UIRibbon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-ribbon'), 
            __metadata('design:paramtypes', [Element])
        ], UIRibbon);
        return UIRibbon;
    }());
    exports.UIRibbon = UIRibbon;
});
