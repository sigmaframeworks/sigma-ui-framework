define(["require", "exports", "aurelia-framework", "./ui-event", "lodash", "kramed", "moment", "numeral"], function (require, exports, aurelia_framework_1, ui_event_1, ld, km, mm, nm) {
    "use strict";
    exports._ = ld;
    exports.kramed = km;
    exports.moment = mm;
    exports.numeral = nm;
    Object.defineProperties(window, {
        '__seed': {
            writable: true,
            enumerable: false,
            value: 1
        },
        'Constants': {
            configurable: false,
            writable: false,
            enumerable: false,
            value: {}
        }
    });
    var UIChartStatic;
    (function (UIChartStatic) {
        UIChartStatic.CHART_RED = ["#7C2722", "#A73A21", "#DA3926", "#DE4834", "#E46A6A", "#EB898C", "#ED969B"];
        UIChartStatic.CHART_PINK = ["#80364B", "#AA2D52", "#C8235D", "#DE2265", "#E66395", "#EB7FA5", "#EF96B2"];
        UIChartStatic.CHART_BLUE = ["#127BB3", "#2094C6", "#68B7DC", "#7EC1DC", "#B0D9E4", "#B8DEE5", "#DCEBE6"];
        UIChartStatic.CHART_GREEN = ["#0A4D44", "#118173", "#179987", "#1CB4A1", "#3BBCAD", "#67C4B8", "#96D5CC"];
        UIChartStatic.CHART_ORANGE = ["#6F3610", "#944216", "#BD521B", "#F56B23", "#FC954F", "#FDB27E", "#FBCEA8"];
        UIChartStatic.CHART_VIOLET = ["#4E2354", "#602A82", "#732F97", "#86509F", "#9B65A7", "#BA87BD", "#CBA2CA"];
        UIChartStatic.CHART_SPECTRUM = ["#850509", "#CB2515", "#E2491A", "#FE7722", "#FE9C27", "#FFCD42", "#FFEE54"];
        UIChartStatic.CHART_DEFAULT = ["#D53530", "#EF6B28", "#9D6E4B", "#EDEC47", "#5DAF43", "#38D046", "#279F79", "#5AC5C4", "#338EBD", "#375FA7", "#7C53A2", "#A6216A", "#DF8097"];
        UIChartStatic.CHART_PIE = ["#B52F30", "#F68F31", "#8FC649", "#A0C4C8", "#A54797", "#977E6D", "#954D43", "#FBCC2E", "#5C8158", "#5D86A3", "#B10D5F", "#0E6BA8", "#0B6848"];
        function init() {
            if (!AmCharts)
                throw new Error('amCharts not loaded');
            var colors = { red: 'CHART_RED', pink: 'CHART_PINK', blue: 'CHART_BLUE', green: 'CHART_GREEN', orange: 'CHART_ORANGE', violet: 'CHART_VIOLET', spectrum: 'CHART_SPECTRUM', default: 'CHART_DEFAULT', pie: 'CHART_PIE' };
            exports._.forEach(colors, function (v, k) {
                AmCharts['themes'][k] = Object.assign({}, AmCharts['themes'].light, {
                    themeName: k,
                    AmCoordinateChart: {
                        colors: UIChartStatic[v]
                    },
                    AmStockChart: {
                        colors: UIChartStatic[v]
                    }
                });
            });
            AmCharts['theme'] = AmCharts['themes'].default;
        }
        UIChartStatic.init = init;
    })(UIChartStatic = exports.UIChartStatic || (exports.UIChartStatic = {}));
    var UIUtils;
    (function (UIUtils) {
        var __container;
        function container(container) {
            __container = container;
        }
        UIUtils.container = container;
        function lazy(T) {
            if (!__container) {
                throw new Error('UIUtils.Lazy::Container not set');
            }
            return aurelia_framework_1.Lazy.of(T)
                .get(__container)();
        }
        UIUtils.lazy = lazy;
        function newInstance(T, container) {
            if (!container) {
                throw new Error('UIUtils.newInstance::Container not provided');
            }
            return aurelia_framework_1.NewInstance.of(T)
                .get(container);
        }
        UIUtils.newInstance = newInstance;
        var __compiler;
        var __resources;
        function compileView(markup, container, vm) {
            if (!__compiler)
                __compiler = lazy(aurelia_framework_1.ViewCompiler);
            if (!__resources)
                __resources = lazy(aurelia_framework_1.ViewResources);
            var viewFactory = __compiler.compile("<template>" + markup + "</template>", __resources);
            var view = viewFactory.create(__container);
            view.bind(vm);
            var slot = new aurelia_framework_1.ViewSlot(container, true);
            slot.add(view);
            slot.attached();
            if (isFunction(vm.attached))
                vm.attached();
            return view;
        }
        UIUtils.compileView = compileView;
        function alert(config) {
            var dialogContainer = document.body.querySelector('.ui-viewport .ui-dialog-container');
            var type = "fi-ui-info-black";
            if (config.type == "error")
                type = "fi-ui-error-black";
            if (config.type == "exclaim")
                type = "fi-ui-exclaim-black";
            var view = UIUtils.compileView("<div class=\"ui-dialog-wrapper ui-modal\" ref=\"__wrapper\">\n        <div class=\"ui-dialog ui-alert\">\n        <input style=\"position:fixed;top:-100%\" ref=\"__focusBlock\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"/>\n        <div class=\"ui-message-bar\">\n        <span class=\"" + type + "\"></span><p innerhtml.bind='message'></p></div>\n        <div class=\"ui-button-bar\"><button click.trigger=\"closeAlert()\">" + config.button + "</button></div>\n        </div></div>", dialogContainer, {
                __wrapper: null,
                __focusBlock: null,
                message: config.message,
                attached: function () {
                    this.__focusBlock.focus();
                },
                closeAlert: function () {
                    this.__wrapper.remove();
                },
                cancelBlur: function ($event) {
                    $event.preventDefault();
                    this.__focusBlock.focus();
                    return false;
                },
                checkKey: function ($event) {
                    var key = ($event.keyCode || $event.which);
                    if (key == 13)
                        this.closeAlert();
                    if (key == 27)
                        this.closeAlert();
                }
            });
        }
        UIUtils.alert = alert;
        function confirm(config) {
            var dialogContainer = document.body.querySelector('.ui-viewport .ui-dialog-container');
            return new Promise(function (resolve, reject) {
                var view = UIUtils.compileView("<div class=\"ui-dialog-wrapper ui-modal\" ref=\"__wrapper\">\n        <div class=\"ui-dialog ui-alert\">\n        <input style=\"position:fixed;top:-100%\" ref=\"__focusBlock\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"/>\n        <div class=\"ui-message-bar\">\n        <span class=\"fi-ui-help-black\"></span><p innerhtml.bind='message'></p></div>\n        <div class=\"ui-button-bar\"><button class=\"default\" click.trigger=\"closeAlert(true)\">" + config.yesLabel + "</button>\n        <button click.trigger=\"closeAlert(false)\">" + config.noLabel + "</button></div>\n        </div></div>", dialogContainer, {
                    __wrapper: null,
                    __focusBlock: null,
                    message: config.message,
                    attached: function () {
                        this.__focusBlock.focus();
                    },
                    closeAlert: function (b) {
                        b ? resolve() : reject();
                        this.__wrapper.remove();
                    },
                    cancelBlur: function ($event) {
                        $event.preventDefault();
                        this.__focusBlock.focus();
                        return false;
                    },
                    checkKey: function ($event) {
                        var key = ($event.keyCode || $event.which);
                        if (key == 13)
                            this.closeAlert(true);
                        if (key == 27)
                            this.closeAlert(false);
                    }
                });
            });
        }
        UIUtils.confirm = confirm;
        function showToast(container, config) {
            var tmr;
            if (typeof config === 'string')
                config = { message: config };
            var opt = Object.assign({ theme: 'default', autoHide: true, extraClass: '' }, config);
            var toast = document.createElement('div');
            toast.classList.add('ui-toast');
            toast.classList.add(opt.theme);
            if (!isEmpty(opt.extraClass))
                toast.classList.add(opt.extraClass);
            toast.innerHTML = "<div class=\"ui-toast-wrapper\">\n    \t\t\t<span class=\"ui-icon " + opt.icon + "\"></span>\n    \t\t\t<p class=\"ui-message\">" + opt.message + "</p>\n    \t\t\t<span class=\"ui-close\">&times;</span>\n    \t\t</div>";
            container.appendChild(toast);
            if (opt.autoHide)
                tmr = setTimeout(function () { return __removeToast(toast); }, 5000);
            toast.onclick = function () {
                clearTimeout(tmr);
                __removeToast(toast);
            };
            ui_event_1.UIEvent.queueTask(function () { return toast.classList.add('ui-toast-show'); });
        }
        UIUtils.showToast = showToast;
        function __removeToast(toast) {
            setTimeout(function () { return toast.remove(); }, 1000);
            toast.classList.remove('ui-toast-show');
        }
        function getAscii(str) {
            if (isEmpty(str))
                return '';
            var conversions = {};
            conversions['ae'] = 'ä|æ|ǽ';
            conversions['oe'] = 'ö|œ';
            conversions['ue'] = 'ü';
            conversions['Ae'] = 'Ä';
            conversions['Ue'] = 'Ü';
            conversions['Oe'] = 'Ö';
            conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
            conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
            conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
            conversions['c'] = 'ç|ć|ĉ|ċ|č';
            conversions['D'] = 'Ð|Ď|Đ';
            conversions['d'] = 'ð|ď|đ';
            conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
            conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
            conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
            conversions['g'] = 'ĝ|ğ|ġ|ģ';
            conversions['H'] = 'Ĥ|Ħ';
            conversions['h'] = 'ĥ|ħ';
            conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
            conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
            conversions['J'] = 'Ĵ';
            conversions['j'] = 'ĵ';
            conversions['K'] = 'Ķ';
            conversions['k'] = 'ķ';
            conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
            conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
            conversions['N'] = 'Ñ|Ń|Ņ|Ň';
            conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
            conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
            conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
            conversions['R'] = 'Ŕ|Ŗ|Ř';
            conversions['r'] = 'ŕ|ŗ|ř';
            conversions['S'] = 'Ś|Ŝ|Ş|Š';
            conversions['s'] = 'ś|ŝ|ş|š|ſ';
            conversions['T'] = 'Ţ|Ť|Ŧ';
            conversions['t'] = 'ţ|ť|ŧ';
            conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
            conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
            conversions['Y'] = 'Ý|Ÿ|Ŷ';
            conversions['y'] = 'ý|ÿ|ŷ';
            conversions['W'] = 'Ŵ';
            conversions['w'] = 'ŵ';
            conversions['Z'] = 'Ź|Ż|Ž';
            conversions['z'] = 'ź|ż|ž';
            conversions['AE'] = 'Æ|Ǽ';
            conversions['ss'] = 'ß';
            conversions['IJ'] = 'Ĳ';
            conversions['ij'] = 'ĳ';
            conversions['OE'] = 'Œ';
            conversions['f'] = 'ƒ';
            for (var i in conversions) {
                var re = new RegExp(conversions[i], "g");
                str = str.replace(re, i);
            }
            return str;
        }
        UIUtils.getAscii = getAscii;
        exports._.mixin({
            'findByValues': function (collection, property, values) {
                if (exports._.isArray(collection)) {
                    return exports._.filter(collection, function (item) {
                        return exports._.indexOf(values, item[property] + '') > -1;
                    });
                }
                else {
                    var ret_1 = [];
                    exports._.forEach(collection, function (list) {
                        ret_1.concat(exports._.filter(list, function (item) {
                            return exports._.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_1;
                }
            },
            'removeByValues': function (collection, property, values) {
                if (exports._.isArray(collection)) {
                    return exports._.remove(collection, function (item) {
                        return exports._.indexOf(values, item[property] + '') > -1;
                    }) || [];
                }
                else {
                    var ret_2 = [];
                    exports._.forEach(collection, function (list, key) {
                        ret_2 = ret_2.concat(exports._.remove(list, function (item) {
                            return exports._.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_2;
                }
            },
            'findDeep': function (collection, property, value) {
                if (exports._.isArray(collection)) {
                    return exports._.find(collection, function (item) {
                        return item[property] + '' === value + '';
                    });
                }
                else {
                    var ret_3;
                    exports._.forEach(collection, function (item) {
                        ret_3 = exports._.find(item, function (v) {
                            return v[property] + '' === value + '';
                        });
                        return ret_3 === undefined;
                    });
                    return ret_3;
                }
            }
        });
    })(UIUtils = exports.UIUtils || (exports.UIUtils = {}));
});
