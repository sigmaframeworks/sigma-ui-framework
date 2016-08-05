define(["require", "exports", "../utils/ui-event"], function (require, exports, ui_event_1) {
    "use strict";
    var UIInputGroup = (function () {
        function UIInputGroup(element) {
            var _this = this;
            this.element = element;
            this.__id = "auf-" + __seed++;
            this.__type = 'text';
            this.__format = 'text';
            this.__value = '';
            this.__value2 = '';
            this.__clear = false;
            this.__checkbox = false;
            this.dir = '';
            this.value = '';
            this.valueSecond = '';
            this.checked = false;
            this.readonly = false;
            this.disabled = false;
            this.ALPHA = "\\u0041-\\u005a\\u0061-\\u007a\\u00aa\\u00c0-\\u02af\\u0370-\\u0481\\u048a-\\u05ea\\u0621-\\u065e\\u066e-\\u06ef\\u0710-\\u072f\\u074d-\\u07a5\\u07ca-\\u07ea\\u0800-\\u082c\\u0900-\\u0964"
                + "\\u0981-\\u09e3\\u0a01-\\u0a5e\\u0a81-\\u0ae3\\u0b01-\\u0b63\\u0b82-\\u0bd7\\u0c01-\\u0c63\\u0c82-\\u0ce3\\u0d63\\u0d7a-\\u0e4f\\u0e5a-\\u0ecd\\u0f00-\\u0f1f\\u0f34-\\u103f\\u104c-\\u108f\\u109a-\\u1368"
                + "\\u1380-\\u17dd\\u17f0-\\u180e\\u1820-\\u1940\\u1950-\\u19c9\\u19e0-\\u1a7f\\u1aa0-\\u1b4b\\u1b80-\\u1baf\\u1c00-\\u1c3f\\u1c5a-\\u1dbf\\u1dd3-\\u1ffe\\u2c00-\\u2dff\\u3041-\\u3243\\ua000-\\ua827"
                + "\\ua840-\\ua8cf\\ua90a-\\ua9cf\\uaa00-\\uaa4d\\uaa60-\\ufdfb\\ufe70-\\ufefc\\u3400-\\u4db5\\u4e00-\\u9fa5";
            this.DIGIT = "\\u0030-\\u0039\\u0660-\\u0669\\u06f0-\\u06f9\\u07c0-\\u07c9\\u0966-\\u096f\\u09e6-\\u09ef\\u0a66-\\u0a6f\\u0ae6-\\u0aef\\u0b66-\\u0b6f\\u0be6-\\u0bef\\u0c66-\\u0c6f\\u0ce6-\\u0cef\\u0d66-\\u0d6f"
                + "\\u0e50-\\u0e59\\u0ed0-\\u0ed9\\u0f20-\\u0f33\\u1040-\\u1049\\u1090-\\u1099\\u1369-\\u137c\\u17e0-\\u17e9\\u1810-\\u1819\\u1946-\\u194f\\u19d0-\\u19d9\\u1a80-\\u1a99\\u1b50-\\u1b59\\u1bb0-\\u1bb9\\u1c40-\\u1c49"
                + "\\u1c50-\\u1c59\\ua620-\\ua629\\ua8d0-\\ua8d9\\ua900-\\ua909\\ua9d0-\\ua9d9\\uaa50-\\uaa59\\uabf0-\\uabf9";
            this.__clear = this.element.hasAttribute('clear');
            if (this.element.hasAttribute('auto-width'))
                this.element.classList.add('ui-auto');
            if (this.element.hasAttribute('label-top'))
                this.element.classList.add('ui-label-top');
            if (this.element.hasAttribute('label-hide'))
                this.element.classList.add('ui-label-hide');
            this.element['focus'] = function () { return _this.__input.focus(); };
        }
        UIInputGroup.prototype.bind = function () {
            this.__checkbox = this.element.hasAttribute('checkbox');
            if (!this.__checkbox)
                this.checked = true;
            if (this.__checkbox)
                this.checked = isTrue(this.checked);
            this.disabled = this.element.hasAttribute('disabled') || isTrue(this.disabled);
            this.readonly = this.element.hasAttribute('readonly') || isTrue(this.readonly);
            if (!isEmpty(this.value))
                this.__value = this.value;
            if (!isEmpty(this.valueSecond))
                this.__value2 = this.valueSecond;
        };
        UIInputGroup.prototype.attached = function () {
            var _this = this;
            if (this.element.hasAttribute('required'))
                this.__label.classList.add('ui-required');
            if (this.readonly === true) {
                this.__input.attributes.setNamedItem(document.createAttribute('readonly'));
                if (this.__input2)
                    this.__input2.attributes.setNamedItem(document.createAttribute('readonly'));
            }
            if (this.disabled === true || this.checked === false) {
                this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
                if (this.__input2)
                    this.__input2.attributes.setNamedItem(document.createAttribute('disabled'));
            }
            if (this.__chkbox && this.disabled === true) {
                this.__chkbox.attributes.setNamedItem(document.createAttribute('disabled'));
            }
            this.__input.oninput = function (evt) { return _this.value = _this.formatter(evt); };
            this.__input.onkeypress = function (evt) { return _this.keyPress(evt); };
            this.__input.onchange = function (evt) { return evt.detail = _this; };
            this.__input.onblur = function (evt) {
                ui_event_1.UIEvent.fireEvent('blur', _this.element, 'blurring');
            };
            if (this.__input2) {
                this.__input2.oninput = function (evt) { return _this.valueSecond = _this.formatter(evt); };
                this.__input2.onkeypress = function (evt) { return _this.keyPress(evt); };
                this.__input2.onchange = function (evt) { return evt.detail = _this; };
            }
        };
        UIInputGroup.prototype.focus = function () {
            this.__input.focus();
        };
        UIInputGroup.prototype.clearInput = function (isSecond) {
            if (isSecond === true) {
                this.valueSecond = '';
                this.__input2.focus();
            }
            if (isSecond !== true) {
                this.value = '';
                this.__input.focus();
            }
        };
        UIInputGroup.prototype.checkedChanged = function () {
            if (!this.__chkbox)
                return;
            if (this.__input.attributes.getNamedItem('disabled') !== null) {
                this.__input.attributes.removeNamedItem('disabled');
                if (this.__input2)
                    this.__input2.attributes.removeNamedItem('disabled');
            }
            if (this.checked === false) {
                this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
                if (this.__input2)
                    this.__input2.attributes.setNamedItem(document.createAttribute('disabled'));
            }
            ui_event_1.UIEvent.fireEvent('checked', this.element, this.checked);
        };
        UIInputGroup.prototype.readonlyChanged = function () {
            if (this.__input.attributes.getNamedItem('readonly') !== null) {
                this.__input.attributes.removeNamedItem('readonly');
                if (this.__input2)
                    this.__input2.attributes.removeNamedItem('readonly');
            }
            if (this.readonly === true) {
                this.__input.attributes.setNamedItem(document.createAttribute('readonly'));
                if (this.__input2)
                    this.__input2.attributes.setNamedItem(document.createAttribute('readonly'));
            }
            if (this.__chkbox && this.__chkbox.attributes.getNamedItem('disabled') !== null) {
                this.__chkbox.attributes.removeNamedItem('disabled');
            }
            if (this.__chkbox && (this.readonly === true || this.disabled === true)) {
                this.__chkbox.attributes.setNamedItem(document.createAttribute('disabled'));
            }
        };
        UIInputGroup.prototype.valueChanged = function (newValue) {
            this.__value = newValue;
        };
        UIInputGroup.prototype.valueSecondChanged = function (newValue) {
            this.__value2 = newValue;
        };
        UIInputGroup.prototype.disabledChanged = function () {
            this.disable();
        };
        UIInputGroup.prototype.disable = function (disabled) {
            if (this.__input.attributes.getNamedItem('disabled') !== null) {
                this.__input.attributes.removeNamedItem('disabled');
                if (this.__input2)
                    this.__input2.attributes.removeNamedItem('disabled');
            }
            if (disabled === true || this.disabled === true || this.checked === false) {
                this.__input.attributes.setNamedItem(document.createAttribute('disabled'));
                if (this.__input2)
                    this.__input2.attributes.setNamedItem(document.createAttribute('disabled'));
            }
            if (this.__chkbox && this.__chkbox.attributes.getNamedItem('disabled') !== null) {
                this.__chkbox.attributes.removeNamedItem('disabled');
            }
            if (this.__chkbox && (disabled === true || this.disabled === true || this.readonly === true)) {
                this.__chkbox.attributes.setNamedItem(document.createAttribute('disabled'));
            }
        };
        UIInputGroup.prototype.onAddonClick = function ($event) {
            $event.preventDefault();
            ui_event_1.UIEvent.fireEvent('buttonclick', this.element, this);
        };
        UIInputGroup.prototype.keyPress = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || evt.charCode === 0)
                return true;
            if (evt.target.type !== 'textarea') {
                if ((evt.which || evt.keyCode) === 13) {
                    this.formatter(evt);
                    return ui_event_1.UIEvent.fireEvent('enterpressed', this.element, this);
                }
                var rx = '.';
                if (this.__type === 'tel')
                    rx = '[0-9]';
                if (this.__format === 'number')
                    rx = '[0-9\\-]';
                if (this.__format === 'decimal')
                    rx = '[0-9\\-\\.]';
                if (this.__type === 'email')
                    rx = '[A-Za-z0-9\\-\\.@_\\+$/]';
                if (this.__type === 'url')
                    rx = '[A-Za-z0-9\\-\\.?:\\{\\}\\[\\]=&#%!()^_\\+$/]';
                return new RegExp(rx).test(String.fromCharCode(evt.charCode));
            }
            return true;
        };
        UIInputGroup.prototype.formatter = function (evt) {
            return isEmpty(evt.target.value) ? '' : evt.target.value;
        };
        return UIInputGroup;
    }());
    exports.UIInputGroup = UIInputGroup;
});
