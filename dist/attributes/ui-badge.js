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
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var UIBadgeBase = (function () {
        function UIBadgeBase(element, bg) {
            this.__el = document.createElement('div');
            this.__el.classList.add('ui-badge');
            this.__el.classList.add('ui-hidden');
            this.__el.classList.add(bg);
            if (element.nodeType == Node.ELEMENT_NODE)
                element.appendChild(this.__el);
            if (element.nodeType == Node.COMMENT_NODE)
                element.previousSibling.appendChild(this.__el);
        }
        UIBadgeBase.prototype.valueChanged = function (newValue) {
            this.__el.classList[newValue ? 'remove' : 'add']('ui-hidden');
            this.__el.innerHTML = newValue;
        };
        return UIBadgeBase;
    }());
    exports.UIBadgeBase = UIBadgeBase;
    var UIBadge = (function (_super) {
        __extends(UIBadge, _super);
        function UIBadge(element) {
            _super.call(this, element, 'ui-bg-dark');
            this.element = element;
        }
        UIBadge = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge'), 
            __metadata('design:paramtypes', [Element])
        ], UIBadge);
        return UIBadge;
    }(UIBadgeBase));
    exports.UIBadge = UIBadge;
    var UIBadgePrimary = (function (_super) {
        __extends(UIBadgePrimary, _super);
        function UIBadgePrimary(element) {
            _super.call(this, element, 'ui-bg-primary');
            this.element = element;
        }
        UIBadgePrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-primary'), 
            __metadata('design:paramtypes', [Element])
        ], UIBadgePrimary);
        return UIBadgePrimary;
    }(UIBadgeBase));
    exports.UIBadgePrimary = UIBadgePrimary;
    var UIBadgeInfo = (function (_super) {
        __extends(UIBadgeInfo, _super);
        function UIBadgeInfo(element) {
            _super.call(this, element, 'ui-bg-info');
            this.element = element;
        }
        UIBadgeInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-info'), 
            __metadata('design:paramtypes', [Element])
        ], UIBadgeInfo);
        return UIBadgeInfo;
    }(UIBadgeBase));
    exports.UIBadgeInfo = UIBadgeInfo;
    var UIBadgeDanger = (function (_super) {
        __extends(UIBadgeDanger, _super);
        function UIBadgeDanger(element) {
            _super.call(this, element, 'ui-bg-danger');
            this.element = element;
        }
        UIBadgeDanger = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-danger'), 
            __metadata('design:paramtypes', [Element])
        ], UIBadgeDanger);
        return UIBadgeDanger;
    }(UIBadgeBase));
    exports.UIBadgeDanger = UIBadgeDanger;
    var UIBadgeSuccess = (function (_super) {
        __extends(UIBadgeSuccess, _super);
        function UIBadgeSuccess(element) {
            _super.call(this, element, 'ui-bg-success');
            this.element = element;
        }
        UIBadgeSuccess = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-success'), 
            __metadata('design:paramtypes', [Element])
        ], UIBadgeSuccess);
        return UIBadgeSuccess;
    }(UIBadgeBase));
    exports.UIBadgeSuccess = UIBadgeSuccess;
    var UIBadgeWarning = (function (_super) {
        __extends(UIBadgeWarning, _super);
        function UIBadgeWarning(element) {
            _super.call(this, element, 'ui-bg-warning');
            this.element = element;
        }
        UIBadgeWarning = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-warning'), 
            __metadata('design:paramtypes', [Element])
        ], UIBadgeWarning);
        return UIBadgeWarning;
    }(UIBadgeBase));
    exports.UIBadgeWarning = UIBadgeWarning;
});
