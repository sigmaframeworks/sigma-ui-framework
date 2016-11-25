var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "lodash", "tether"], function (require, exports, aurelia_framework_1, ui_event_1, _, Tether) {
    "use strict";
    var UIForm = (function () {
        function UIForm(element) {
            this.element = element;
            this.class = '';
        }
        UIForm.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var el = _this.element.querySelector('.ui-input');
                if (el !== null)
                    el.focus();
                if (_this.busy)
                    _this.busyChanged(true);
            });
        };
        UIForm.prototype.busyChanged = function (newValue) {
            var els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list');
            _.forEach(els, function (el) {
                try {
                    el.au.controller.viewModel.disable(isTrue(newValue));
                }
                catch (e) {
                }
            });
        };
        UIForm.prototype.fireSubmit = function () {
            ui_event_1.UIEvent.fireEvent('submit', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UIForm.prototype, "busy", void 0);
        UIForm = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-form'),
            aurelia_framework_1.inlineView("<template><form class=\"ui-form ${class}\" validation-renderer=\"ui-validator\" enterpressed.trigger=\"fireSubmit()\" submit.trigger=\"return false\"><slot></slot></form></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIForm);
        return UIForm;
    }());
    exports.UIForm = UIForm;
    var UIFieldset = (function () {
        function UIFieldset(element) {
            this.element = element;
            this.class = '';
            this.legend = '';
            this.enabled = true;
            this.__collapsable = element.hasAttribute('collapsable');
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIFieldset.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIFieldset.prototype, "legend", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIFieldset.prototype, "enabled", void 0);
        UIFieldset = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-fieldset'),
            aurelia_framework_1.inlineView("<template><fieldset class=\"ui-fieldset ${class} ${enabled?'':'ui-collapse'}\">\n  <legend if.bind=\"legend || __collapsable\">\n  <ui-checkbox if.bind=\"__collapsable\" checked.bind=\"enabled\">${legend}</ui-checkbox><span if.bind=\"!__collapsable\">${legend}</span></legend>\n  <div class=\"ui-fieldset-wrapper\"><slot></slot></div></fieldset></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIFieldset);
        return UIFieldset;
    }());
    exports.UIFieldset = UIFieldset;
    var UIInputGroup = (function () {
        function UIInputGroup(element) {
            this.element = element;
            if (this.element.hasAttribute('display'))
                this.element.classList.add('ui-display');
        }
        UIInputGroup.prototype.bind = function () {
            if (this.width)
                this.element['style'].width = this.width;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInputGroup.prototype, "width", void 0);
        UIInputGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input-group'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-group\"><slot name=\"inputLabel\"></slot><div class=\"ui-group-wrapper\"><slot></slot></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInputGroup);
        return UIInputGroup;
    }());
    exports.UIInputGroup = UIInputGroup;
    var UIInputLabel = (function () {
        function UIInputLabel(element) {
            this.element = element;
            this.__labelClass = '';
            this.__for = 'ui-input-' + (UIInputLabel.seed++);
            this.class = '';
            if (element.hasAttribute('required'))
                this.__labelClass += ' ui-required';
            if (element.hasAttribute('align-top'))
                this.__labelClass += ' ui-align-top';
        }
        UIInputLabel.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                (_this.__label.parentElement.querySelector('input[type="text"],input[type="password"],input[type="number"],input[type="email"],input[type="search"],input[type="url"],input[type="file"],input[type="tel"],textarea') || {}).id = _this.__for;
            });
        };
        UIInputLabel.seed = 1;
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInputLabel.prototype, "class", void 0);
        UIInputLabel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-input-label'),
            aurelia_framework_1.inlineView("<template><label class=\"ui-input-label ${__labelClass} ${class}\" ref=\"__label\" for.bind=\"__for\" slot=\"inputLabel\"><slot></slot></label></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInputLabel);
        return UIInputLabel;
    }());
    exports.UIInputLabel = UIInputLabel;
    var UIInputAddon = (function () {
        function UIInputAddon(element) {
            this.element = element;
        }
        UIInputAddon.prototype.__focus = function () {
            var _this = this;
            var inp;
            ui_event_1.UIEvent.queueTask(function () {
                if (inp = _this.element.nextElementSibling.querySelector('input,textarea'))
                    inp.focus();
            });
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInputAddon.prototype, "icon", void 0);
        UIInputAddon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input-addon'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-addon\" click.delegate=\"__focus()\"><slot><span class=\"${icon}\"></span></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInputAddon);
        return UIInputAddon;
    }());
    exports.UIInputAddon = UIInputAddon;
    var UIInputButton = (function () {
        function UIInputButton(element) {
            this.element = element;
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInputButton.prototype, "icon", void 0);
        UIInputButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input-button'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-button\" role=\"button\"><slot><span class=\"${icon}\"></span></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInputButton);
        return UIInputButton;
    }());
    exports.UIInputButton = UIInputButton;
    var UIInputInfo = (function () {
        function UIInputInfo(element) {
            this.element = element;
            if (this.element.hasAttribute('primary'))
                this.element.classList.add('ui-text-primary');
            else if (this.element.hasAttribute('secondary'))
                this.element.classList.add('ui-text-secondary');
            else if (this.element.hasAttribute('dark'))
                this.element.classList.add('ui-text-dark');
            else if (this.element.hasAttribute('light'))
                this.element.classList.add('ui-text-light');
            else if (this.element.hasAttribute('info'))
                this.element.classList.add('ui-text-info');
            else if (this.element.hasAttribute('danger'))
                this.element.classList.add('ui-text-danger');
            else if (this.element.hasAttribute('success'))
                this.element.classList.add('ui-text-success');
            else if (this.element.hasAttribute('warning'))
                this.element.classList.add('ui-text-warning');
            else
                this.element.classList.add('ui-text-muted');
            if (this.element.hasAttribute('center'))
                this.element.classList.add('ui-text-center');
        }
        UIInputInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input-info'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-info-bar\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInputInfo);
        return UIInputInfo;
    }());
    exports.UIInputInfo = UIInputInfo;
    var UIInputDisplay = (function () {
        function UIInputDisplay(element) {
            this.element = element;
            this.value = '';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInputDisplay.prototype, "value", void 0);
        UIInputDisplay = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-display'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-display\"><span innerhtml.bind=\"value\"></span></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInputDisplay);
        return UIInputDisplay;
    }());
    exports.UIInputDisplay = UIInputDisplay;
    var UIInput = (function () {
        function UIInput(element) {
            this.element = element;
            this.__value = '';
            this.errors = [];
            this.value = '';
            this.number = NaN;
            this.decimal = NaN;
            this.maxlength = 999;
            this.placeholder = '';
            this.disabled = false;
            this.readonly = false;
            this.dir = 'ltr';
            this.__ignoreChange = false;
            if (element.hasAttribute('email'))
                this.__type = 'email';
            else if (element.hasAttribute('url'))
                this.__type = 'url';
            else if (element.hasAttribute('file'))
                this.__type = 'file';
            else if (element.hasAttribute('search'))
                this.__type = 'search';
            else if (element.hasAttribute('number') || element.hasAttribute('number.bind'))
                this.__type = 'number';
            else if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind'))
                this.__type = 'number';
            else if (element.hasAttribute('password'))
                this.__type = 'password';
            else
                this.__type = 'text';
            if (element.hasAttribute('email'))
                this.__format = 'email';
            else if (element.hasAttribute('url'))
                this.__format = 'url';
            else if (element.hasAttribute('number') || element.hasAttribute('number.bind'))
                this.__format = 'number';
            else if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind'))
                this.__format = 'decimal';
            else
                this.__format = 'text';
            this.__clear = element.hasAttribute('clear');
            this.__counter = element.hasAttribute('charcount');
        }
        UIInput.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
            this.readonly = isTrue(this.readonly);
            if (this.width)
                this.element['style'].width = this.width;
            if (this.value)
                this.valueChanged(this.value);
            if (this.number)
                this.numberChanged(this.number);
            if (this.decimal)
                this.decimalChanged(this.decimal);
        };
        UIInput.prototype.clear = function () {
            this.__value = this.value = '';
            this.__input.focus();
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIInput.prototype.widthChanged = function (newValue) {
            this.element['style'].width = newValue;
        };
        UIInput.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        UIInput.prototype.valueChanged = function (newValue) {
            if (this.__ignoreChange)
                return;
            if (this.__format == 'email' || this.__format == 'url')
                newValue = (newValue || '').toLowerCase();
            this.value = this.__value = newValue;
        };
        UIInput.prototype.numberChanged = function (newValue) {
            if (this.__ignoreChange)
                return;
            this.__value = newValue;
        };
        UIInput.prototype.decimalChanged = function (newValue) {
            if (this.__ignoreChange)
                return;
            this.__value = newValue;
        };
        UIInput.prototype.format = function (evt) {
            var _this = this;
            evt.stopPropagation();
            this.__ignoreChange = true;
            var start = evt.target.selectionStart;
            if (this.__format == 'email' || this.__format == 'url')
                this.value = evt.target.value = evt.target.value.toLowerCase();
            else if (this.__format == 'number')
                this.number = evt.target.valueAsNumber || '';
            else if (this.__format == 'decimal')
                this.decimal = evt.target.valueAsNumber || '';
            else
                this.value = evt.target.value;
            try {
                evt.target.setSelectionRange(start, start);
            }
            catch (e) { }
            ui_event_1.UIEvent.queueTask(function () { return _this.__ignoreChange = false; });
            ui_event_1.UIEvent.fireEvent('input', this.element);
        };
        UIInput.prototype.keyDown = function (evt) {
            evt.stopPropagation();
            var code = evt.keyCode || evt.which;
            if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8)
                return true;
            if (code == 13)
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element);
            if (this.__format == 'email')
                return /[a-zA-Z0-9\@\-\.\_\&\+]/.test(String.fromCharCode(code));
            if (this.__format == 'url')
                return /[a-zA-Z0-9\/\-\.\_\?\#\%\=\;\:\{\[\]\}\&\+]/.test(String.fromCharCode(code));
            if (this.__format == 'number')
                return /[0-9\-]/.test(String.fromCharCode(code));
            if (this.__format == 'decimal') {
                if (code == 46 && evt.target.value.indexOf('.') >= 0)
                    return false;
                return /[0-9\.\-]/.test(String.fromCharCode(code));
            }
            return true;
        };
        UIInput.prototype.fireChange = function (evt) {
            evt.stopPropagation();
            if (this.__format == 'number')
                ui_event_1.UIEvent.fireEvent('change', this.element, this.number);
            else if (this.__format == 'decimal')
                ui_event_1.UIEvent.fireEvent('change', this.element, this.decimal);
            else
                ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIInput.prototype.fireBlur = function () {
            this.__focus = false;
            ui_event_1.UIEvent.fireEvent('blur', this.element);
        };
        UIInput.prototype.fireFocus = function () {
            this.__focus = true;
            ui_event_1.UIEvent.fireEvent('focus', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "number", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "decimal", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIInput.prototype, "width", void 0);
        UIInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ${__focus?'ui-focus':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><input class=\"ui-input\" size=\"1\" keypress.trigger=\"keyDown($event)\" input.trigger=\"format($event)\" change.trigger=\"fireChange($event)\"\n    value.bind=\"__value\" placeholder.bind=\"placeholder\" focus.trigger=\"fireFocus()\" blur.trigger=\"fireBlur()\" dir.bind=\"dir\" \n    type.bind=\"__type\" maxlength.bind=\"maxlength\" ref=\"__input\" disabled.bind=\"disabled || busy\" readonly.bind=\"readonly\"/>\n  <span class=\"ui-in-counter\" if.bind=\"__counter\">${(maxlength-__value.length)}</span>\n  <span class=\"ui-clear\" if.bind=\"__clear && __value\" click.trigger=\"clear()\">&times;</span></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIInput);
        return UIInput;
    }());
    exports.UIInput = UIInput;
    var UITextarea = (function () {
        function UITextarea(element) {
            this.element = element;
            this.errors = [];
            this.value = '';
            this.rows = 5;
            this.dir = 'ltr';
            this.maxlength = 10000;
            this.placeholder = '';
            this.autoComplete = '';
            this.disabled = false;
            this.readonly = false;
            this.__listCss = { top: '0px', left: '0px', right: 'auto', width: '200px', 'max-height': '400px' };
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
            this.__counter = element.hasAttribute('charcount');
            this.__clear = element.hasAttribute('clear');
        }
        UITextarea.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
            this.readonly = isTrue(this.readonly);
            if (!isEmpty(this.autoComplete))
                this.autoCompleteChanged(this.autoComplete);
        };
        UITextarea.prototype.clear = function () {
            this.value = '';
            this.__input.focus();
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UITextarea.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        UITextarea.prototype.fireChange = function (evt) {
            evt.stopPropagation();
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UITextarea.prototype.fireInput = function (evt) {
            evt.stopPropagation();
            ui_event_1.UIEvent.fireEvent('input', this.element);
        };
        UITextarea.prototype.fireBlur = function () {
            this.__focus = this.__showList = false;
            ui_event_1.UIEvent.fireEvent('blur', this.element);
        };
        UITextarea.prototype.fireFocus = function () {
            this.__focus = true;
            ui_event_1.UIEvent.fireEvent('focus', this.element);
        };
        UITextarea.prototype.attached = function () {
            var _this = this;
            if (!isEmpty(this.autoComplete)) {
                this.__input.onkeyup = function (evt) { return _this.showList(evt); };
                this.__input.onkeydown = function (evt) { return _this.keyDown(evt); };
                this.__acRegExp = eval("/\\b(\\w{1,})$/");
                this.__tether = new Tether({
                    element: this.__list,
                    target: this.element,
                    attachment: 'top left',
                    targetAttachment: 'top left',
                    constraints: [
                        {
                            to: 'scrollParent',
                            attachment: 'together'
                        },
                        {
                            to: 'window',
                            attachment: 'together'
                        }
                    ],
                    optimizations: {
                        moveElement: false
                    }
                });
            }
        };
        UITextarea.prototype.detached = function () {
            if (this.__tether)
                this.__tether.destroy();
        };
        UITextarea.prototype.autoCompleteChanged = function (newValue) {
            if (_.isString(newValue))
                newValue = newValue.split(',');
            this.autoComplete = newValue.sort();
        };
        UITextarea.prototype.showList = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13) {
                return false;
            }
            var text = this.__input.value.substring(0, this.__input.selectionEnd);
            var query = text.match(this.__acRegExp);
            this.__showList = false;
            if (query !== null) {
                var rx = new RegExp(getAscii(query[1]), 'i');
                this.__autoComplete = _.filter(this.autoComplete, function (v) {
                    var asc = getAscii(v);
                    return rx.test(asc);
                });
                var pos = this.getCaretCoordinates();
                this.__listCss = Object.assign(this.__listCss, pos);
                this.__showList = this.__autoComplete.length > 0;
            }
            return true;
        };
        UITextarea.prototype.keyDown = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (this.__showList) {
                if (code == 13) {
                    var h = this.__list.querySelector('.ui-list-item.ui-highlight');
                    if (h !== null)
                        this.__replace(h.dataset.value);
                    this.__showList = false;
                    return false;
                }
                if (code === 38) {
                    var h = this.__list.querySelector('.ui-list-item.ui-highlight');
                    if (h !== null)
                        h = h.previousElementSibling;
                    if (h === null)
                        h = this.__list.querySelector('.ui-list-item');
                    if (h != null) {
                        if (h !== null) {
                            if (this.__hilight != null)
                                this.__hilight.classList.remove('ui-highlight');
                            (this.__hilight = h).classList.add('ui-highlight');
                            this.__scrollIntoView();
                        }
                    }
                    evt.preventDefault();
                    return false;
                }
                else if (code === 40) {
                    var h = this.__list.querySelector('.ui-list-item.ui-highlight');
                    if (h !== null)
                        h = h.nextElementSibling;
                    if (h === null)
                        h = this.__list.querySelector('.ui-list-item');
                    if (h !== null) {
                        if (this.__hilight != null)
                            this.__hilight.classList.remove('ui-highlight');
                        (this.__hilight = h).classList.add('ui-highlight');
                        this.__scrollIntoView();
                    }
                    evt.preventDefault();
                    return false;
                }
            }
            return true;
        };
        UITextarea.prototype.__replace = function (selected) {
            var pre = this.__input.value.substring(0, this.__input.selectionEnd);
            var post = this.__input.value.substring(this.__input.selectionEnd);
            pre = pre.replace(this.__acRegExp, ' ' + selected + ' ');
            this.value = (pre + post);
            this.__input.selectionStart = this.__input.selectionEnd = pre.length;
        };
        UITextarea.prototype.__clicked = function ($event) {
            if ($event.button !== 0)
                return true;
            var o = getParentByClass($event.target, 'ui-list-item', 'ui-list');
            if (o !== null) {
                this.__replace(o.dataset.value);
                this.__showList = false;
            }
        };
        UITextarea.prototype.__scrollIntoView = function () {
            this.__list.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.__list.offsetHeight / 2) : 0);
        };
        UITextarea.prototype.getCaretCoordinates = function () {
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
            _.forEach(this.properties, function (prop) {
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
                top: (span.offsetTop + parseInt(computed['borderTopWidth']) + 20 - element.scrollTop) + 'px',
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
            __metadata('design:type', Object)
        ], UITextarea.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "autoComplete", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITextarea.prototype, "readonly", void 0);
        UITextarea = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-textarea'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-textarea ${__focus?'ui-focus':''} ${__counter?'ui-ta-counter':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><textarea class=\"ui-input\" rows.bind=\"rows\" value.bind=\"value\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || busy\" readonly.bind=\"readonly\"\n    focus.trigger=\"fireFocus()\" blur.trigger=\"fireBlur()\" maxlength.bind=\"maxlength\" ref=\"__input\" input.trigger=\"fireInput($event) & debounce\" change.trigger=\"fireChange($event)\" dir.bind=\"dir\"></textarea>\n  <div class=\"ui-auto-list ui-list-dropdown\" css.bind=\"{width:'200px', 'max-height':'300px', right:'auto', left:__listCss.left, top:__listCss.top}\" \n    show.bind=\"__showList && !readonly\" mousewheel.trigger=\"$event.cancelBubble = true\" mousedown.trigger=\"__clicked($event)\" ref=\"__list\">\n    <div repeat.for=\"opt of __autoComplete\" class=\"ui-list-item\" data-value=\"${opt}\">\n      <span class=\"ui-text ui-col-fill\" innerhtml.bind=\"opt\"></span></div>\n  </div>\n  <span class=\"ui-ta-counter\" if.bind=\"__counter\">${value.length & debounce} of ${maxlength}</span>\n  <span class=\"ui-clear\" if.bind=\"__clear && value\" click.trigger=\"clear()\">&times;</span></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UITextarea);
        return UITextarea;
    }());
    exports.UITextarea = UITextarea;
    var UIPhone = (function () {
        function UIPhone(element) {
            this.element = element;
            this.__ctry = '';
            this.__value = '';
            this.__prefix = '';
            this.__national = false;
            this.__placeholder = '';
            this.errors = [];
            this.value = '';
            this.country = '';
            this.disabled = false;
            this.readonly = false;
            this.__ignoreChange = false;
            this.__clear = element.hasAttribute('clear');
        }
        UIPhone.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
            this.readonly = isTrue(this.readonly);
            this.valueChanged(this.value);
            if (this.__national = !isEmpty(this.country))
                this.__prefix = '+' + PhoneLib.getDialingCode(this.country);
            else
                this.__ctry = PhoneLib.getIso2Code(this.value);
            this.__placeholder = PhoneLib.getExample(this.country || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.__national);
        };
        UIPhone.prototype.clear = function () {
            this.__value = this.value = '';
            this.__input.focus();
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIPhone.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        UIPhone.prototype.valueChanged = function (newValue) {
            if (this.__ignoreChange)
                return;
            if (isEmpty(newValue)) {
                this.__value = '';
                this.phone = null;
            }
            else {
                this.__value = PhoneLib.formatInput(newValue, this.country);
                this.phone = PhoneLib.getNumberInfo(newValue, this.country);
            }
        };
        UIPhone.prototype.countryChanged = function (newValue) {
            if (this.__national = !isEmpty(newValue))
                this.__prefix = '+' + PhoneLib.getDialingCode(this.country);
            else
                this.__ctry = PhoneLib.getIso2Code(this.value);
            this.__placeholder = PhoneLib.getExample(this.country || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.__national);
        };
        UIPhone.prototype.format = function (evt) {
            var _this = this;
            this.__ignoreChange = true;
            var val = evt.target.value;
            var start = evt.target.selectionStart;
            if (!this.__national && !(/^\+/.test(val)))
                val = '+' + val;
            if (!this.__national)
                this.__ctry = PhoneLib.getIso2Code(val);
            evt.target.value = PhoneLib.formatInput(val, this.country);
            this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
            this.phone = PhoneLib.getNumberInfo(val, this.country);
            try {
                evt.target.setSelectionRange(start, start);
            }
            catch (e) { }
            ui_event_1.UIEvent.queueTask(function () { return _this.__ignoreChange = false; });
        };
        UIPhone.prototype.keyDown = function (evt) {
            evt.stopPropagation();
            var code = evt.keyCode || evt.which;
            if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8)
                return true;
            if (code == 13)
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element);
            return /[0-9]/.test(String.fromCharCode(code));
        };
        UIPhone.prototype.fireChange = function (evt) {
            evt.stopPropagation();
            ui_event_1.UIEvent.fireEvent('change', this.element, { value: this.value, phone: this.phone });
        };
        UIPhone.prototype.fireBlur = function () {
            this.__focus = false;
            ui_event_1.UIEvent.fireEvent('blur', this.element);
        };
        UIPhone.prototype.fireFocus = function () {
            this.__focus = true;
            ui_event_1.UIEvent.fireEvent('focus', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIPhone.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIPhone.prototype, "phone", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPhone.prototype, "country", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPhone.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPhone.prototype, "readonly", void 0);
        UIPhone = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-phone'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ${class} ${__focus?'ui-focus':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\">\n  <div class=\"ui-input-addon\" click.trigger=\"__input.focus()\"><span class=\"ui-flag ${__ctry}\" if.bind=\"!country\"></span>${__prefix}</div><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><input class=\"ui-input\" size=\"1\" keypress.trigger=\"keyDown($event)\" input.trigger=\"format($event)\" change.trigger=\"fireChange($event)\"\n    value.bind=\"__value\" placeholder.bind=\"__placeholder\" focus.trigger=\"fireFocus()\" blur.trigger=\"fireBlur()\" \n    type=\"tel\" ref=\"__input\" disabled.bind=\"disabled || busy\" readonly.bind=\"readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"__clear && __value\" click.trigger=\"clear()\">&times;</span></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIPhone);
        return UIPhone;
    }());
    exports.UIPhone = UIPhone;
});
