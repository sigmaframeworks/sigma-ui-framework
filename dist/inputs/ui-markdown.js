var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-input-group"], function (require, exports, aurelia_framework_1, ui_input_group_1) {
    "use strict";
    var UIMarkdown = (function (_super) {
        __extends(UIMarkdown, _super);
        function UIMarkdown(element) {
            _super.call(this, element);
            this.value = '';
            this.disabled = false;
            this.readonly = false;
            this.placeholder = '';
            this.dir = '';
            this.rows = '10';
        }
        UIMarkdown.prototype.bind = function () {
            _super.prototype.bind.call(this);
            if (this.element.hasAttribute('full-view'))
                this.element.classList.add('ui-full-view');
            if (this.element.hasAttribute('side-view')) {
                this.__hidePreview = true;
                this.element.classList.add('ui-full-view');
                this.element.classList.add('ui-side-view');
            }
        };
        UIMarkdown.prototype.disable = function (disabled) {
            _super.prototype.disable.call(this, disabled);
            this.__disableTools = isTrue(disabled) || !this.__help.classList.contains('ui-hide') || !this.__preview.classList.contains('ui-hide');
        };
        UIMarkdown.prototype.toolClick = function ($event) {
            var tool = getParentByTag($event.target, 'button');
            if (tool === null)
                return;
            var id = tool.dataset['id'];
            var start = this.__input.selectionStart, end = this.__input.selectionEnd, sub = (this.value || '').substr(start, end - start) || 'EditThis';
            var diff = 0;
            if (id == 'preview') {
                this.__toggle('preview');
            }
            else if (id == 'help') {
                this.__toggle('help');
            }
            else if (!this.disabled && !this.readonly) {
                if (id == 'h1') {
                    diff = 3;
                    this.value = this.value.substr(0, start) + ("# " + sub + "\n\n") + this.value.substr(end);
                }
                else if (id == 'h2') {
                    diff = 4;
                    this.value = this.value.substr(0, start) + ("## " + sub + "\n\n") + this.value.substr(end);
                }
                else if (id == 'h3') {
                    diff = 5;
                    this.value = this.value.substr(0, start) + ("### " + sub + "\n\n") + this.value.substr(end);
                }
                else if (id == 'h4') {
                    diff = 6;
                    this.value = this.value.substr(0, start) + ("#### " + sub + "\n\n") + this.value.substr(end);
                }
                else if (id == 'h5') {
                    diff = 7;
                    this.value = this.value.substr(0, start) + ("##### " + sub + "\n\n") + this.value.substr(end);
                }
                else if (id == 'h6') {
                    diff = 8;
                    this.value = this.value.substr(0, start) + ("###### " + sub + "\n\n") + this.value.substr(end);
                }
                else if (id == 'b') {
                    diff = 2;
                    this.value = this.value.substr(0, start) + (" __" + sub + "__ ") + this.value.substr(end);
                }
                else if (id == 'i') {
                    diff = 1;
                    this.value = this.value.substr(0, start) + (" _" + sub + "_ ") + this.value.substr(end);
                }
                else if (id == 's') {
                    diff = 2;
                    this.value = this.value.substr(0, start) + (" ~~" + sub + "~~ ") + this.value.substr(end);
                }
                else if (id == 'a') {
                    diff = 1;
                    this.value = this.value.substr(0, start) + (" [" + sub + "](Place_Url_Here) ") + this.value.substr(end);
                }
                else if (id == 'img') {
                    diff = 2;
                    this.value = this.value.substr(0, start) + (" ![" + sub + "](Place_Url_Here) ") + this.value.substr(end);
                }
                else if (id == 'ul') {
                    diff = 1;
                    sub = sub.replace(/^.+$/gm, function (t) { return ("* " + t); });
                    this.value = this.value.substr(0, start) + (sub + "\n") + this.value.substr(end);
                }
                else if (id == 'ol') {
                    diff = 1;
                    var i = 1;
                    sub = sub.replace(/^.+$/gm, function (t) { return ((i++ == 1 ? '1.' : '*') + " " + t); });
                    this.value = this.value.substr(0, start) + (sub + "\n") + this.value.substr(end);
                }
                if (id != 'preview' && id != 'help') {
                    this.__input.focus();
                    this.__input.selectionStart = start + diff;
                    this.__input.selectionEnd = start + diff + sub.length;
                }
            }
        };
        UIMarkdown.prototype.__toggle = function (type) {
            if (type == 'close') {
                this.__help.classList.add('ui-hide');
                this.__close.classList.add('ui-hide');
                this.__preview.classList.add('ui-hide');
            }
            else if (type == 'help') {
                this.__help.classList.toggle('ui-hide');
                this.__preview.classList.add('ui-hide');
                this.__disableTools = isTrue(this.disabled) || !this.__help.classList.contains('ui-hide');
            }
            else if (type == 'preview') {
                this.__help.classList.add('ui-hide');
                this.__preview.classList.toggle('ui-hide');
                this.__disableTools = isTrue(this.disabled) || !this.__preview.classList.contains('ui-hide');
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIMarkdown.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIMarkdown.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIMarkdown.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIMarkdown.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIMarkdown.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIMarkdown.prototype, "rows", void 0);
        UIMarkdown = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-markdown'), 
            __metadata('design:paramtypes', [Element])
        ], UIMarkdown);
        return UIMarkdown;
    }(ui_input_group_1.UIInputGroup));
    exports.UIMarkdown = UIMarkdown;
});
