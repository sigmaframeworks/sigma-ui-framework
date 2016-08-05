var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_utils_1) {
    "use strict";
    var UIReorder = (function () {
        function UIReorder(element) {
            this.element = element;
            this.list = [];
            this.displayProperty = 'name';
            this.__startY = 0;
            this.__diff = 0;
            this.__top = 0;
        }
        UIReorder.prototype.startDrag = function (opt, $event) {
            var _this = this;
            if ($event.button != 0)
                return;
            this.ghostModel = opt;
            this.__dragEl = getParentByClass($event.target, 'ui-list-item', 'ui-list-group');
            this.__top = this.__diff = this.__dragEl.offsetTop;
            this.__dragEl.classList.add('dragging');
            this.__list = this.element.querySelectorAll('.ui-list-item');
            this.__startY = ($event.y || $event.clientY);
            document.addEventListener('mousemove', this.__move = function (e) { return _this.move(e); });
            document.addEventListener('mouseup', this.__stop = function (e) { return _this.stopDrag(e); });
        };
        UIReorder.prototype.move = function ($event) {
            var y = ($event.y || $event.clientY) - this.__startY;
            this.__startY = ($event.y || $event.clientY);
            this.__diff += y;
            var sh = this.__dragEl.offsetParent.scrollHeight;
            this.__top = this.__diff < 0 ? 0 : (this.__diff > sh ? sh : this.__diff);
            this.__dragEl.offsetParent.scrollTop = this.__top - (sh / 2);
            if (this.__top >= this.__dragEl.offsetTop + this.__dragEl.offsetHeight) {
                var next = this.__dragEl.nextSibling;
                if (next)
                    this.__dragEl.parentElement.insertBefore(next, this.__dragEl);
            }
            if (this.__top + this.__dragEl.offsetHeight <= this.__dragEl.offsetTop) {
                var prev = this.__dragEl.previousSibling;
                if (prev)
                    this.__dragEl.parentElement.insertBefore(this.__dragEl, prev);
            }
        };
        UIReorder.prototype.stopDrag = function ($event) {
            this.__dragEl.classList.remove('dragging');
            this.ghostModel = null;
            var list = this.element.querySelectorAll('.ui-list-item');
            var newList = [];
            ui_utils_1._.forEach(list, function (l) {
                if (l.model)
                    newList.push(l.model);
            });
            this.list = newList;
            document.removeEventListener('mousemove', this.__move);
            document.removeEventListener('mouseup', this.__stop);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Array)
        ], UIReorder.prototype, "list", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIReorder.prototype, "displayProperty", void 0);
        UIReorder = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-reorder'), 
            __metadata('design:paramtypes', [Element])
        ], UIReorder);
        return UIReorder;
    }());
    exports.UIReorder = UIReorder;
});
