var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "kramed"], function (require, exports, aurelia_framework_1, kramed) {
    "use strict";
    var UIMarkdownView = (function () {
        function UIMarkdownView(element, taskQueue) {
            this.element = element;
            this.taskQueue = taskQueue;
        }
        UIMarkdownView.prototype.attached = function () {
            var _this = this;
            this.taskQueue.queueMicroTask(function () {
                _this.element.parentElement.classList.add('ui-markdown');
                var code = _this.element.textContent;
                var len = code.match(/^[ \t]*/)[0].length;
                code = code.replace(new RegExp("^[ \\t]{" + len + "," + len + "}", 'gm'), '');
                _this.element.parentElement.innerHTML = kramed(code, kramed.defaults);
            });
        };
        UIMarkdownView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('markdown'), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.TaskQueue])
        ], UIMarkdownView);
        return UIMarkdownView;
    }());
    exports.UIMarkdownView = UIMarkdownView;
});
