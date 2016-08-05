define(["require", "exports", "./ui-formatters", "./ui-utils"], function (require, exports, ui_formatters_1, ui_utils_1) {
    "use strict";
    var MarkdownValueConverter = (function () {
        function MarkdownValueConverter() {
        }
        MarkdownValueConverter.prototype.toView = function (value) {
            return ui_formatters_1.UIFormat.toHTML(value || '');
        };
        return MarkdownValueConverter;
    }());
    exports.MarkdownValueConverter = MarkdownValueConverter;
    var CodeHighlightValueConverter = (function () {
        function CodeHighlightValueConverter() {
        }
        CodeHighlightValueConverter.prototype.toView = function (value) {
            return ui_formatters_1.UIFormat.mdHilight(value || '');
        };
        return CodeHighlightValueConverter;
    }());
    exports.CodeHighlightValueConverter = CodeHighlightValueConverter;
    var DateValueConverter = (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.toView = function (value, format) {
            return ui_formatters_1.UIFormat.date(value, format);
        };
        return DateValueConverter;
    }());
    exports.DateValueConverter = DateValueConverter;
    var FromNowValueConverter = (function () {
        function FromNowValueConverter() {
        }
        FromNowValueConverter.prototype.toView = function (value) {
            return ui_formatters_1.UIFormat.fromNow(value);
        };
        return FromNowValueConverter;
    }());
    exports.FromNowValueConverter = FromNowValueConverter;
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.toView = function (value, format) {
            return ui_formatters_1.UIFormat.number(value, format);
        };
        return NumberValueConverter;
    }());
    exports.NumberValueConverter = NumberValueConverter;
    var CurrencyValueConverter = (function () {
        function CurrencyValueConverter() {
        }
        CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
            return ui_formatters_1.UIFormat.currency(value, symbol, format);
        };
        return CurrencyValueConverter;
    }());
    exports.CurrencyValueConverter = CurrencyValueConverter;
    var PercentValueConverter = (function () {
        function PercentValueConverter() {
        }
        PercentValueConverter.prototype.toView = function (value) {
            return ui_formatters_1.UIFormat.percent(value);
        };
        return PercentValueConverter;
    }());
    exports.PercentValueConverter = PercentValueConverter;
    var KeysValueConverter = (function () {
        function KeysValueConverter() {
        }
        KeysValueConverter.prototype.toView = function (object) {
            if (isEmpty(object))
                return [];
            return Object.keys(object);
        };
        return KeysValueConverter;
    }());
    exports.KeysValueConverter = KeysValueConverter;
    var GroupValueConverter = (function () {
        function GroupValueConverter() {
        }
        GroupValueConverter.prototype.toView = function (object, property) {
            return ui_utils_1._.groupBy(object, property);
        };
        return GroupValueConverter;
    }());
    exports.GroupValueConverter = GroupValueConverter;
    var SortValueConverter = (function () {
        function SortValueConverter() {
        }
        SortValueConverter.prototype.toView = function (value, property) {
            return ui_utils_1._.sortBy(value, property);
        };
        return SortValueConverter;
    }());
    exports.SortValueConverter = SortValueConverter;
    var JsonValueConverter = (function () {
        function JsonValueConverter() {
        }
        JsonValueConverter.prototype.toView = function (value) {
            return JSON.stringify(value, null, 4);
        };
        return JsonValueConverter;
    }());
    exports.JsonValueConverter = JsonValueConverter;
    var IsStringValueConverter = (function () {
        function IsStringValueConverter() {
        }
        IsStringValueConverter.prototype.toView = function (value) {
            return ui_utils_1._.isString(value);
        };
        return IsStringValueConverter;
    }());
    exports.IsStringValueConverter = IsStringValueConverter;
    var IsArrayValueConverter = (function () {
        function IsArrayValueConverter() {
        }
        IsArrayValueConverter.prototype.toView = function (value) {
            return ui_utils_1._.isArray(value);
        };
        return IsArrayValueConverter;
    }());
    exports.IsArrayValueConverter = IsArrayValueConverter;
    var IsObjectValueConverter = (function () {
        function IsObjectValueConverter() {
        }
        IsObjectValueConverter.prototype.toView = function (value) {
            return ui_utils_1._.isObject(value);
        };
        return IsObjectValueConverter;
    }());
    exports.IsObjectValueConverter = IsObjectValueConverter;
    var IsTrueValueConverter = (function () {
        function IsTrueValueConverter() {
        }
        IsTrueValueConverter.prototype.toView = function (value) {
            return isTrue(value);
        };
        return IsTrueValueConverter;
    }());
    exports.IsTrueValueConverter = IsTrueValueConverter;
    var IsFalseValueConverter = (function () {
        function IsFalseValueConverter() {
        }
        IsFalseValueConverter.prototype.toView = function (value) {
            return !isTrue(value);
        };
        return IsFalseValueConverter;
    }());
    exports.IsFalseValueConverter = IsFalseValueConverter;
});
