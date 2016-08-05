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
    var UIFileInput = (function () {
        function UIFileInput(element) {
            this.element = element;
            this.fileTypes = '';
            this.__files = [];
            this.__dragging = false;
            if (this.element.hasAttribute('auto-width'))
                this.element.classList.add('ui-auto');
            if (this.element.hasAttribute('label-top'))
                this.element.classList.add('ui-label-top');
            if (this.element.hasAttribute('label-hide'))
                this.element.classList.add('ui-label-hide');
        }
        UIFileInput.prototype.attached = function () {
            this.__input.draggedFiles = this.__files;
        };
        UIFileInput.prototype.__dragEnter = function ($event) {
            this.__dragging = true;
            $event.preventDefault();
            return false;
        };
        UIFileInput.prototype.__dragExit = function ($event) {
            this.__dragging = false;
        };
        UIFileInput.prototype.__drop = function ($event) {
            this.__dragging = false;
            $event.preventDefault();
            var dt = $event.dataTransfer;
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.filetypes[files[i].type] || 'txt' };
                this.__files.push(f);
            }
        };
        UIFileInput.prototype.__fileChoose = function () {
            var files = this.__input.files;
            for (var i = 0; i < files.length; i++) {
                var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.filetypes[files[i].type] || 'txt' };
                this.__files.push(f);
            }
        };
        UIFileInput.prototype.__remove = function (index) {
            this.__files.splice(index, 1);
        };
        UIFileInput.FILE_IMAGES = 'png,jpg,jpeg,tiff';
        UIFileInput.FILE_DOCS = 'doc,docx,xls,xlsx,ppt,pptx,csv,rtf,txt,pdf';
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIFileInput.prototype, "fileTypes", void 0);
        UIFileInput = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement('ui-file'), 
            __metadata('design:paramtypes', [Element])
        ], UIFileInput);
        return UIFileInput;
    }());
    exports.UIFileInput = UIFileInput;
});
