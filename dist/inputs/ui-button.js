var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-event", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    var UIButton = (function () {
        function UIButton(element) {
            this.element = element;
            this.__size = 'normal';
            this.label = '';
            this.value = '';
            this.icon = '';
            this.theme = 'default';
            this.disabled = false;
            this.__hasMenu = false;
            this.__isDropdown = false;
        }
        UIButton.prototype.bind = function () {
            if (this.element.hasAttribute('primary'))
                this.theme = 'primary';
            if (this.element.hasAttribute('secondary'))
                this.theme = 'secondary';
            if (this.element.hasAttribute('info'))
                this.theme = 'info';
            if (this.element.hasAttribute('danger'))
                this.theme = 'danger';
            if (this.element.hasAttribute('success'))
                this.theme = 'success';
            if (this.element.hasAttribute('warning'))
                this.theme = 'warning';
            if (this.element.hasAttribute('small'))
                this.__size = 'small';
            if (this.element.hasAttribute('large'))
                this.__size = 'large';
            this.__hasMenu = this.element.hasAttribute('menu');
            this.__hasMenu = this.__useMenuLabel = this.element.hasAttribute('dropdown');
            this.disabled = isTrue(this.disabled);
        };
        UIButton.prototype.attached = function () {
            if (this.element.hasAttribute('icon-top'))
                this.__button.classList.add('ui-icon-top');
            if (this.element.hasAttribute('round'))
                this.__button.classList.add('ui-button-round');
            if (this.element.hasAttribute('square'))
                this.__button.classList.add('ui-button-square');
            this.__button.classList.add("ui-button-" + this.__size);
            if (this.value)
                this.valueChanged(this.value);
            this.disable();
        };
        UIButton.prototype.disable = function (disabled) {
            if (this.__button.attributes.getNamedItem('disabled') !== null) {
                this.__button.attributes.removeNamedItem('disabled');
            }
            if (disabled === true || this.disabled === true) {
                this.__button.attributes.setNamedItem(document.createAttribute('disabled'));
            }
        };
        UIButton.prototype.disabledChanged = function (newValue) {
            this.disabled = isTrue(newValue);
            this.disable();
        };
        UIButton.prototype.valueChanged = function (newValue) {
            if (this.__hasMenu && this.__useMenuLabel) {
                var menu = ui_utils_1._.find(this.__menuEl.menu, 'id', newValue);
                if (menu)
                    this.label = menu.text;
            }
        };
        UIButton.prototype.fireClick = function ($event) {
            var menu = document.querySelector('.ui-floating.show');
            if (menu)
                menu.classList.remove('show');
            $event.preventDefault();
            $event.cancelBubble = true;
            if (this.disabled === true)
                return false;
            if (this.__hasMenu) {
                this.__menuEl.element.classList.add('show');
            }
            else {
                ui_event_1.UIEvent.fireEvent('click', this.element, this);
            }
        };
        UIButton.prototype.menuClicked = function ($event) {
            var menu = document.querySelector('.ui-floating.show');
            if (menu)
                menu.classList.remove('show');
            if (this.__hasMenu && this.__useMenuLabel)
                this.label = $event.detail.text;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIButton.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIButton.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIButton.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIButton.prototype, "disabled", void 0);
        UIButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-button'), 
            __metadata('design:paramtypes', [Element])
        ], UIButton);
        return UIButton;
    }());
    exports.UIButton = UIButton;
    var UIButtonGroup = (function () {
        function UIButtonGroup(element) {
            this.element = element;
            this.__size = 'normal';
            this.__theme = 'default';
            this.__extraClass = '';
            this.toggle = false;
            this.disabled = false;
        }
        UIButtonGroup.prototype.bind = function () {
            if (this.element.hasAttribute('primary'))
                this.__theme = 'primary';
            if (this.element.hasAttribute('info'))
                this.__theme = 'info';
            if (this.element.hasAttribute('danger'))
                this.__theme = 'danger';
            if (this.element.hasAttribute('success'))
                this.__theme = 'success';
            if (this.element.hasAttribute('warning'))
                this.__theme = 'warning';
            if (this.element.hasAttribute('small'))
                this.__size = 'small';
            if (this.element.hasAttribute('large'))
                this.__size = 'large';
            if (this.element.hasAttribute('top'))
                this.__extraClass += ' ui-icon-top';
            if (this.element.hasAttribute('round')) {
                this.__extraClass += ' ui-button-round';
            }
            else if (this.element.hasAttribute('square'))
                this.__extraClass += ' ui-button-square';
            if (this.element.hasAttribute('vertical'))
                this.element.classList.add('ui-vertical');
            this.disabled = isTrue(this.disabled);
        };
        UIButtonGroup.prototype.attached = function () {
            var _this = this;
            if (this.toggle !== false) {
                this.element.classList.add("ui-button-group-" + this.__theme);
                this.__theme = 'default';
            }
            var buttons = this.element.getElementsByClassName('ui-button');
            ui_utils_1._.forEach(buttons, function (b) {
                b.className = "ui-button ui-button-" + _this.__theme + " ui-button-" + _this.__size + " " + _this.__extraClass;
            });
            if (this.toggle !== false) {
                if (!isEmpty(this.value)) {
                    setTimeout(function () {
                        ui_utils_1._.forEach((_this.value + '').split(','), function (v) {
                            var opt = _this.element.querySelector(".ui-button[data-value=\"" + v + "\"]");
                            if (opt)
                                opt.classList.add('ui-checked');
                        });
                    }, 10);
                }
            }
        };
        UIButtonGroup.prototype.disable = function (disabled) {
            var _this = this;
            var buttons = this.element.getElementsByClassName('ui-button');
            ui_utils_1._.forEach(buttons, function (b) {
                if (b.attributes.getNamedItem('disabled') !== null) {
                    b.attributes.removeNamedItem('disabled');
                }
                if (disabled === true || _this.disabled === true) {
                    b.attributes.setNamedItem(document.createAttribute('disabled'));
                }
            });
        };
        UIButtonGroup.prototype.disabledChanged = function (newValue) {
            this.disabled = isTrue(newValue);
            this.disable();
        };
        UIButtonGroup.prototype.toggleChanged = function (newValue) {
            this.value = '';
        };
        UIButtonGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.toggle !== false) {
                ui_utils_1._.forEach(this.element.querySelectorAll(".ui-button.ui-checked"), function (b) { return b.classList.remove('ui-checked'); });
                ui_utils_1._.forEach((newValue + '').split(','), function (v) {
                    var opt = _this.element.querySelector(".ui-button[data-value=\"" + v + "\"]");
                    if (opt)
                        opt.classList.add('ui-checked');
                });
            }
        };
        UIButtonGroup.prototype.fireChange = function ($event) {
            $event.preventDefault();
            $event.cancelBubble = true;
            if (this.disabled === true)
                return false;
            if (this.toggle !== false) {
                if (isEmpty($event.detail.value))
                    return false;
                if (this.toggle === 'multiple') {
                    var v = $event.detail.value;
                    var a = isEmpty(this.value) ? [] : (this.value + '').split(',');
                    if (a.indexOf(v) == -1) {
                        a.push(v);
                    }
                    else {
                        a.splice(a.indexOf(v), 1);
                    }
                    this.value = a.join(',');
                }
                else {
                    this.value = $event.detail.value;
                }
                ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIButtonGroup.prototype, "toggle", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIButtonGroup.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIButtonGroup.prototype, "value", void 0);
        UIButtonGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-button-group'),
            aurelia_framework_1.inlineView('<template class="ui-button-group" click.delegate="fireChange($event)"><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIButtonGroup);
        return UIButtonGroup;
    }());
    exports.UIButtonGroup = UIButtonGroup;
});
