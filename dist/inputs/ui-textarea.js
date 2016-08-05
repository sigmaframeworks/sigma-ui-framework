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
define(["require", "exports", "aurelia-framework", "./ui-input-group", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_input_group_1, ui_utils_1) {
    "use strict";
    var UITextArea = (function (_super) {
        __extends(UITextArea, _super);
        function UITextArea(element) {
            _super.call(this, element);
            this.value = '';
            this.checked = false;
            this.disabled = false;
            this.readonly = false;
            this.placeholder = '';
            this.rows = '5';
            this.dir = '';
            this.properties = [
                'direction',
                'boxSizing',
                'width',
                'height',
                'overflowX',
                'overflowY',
                'borderTopWidth',
                'borderRightWidth',
                'borderBottomWidth',
                'borderLeftWidth',
                'borderStyle',
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft',
                'fontStyle',
                'fontVariant',
                'fontWeight',
                'fontStretch',
                'fontSize',
                'fontSizeAdjust',
                'lineHeight',
                'fontFamily',
                'textAlign',
                'textTransform',
                'textIndent',
                'textDecoration',
                'letterSpacing',
                'wordSpacing',
                'tabSize',
                'MozTabSize'
            ];
            this.isBrowser = (typeof window !== 'undefined');
            this.isFirefox = (this.isBrowser && window['mozInnerScreenX'] != null);
        }
        UITextArea.prototype.bind = function () {
            _super.prototype.bind.call(this);
            if (!isEmpty(this.autoComplete))
                this.autoCompleteChanged(this.autoComplete);
        };
        UITextArea.prototype.attached = function () {
            var _this = this;
            _super.prototype.attached.call(this);
            if (!isEmpty(this.autoComplete)) {
                this.__input.onkeyup = function (evt) { return _this.showList(evt); };
                this.__acRegExp = eval("/\\b([" + this.ALPHA + this.DIGIT + "]{1,})$/");
                this.__listCss = {
                    top: 0, left: 0, right: 'auto', width: '200px', 'max-height': '400px'
                };
            }
        };
        UITextArea.prototype.showList = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13) {
                return false;
            }
            var text = this.__input.value.substring(0, this.__input.selectionEnd);
            var query = text.match(this.__acRegExp);
            this.__focus = false;
            if (query !== null) {
                var rx = new RegExp(ui_utils_1.UIUtils.getAscii(query[1]), 'i');
                this.__autoComplete = ui_utils_1._.filter(this.autoComplete, function (v) {
                    var asc = ui_utils_1.UIUtils.getAscii(v);
                    return rx.test(asc);
                });
                var pos = this.getCaretCoordinates();
                this.__listCss = Object.assign(this.__listCss, pos);
                this.__focus = this.__autoComplete.length > 0;
            }
            return true;
        };
        UITextArea.prototype.autoCompleteChanged = function (newValue) {
            if (ui_utils_1._.isString(newValue))
                newValue = newValue.split(',');
            this.autoComplete = newValue.sort();
        };
        UITextArea.prototype.keyDown = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13 && this.__focus) {
                var h = this.__list.querySelector('.ui-list-item.hilight');
                if (h !== null)
                    this.__replace(h.dataset.value);
                this.__focus = false;
                return false;
            }
            if (code === 38) {
                var h = this.__list.querySelector('.ui-list-item.hilight');
                if (h !== null)
                    h = h.previousElementSibling;
                if (h === null)
                    h = this.__list.querySelector('.ui-list-item');
                if (h != null) {
                    if (h !== null) {
                        if (this.__hilight != null)
                            this.__hilight.classList.remove('hilight');
                        (this.__hilight = h).classList.add('hilight');
                        this.__scrollIntoView();
                    }
                }
                evt.preventDefault();
                return false;
            }
            else if (code === 40) {
                var h = this.__list.querySelector('.ui-list-item.hilight');
                if (h !== null)
                    h = h.nextElementSibling;
                if (h === null)
                    h = this.__list.querySelector('.ui-list-item');
                if (h !== null) {
                    if (this.__hilight != null)
                        this.__hilight.classList.remove('hilight');
                    (this.__hilight = h).classList.add('hilight');
                    this.__scrollIntoView();
                }
                evt.preventDefault();
                return false;
            }
            return true;
        };
        UITextArea.prototype.__replace = function (selected) {
            var pre = this.__input.value.substring(0, this.__input.selectionEnd);
            var post = this.__input.value.substring(this.__input.selectionEnd);
            pre = pre.replace(this.__acRegExp, ' ' + selected);
            this.__value = (pre + post).replace(/\s{2,}/g, ' ');
            this.__input.selectionStart = this.__input.selectionEnd = pre.length;
        };
        UITextArea.prototype.__clicked = function ($event) {
            if ($event.button !== 0)
                return true;
            var o = getParentByClass($event.target, 'ui-list-item', 'ui-list');
            if (o !== null) {
                this.__replace(o.dataset.value);
                this.__focus = false;
            }
        };
        UITextArea.prototype.__scrollIntoView = function () {
            this.__list.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.__list.offsetHeight / 2) : 0);
        };
        UITextArea.prototype.getCaretCoordinates = function () {
            var element = this.__input;
            var position = this.__input.selectionStart;
            if (!this.isBrowser) {
                throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
            }
            var debug = false;
            if (debug) {
                var el = document.querySelector('#input-textarea-caret-position-mirror-div');
                if (el) {
                    el.parentNode.removeChild(el);
                }
            }
            var div = document.createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            document.body.appendChild(div);
            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT')
                style.wordWrap = 'break-word';
            style.position = 'absolute';
            if (!debug)
                style.visibility = 'hidden';
            ui_utils_1._.forEach(this.properties, function (prop) {
                style[prop] = computed[prop];
            });
            if (this.isFirefox) {
                if (element.scrollHeight > parseInt(computed.height))
                    style.overflowY = 'scroll';
            }
            else {
                style.overflow = 'hidden';
            }
            div.textContent = element.value.substring(0, position);
            if (element.nodeName === 'INPUT')
                div.textContent = div.textContent.replace(/\s/g, '\u00a0');
            var span = document.createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);
            var coordinates = {
                top: (span.offsetTop + parseInt(computed['borderTopWidth']) + 20) + 'px',
                left: (span.offsetLeft + parseInt(computed['borderLeftWidth'])) + 'px'
            };
            if (debug) {
                span.style.backgroundColor = '#aaa';
            }
            else {
                document.body.removeChild(div);
            }
            return coordinates;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UITextArea.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UITextArea.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UITextArea.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "prefixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "prefixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "suffixIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "suffixText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "buttonText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UITextArea.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextArea.prototype, "autoComplete", void 0);
        UITextArea = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-textarea'), 
            __metadata('design:paramtypes', [Element])
        ], UITextArea);
        return UITextArea;
    }(ui_input_group_1.UIInputGroup));
    exports.UITextArea = UITextArea;
});
