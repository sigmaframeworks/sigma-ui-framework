define(["require", "exports", "./ui-utils"], function (require, exports, ui_utils_1) {
    "use strict";
    var UIFormat;
    (function (UIFormat) {
        function toHTML(md) {
            return ui_utils_1.kramed(md);
        }
        UIFormat.toHTML = toHTML;
        function date(dt, ft) {
            if (ft === void 0) { ft = 'DD MMM YYYY'; }
            var x;
            return dt === null || !(x = ui_utils_1.moment(dt)).isValid() ? null : x.format(ft);
        }
        UIFormat.date = date;
        function datetime(dt, ft) {
            if (ft === void 0) { ft = 'DD MMM YYYY hh:mm A'; }
            var x;
            return dt === null || !(x = ui_utils_1.moment(dt)).isValid() ? null : x.format(ft);
        }
        UIFormat.datetime = datetime;
        function dateToISO(dt) {
            var x;
            return dt === null || !(x = ui_utils_1.moment(dt)).isValid() ? null : x.toISOString();
        }
        UIFormat.dateToISO = dateToISO;
        function fromNow(dt) {
            var x;
            return dt === null || !(x = ui_utils_1.moment(dt)).isValid() ? '' : x.fromNow(false);
        }
        UIFormat.fromNow = fromNow;
        function number(nm, fm) {
            if (fm === void 0) { fm = '0,0[.]00'; }
            var ret = nm === null || isNaN(nm) ? '' : ui_utils_1.numeral(nm).format(fm);
            if (fm.indexOf('{') === 0) {
                var minlen = fm.length - 2;
                if (ret.length < minlen) {
                    ret = Array(minlen - ret.length + 1).join('0') + ret;
                }
            }
            return ret;
        }
        UIFormat.number = number;
        function currency(nm, sy, fm) {
            if (sy === void 0) { sy = '$'; }
            if (fm === void 0) { fm = '$ 0,0[.]00'; }
            return nm === null || isNaN(nm) ? '' :
                ui_utils_1.numeral(nm)
                    .format(fm)
                    .replace('$', sy);
        }
        UIFormat.currency = currency;
        function percent(nm) {
            return nm === null || isNaN(nm) ? '' :
                ui_utils_1.numeral(nm > 1 ? nm / 100 : nm)
                    .format('0.00 %');
        }
        UIFormat.percent = percent;
        function exRate(nm) {
            return nm === null || isNaN(nm) ? '' :
                ui_utils_1.numeral(nm > 0 ? 1 / nm : nm)
                    .format('0.0000[a]');
        }
        UIFormat.exRate = exRate;
    })(UIFormat = exports.UIFormat || (exports.UIFormat = {}));
});
