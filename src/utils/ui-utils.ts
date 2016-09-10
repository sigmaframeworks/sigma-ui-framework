// Utility Classes
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {Lazy, Container, NewInstance, ViewCompiler, ViewResources, ViewSlot} from "aurelia-framework";
import {UIEvent} from "./ui-event";
import * as ld from "lodash";
import * as km from "kramed";
import * as mm from "moment";
import * as nm from "numeral";

export var _ = ld;
export var kramed = km;
export var moment = mm;
export var numeral = nm;

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

export module UIChartStatic {
    export var CHART_RED = ["#7C2722", "#A73A21", "#DA3926", "#DE4834", "#E46A6A", "#EB898C", "#ED969B"];
    export var CHART_PINK = ["#80364B", "#AA2D52", "#C8235D", "#DE2265", "#E66395", "#EB7FA5", "#EF96B2"];
    export var CHART_BLUE = ["#127BB3", "#2094C6", "#68B7DC", "#7EC1DC", "#B0D9E4", "#B8DEE5", "#DCEBE6"];
    export var CHART_GREEN = ["#0A4D44", "#118173", "#179987", "#1CB4A1", "#3BBCAD", "#67C4B8", "#96D5CC"];
    export var CHART_ORANGE = ["#6F3610", "#944216", "#BD521B", "#F56B23", "#FC954F", "#FDB27E", "#FBCEA8"];
    export var CHART_VIOLET = ["#4E2354", "#602A82", "#732F97", "#86509F", "#9B65A7", "#BA87BD", "#CBA2CA"];
    export var CHART_SPECTRUM = ["#850509", "#CB2515", "#E2491A", "#FE7722", "#FE9C27", "#FFCD42", "#FFEE54"];
    export var CHART_DEFAULT = ["#D53530", "#EF6B28", "#9D6E4B", "#EDEC47", "#5DAF43", "#38D046", "#279F79", "#5AC5C4", "#338EBD", "#375FA7", "#7C53A2", "#A6216A", "#DF8097"];
    export var CHART_PIE = ["#B52F30", "#F68F31", "#8FC649", "#A0C4C8", "#A54797", "#977E6D", "#954D43", "#FBCC2E", "#5C8158", "#5D86A3", "#B10D5F", "#0E6BA8", "#0B6848"];

    export function init() {
        if (!AmCharts) throw new Error('amCharts not loaded');
        let colors = { red: 'CHART_RED', pink: 'CHART_PINK', blue: 'CHART_BLUE', green: 'CHART_GREEN', orange: 'CHART_ORANGE', violet: 'CHART_VIOLET', spectrum: 'CHART_SPECTRUM', default: 'CHART_DEFAULT', pie: 'CHART_PIE' }
        _.forEach(colors, (v, k) => {
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
}

export module UIUtils {
    var __container: Container;

    export function container(container: Container) {
        __container = container;
    }

    export function lazy(T): any {
        if (!__container) {
            throw new Error('UIUtils.Lazy::Container not set');
        }
        return Lazy.of(T)
            .get(__container)();
    }

    export function newInstance(T, container): any {
        if (!container) {
            throw new Error('UIUtils.newInstance::Container not provided');
        }
        return NewInstance.of(T)
            .get(container);
    }

    let __compiler;
    let __resources;

    export function compileView(markup, container, vm?) {
        if (!__compiler) __compiler = lazy(ViewCompiler);
        if (!__resources) __resources = lazy(ViewResources);

        var viewFactory = __compiler.compile(`<template>${markup}</template>`, __resources);
        let view = viewFactory.create(__container);
        view.bind(vm);

        let slot = new ViewSlot(container, true);
        slot.add(view);
        slot.attached();
        if (isFunction(vm.attached)) vm.attached();

        return view;
    }

    export function alert(config) {
        let dialogContainer = document.body.querySelector('.ui-viewport .ui-dialog-container');

        let type = "fi-ui-info-black";
        if (config.type == "error") type = "fi-ui-error-black";
        if (config.type == "exclaim") type = "fi-ui-exclaim-black";

        let view = UIUtils.compileView(`<div class="ui-dialog-wrapper ui-modal" ref="__wrapper">
        <div class="ui-dialog ui-alert">
        <input style="position:fixed;top:-100%" ref="__focusBlock" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"/>
        <div class="ui-message-bar">
        <span class="${type}"></span><p innerhtml.bind='message'></p></div>
        <div class="ui-button-bar"><button click.trigger="closeAlert()">${config.button}</button></div>
        </div></div>`, dialogContainer, {
                __wrapper: null,
                __focusBlock: null,
                message: config.message,
                attached: function() {
                    this.__focusBlock.focus();
                },
                closeAlert: function() {
                    this.__wrapper.remove();
                },
                cancelBlur: function($event) {
                    $event.preventDefault();
                    this.__focusBlock.focus();
                    return false;
                },
                checkKey: function($event) {
                    let key = ($event.keyCode || $event.which);
                    if (key == 13) this.closeAlert();
                    if (key == 27) this.closeAlert();
                }
            });
    }

    export function confirm(config) {
        let dialogContainer = document.body.querySelector('.ui-viewport .ui-dialog-container');
        return new Promise((resolve, reject) => {
            let view = UIUtils.compileView(`<div class="ui-dialog-wrapper ui-modal" ref="__wrapper">
        <div class="ui-dialog ui-alert">
        <input style="position:fixed;top:-100%" ref="__focusBlock" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"/>
        <div class="ui-message-bar">
        <span class="fi-ui-help-black"></span><p innerhtml.bind='message'></p></div>
        <div class="ui-button-bar"><button class="default" click.trigger="closeAlert(true)">${config.yesLabel}</button>
        <button click.trigger="closeAlert(false)">${config.noLabel}</button></div>
        </div></div>`, dialogContainer, {
                    __wrapper: null,
                    __focusBlock: null,
                    message: config.message,
                    attached: function() {
                        this.__focusBlock.focus();
                    },
                    closeAlert: function(b) {
                        b ? resolve() : reject();
                        this.__wrapper.remove();
                    },
                    cancelBlur: function($event) {
                        $event.preventDefault();
                        this.__focusBlock.focus();
                        return false;
                    },
                    checkKey: function($event) {
                        let key = ($event.keyCode || $event.which);
                        if (key == 13) this.closeAlert(true);
                        if (key == 27) this.closeAlert(false);
                    }
                });
        });
    }

    export function showToast(container, config) {
        let tmr;
        if (typeof config === 'string') config = { message: config };
        let opt = Object.assign({ theme: 'default', autoHide: 5000, extraClass: '' }, config);
        let toast = document.createElement('div');
        toast.classList.add('ui-toast');
        toast.classList.add(opt.theme);
        if (!isEmpty(opt.extraClass)) toast.classList.add(opt.extraClass);
        toast.innerHTML = `<div class="ui-toast-wrapper">
    			<span class="ui-icon ${opt.icon}"></span>
    			<p class="ui-message">${opt.message}</p>
    			<span class="ui-close">&times;</span>
    		</div>`;

        container.appendChild(toast);
        if (opt.autoHide > 0) tmr = setTimeout(() => __removeToast(toast), 5000);
        toast.onclick = () => {
            clearTimeout(tmr);
            __removeToast(toast);
        };
        UIEvent.queueTask(() => toast.classList.add('ui-toast-show'));
    }

    function __removeToast(toast) {
        setTimeout(() => toast.remove(), 1000);
        toast.classList.remove('ui-toast-show');
    }

    export function getAscii(str): string {
        if (isEmpty(str)) return '';
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


    // LoDash Mixins
    _.mixin({
        'findByValues': function(collection, property, values) {
            if (_.isArray(collection)) {
                return _.filter(collection, function(item) {
                    return _.indexOf(values, item[property] + '') > -1;
                });
            }
            else {
                let ret = [];
                _.forEach(collection, function(list) {
                    ret.concat(_.filter(list, function(item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }));
                });
                return ret;
            }
        },
        'removeByValues': function(collection, property, values) {
            if (_.isArray(collection)) {
                return _.remove(collection, function(item) {
                    return _.indexOf(values, item[property] + '') > -1;
                }) || [];
            }
            else {
                let ret = [];
                _.forEach(collection, function(list, key) {
                    ret = ret.concat(_.remove(list, function(item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }));
                });
                return ret;
            }
        },
        'findDeep': function(collection, property, value) {
            if (_.isArray(collection)) {
                return _.find(collection, function(item) {
                    return item[property] + '' === value + '';
                });
            }
            else {
                let ret;
                _.forEach(collection, function(item) {
                    ret = _.find(item, v => {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret;
            }
        }
    });

    //export function getFloatPosition(
    //	anchor,
    //	floater,
    //	side:boolean = false) {
    //	let _f = $(floater), _a = $(anchor);
    //	_f.offset({left: -1000, top: -1000})
    //	  .css('max-height', side ? '480px' : '320px')
    //	  .css('visibility', 'visible');
    //	let o  = _a.offset(),
    //		aw = _a.outerWidth(),
    //		ah = _a.outerHeight(),
    //		fh = _f.outerHeight(),
    //		fw = _f.outerWidth(),
    //		pw = window.innerWidth,
    //		ph = window.innerHeight;
    //
    //	var _hr = false, _vr = false;
    //	var t   = o.top, l = o.left;
    //
    //	if (!side) {
    //		_f.css('min-width', aw);
    //		if (t + ah + fh > ph) {
    //			t -= fh;
    //			_vr = true;
    //		}
    //		else {
    //			t += ah;
    //		}
    //		if (l + fw > pw) {
    //			l -= (fw - aw);
    //		}
    //	}
    //	else {
    //		if (t + fh > ph) {
    //			t -= (fh - ah);
    //			_vr = true;
    //		}
    //		if (l + aw + fw > pw) {
    //			l -= fw;
    //			_hr = true;
    //		}
    //		else {
    //			l += aw;
    //		}
    //	}
    //	_f.css('max-height', '0')
    //	  .css('visibility', 'hidden');
    //	return {top: t, left: l, hReverse: _hr, vReverse: _vr}
    //}
}
