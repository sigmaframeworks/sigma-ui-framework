// UI Format Helper
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {_, moment, numeral, kramed} from "./ui-utils";

export module UIFormat {
    export function toHTML(md) {
        return kramed(md);
    }

    export function mdHilight(md) {
        return kramed(md, {
            highlight: function(code, type) {
                if (hljs) {
                    hljs.configure({
                        useBR: true,
                        tabReplace: '    '
                    });
                }
                return hljs ? hljs.highlightAuto(type, code).value : code;
            }
        });
    }

    // Dates
    export function date(dt: any, ft: string = 'DD MMM YYYY hh:mm A') {
        let x;
        return dt === null || !(x = moment(dt)).isValid() ? null : x.format(ft);
    }

    export function dateToISO(dt) {
        let x;
        return dt === null || !(x = moment(dt)).isValid() ? null : x.toISOString();
    }

    export function fromNow(dt: any): string {
        let x;
        return dt === null || !(x = moment(dt)).isValid() ? '' : x.fromNow(false);
    }

    // Numbers
    export function number(nm: any, fm: string = '0,0[.]00'): string {
        let ret = nm === null || isNaN(nm) ? '' : numeral(nm).format(fm);
        if (fm.indexOf('{') === 0) {
            let minlen = fm.length - 2;
            if (ret.length < minlen) {
                ret = Array(minlen - ret.length + 1).join('0') + ret;
            }
        }
        ret.replace(/[^\d\.]+/g, (txt) => {
            return `<small>${txt.toUpperCase()}</small>`;
        });
        return ret;
    }

    export function currency(nm: any, sy: string = '$', fm: string = '$ 0,0[.]00'): string {
        return nm === null || isNaN(nm) ? '' :
            numeral(nm)
                .format(fm)
                .replace('$', sy)
                .replace(/[^\d\.]+/g, (txt) => {
                    return `<small>${txt.toUpperCase()}</small>`;
                });
    }

    export function percent(nm: any): string {
        return nm === null || isNaN(nm) ? '' :
            numeral(nm > 1 ? nm / 100 : nm)
                .format('0.00 %');
    }

    export function exRate(nm: any): string {
        return nm === null || isNaN(nm) ? '' :
            numeral(nm > 0 ? 1 / nm : nm)
                .format('0.0000[a]');
    }
}
