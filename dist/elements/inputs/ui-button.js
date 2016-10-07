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
    var UIButton = (function () {
        function UIButton(element) {
            this.element = element;
            this.icon = '';
            this.label = '';
            this.class = '';
            this.disabled = false;
        }
        UIButton.prototype.bind = function () {
            if (this.element.hasAttribute('primary'))
                this.__button.classList.add('ui-button-primary');
            else if (this.element.hasAttribute('secondary'))
                this.__button.classList.add('ui-button-secondary');
            else if (this.element.hasAttribute('dark'))
                this.__button.classList.add('ui-button-dark');
            else if (this.element.hasAttribute('info'))
                this.__button.classList.add('ui-button-info');
            else if (this.element.hasAttribute('danger'))
                this.__button.classList.add('ui-button-danger');
            else if (this.element.hasAttribute('success'))
                this.__button.classList.add('ui-button-success');
            else if (this.element.hasAttribute('warning'))
                this.__button.classList.add('ui-button-warning');
            else
                this.__button.classList.add('ui-button-default');
            if (this.element.hasAttribute('icon-top'))
                this.__button.classList.add('ui-icon-top');
            if (this.element.hasAttribute('big'))
                this.__button.classList.add('ui-big');
            if (this.element.hasAttribute('small'))
                this.__button.classList.add('ui-small');
            if (this.element.hasAttribute('square'))
                this.__button.classList.add('ui-square');
            if (this.element.hasAttribute('round'))
                this.__button.classList.add('ui-round');
            this.disabled = isTrue(this.disabled);
        };
        UIButton.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                ui_event_1.UIEvent.subscribe('mouseclick', function () {
                    _this.__button.classList.remove('ui-open');
                    _this.dropdown.classList.add('ui-hidden');
                });
                this.__button.classList.add('ui-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.dropdown.classList.add('ui-hidden');
                this.__tether = new Tether({
                    element: this.dropdown,
                    target: this.__button,
                    attachment: 'top left',
                    targetAttachment: 'bottom left',
                    constraints: [
                        {
                            to: 'scrollParent',
                            attachment: 'together'
                        }
                    ],
                    optimizations: {
                        gpu: false,
                        moveElement: false
                    }
                });
            }
        };
        UIButton.prototype.unbind = function () {
            if (this.__tether)
                this.__tether.destroy();
        };
        UIButton.prototype.click = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                this.dropdown.style.minWidth = this.__button.offsetWidth + 'px';
                if (this.dropdown.classList.contains('ui-hidden')) {
                    this.__button.classList.add('ui-open');
                    this.dropdown.classList.remove('ui-hidden');
                    this.__tether.position();
                }
                else {
                    this.__button.classList.remove('ui-open');
                    this.dropdown.classList.add('ui-hidden');
                }
            }
            var e = aurelia_framework_1.DOM.createCustomEvent('click', { bubbles: true, cancelable: true });
            return this.element.dispatchEvent(e);
        };
        UIButton.prototype.disabledChanged = function (newValue) {
            this.disabled = isTrue(newValue);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIButton.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIButton.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIButton.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIButton.prototype, "disabled", void 0);
        UIButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-button'),
            aurelia_framework_1.inlineView("<template><button ref=\"__button\" class=\"ui-button ${class} ${disabled?'ui-disabled':''}\" click.trigger=\"click($event)\">\n    <span if.bind=\"icon\" class=\"fi-ui ${icon}\"></span><span class=\"ui-label\"><slot>${label}</slot></span></button></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIButton);
        return UIButton;
    }());
    exports.UIButton = UIButton;
});
