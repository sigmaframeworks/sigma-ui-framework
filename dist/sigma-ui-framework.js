define(["require", "exports", "lodash", "kramed", "moment", "numeral", "./utils/ui-event", 'lodash', 'moment', 'numeral', 'tether'], function (require, exports, ld, km, mm, nm, ui_event_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports._ = ld;
    exports.kramed = km;
    exports.moment = mm;
    exports.numeral = nm;
    __export(ui_event_1);
    function configure(config, configCallback) {
        config.globalResources([
            './elements/core/ui-viewport',
            './elements/core/ui-page',
            './elements/core/ui-grid'
        ]);
        config.globalResources([
            './elements/components/ui-menu',
            './elements/components/ui-panel',
            './elements/components/ui-drawer'
        ]);
        config.globalResources([
            './elements/inputs/ui-button'
        ]);
        config.globalResources([
            './attributes/ui-marked',
            './attributes/ui-badge'
        ]);
        config.globalResources([
            './value-converters/ui-lodash'
        ]);
        var rend = new exports.kramed.Renderer();
        rend.code = function (code, lang) {
            if (window.hljs) {
                window.hljs.configure({
                    useBR: true,
                    tabReplace: '    '
                });
                return ("<pre><code class=\"hljs " + lang + " lang-" + lang + "\">") + window.hljs.highlightAuto(code, [lang]).value + '</code></pre>';
            }
            return "<pre><code class=\"hljs " + lang + " lang-" + lang + "\">" + code + "</code></pre>";
        };
        exports.kramed.setOptions({
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            renderer: rend
        });
    }
    exports.configure = configure;
});
