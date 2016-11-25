define(["require", "exports", 'aurelia-validation', "./utils/ui-constants", "./utils/ui-validator", "lodash", "kramed", "moment", "numeral", "./utils/ui-event", "./utils/ui-format", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-http-service", "./utils/ui-dialog", "./utils/ui-model", "./utils/ui-tree-model", 'lodash', 'moment', 'numeral', 'tether', "./elements/core/ui-viewport", "./elements/core/ui-page", "./elements/core/ui-grid", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-input", "./elements/inputs/ui-list", "./elements/inputs/ui-markdown", "./elements/inputs/ui-option", "./elements/components/ui-datagrid", "./elements/components/ui-drawer", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-tab", "./elements/components/ui-tree", './attributes/ui-marked', './attributes/ui-badge', './value-converters/ui-text', './value-converters/ui-lodash'], function (require, exports, aurelia_validation_1, ui_constants_1, ui_validator_1, ld, km, mm, nm, ui_event_1, ui_format_1, ui_application_1, ui_constants_2, ui_http_service_1, ui_dialog_1, ui_model_1, ui_tree_model_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports._ = ld;
    exports.kramed = km;
    exports.moment = mm;
    exports.numeral = nm;
    __export(ui_event_1);
    __export(ui_format_1);
    __export(ui_application_1);
    __export(ui_constants_2);
    __export(ui_http_service_1);
    __export(ui_dialog_1);
    __export(ui_model_1);
    __export(ui_tree_model_1);
    function configure(config, configCallback) {
        config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validator_1.UIValidationRenderer); });
        config.globalResources([
            './elements/core/ui-viewport',
            './elements/core/ui-page',
            './elements/core/ui-grid'
        ]);
        config.globalResources([
            './elements/components/ui-tab',
            './elements/components/ui-menu',
            './elements/components/ui-panel',
            './elements/components/ui-drawer',
            './elements/components/ui-tree',
            './elements/components/ui-datagrid'
        ]);
        config.globalResources([
            './elements/inputs/ui-button',
            './elements/inputs/ui-input',
            './elements/inputs/ui-option',
            './elements/inputs/ui-markdown',
            './elements/inputs/ui-list',
            './elements/inputs/ui-date'
        ]);
        config.globalResources([
            './attributes/ui-marked',
            './attributes/ui-badge'
        ]);
        config.globalResources([
            './value-converters/ui-text',
            './value-converters/ui-lodash'
        ]);
        var Configure = {
            title: function (t) {
                ui_constants_1.UIConstants.App.Title = t;
                return Configure;
            },
            version: function (t) {
                ui_constants_1.UIConstants.App.Version = t;
                return Configure;
            },
            appKey: function (t) {
                ui_constants_1.UIConstants.App.Key = t;
                return Configure;
            },
            apiUrl: function (t) {
                ui_constants_1.UIConstants.Http.BaseUrl = t;
                return Configure;
            },
            apiHeaders: function (t) {
                ui_constants_1.UIConstants.Http.Headers = t;
                return Configure;
            },
            sendAuthHeader: function (t) {
                ui_constants_1.UIConstants.Http.AuthorizationHeader = t;
                return Configure;
            },
            languages: function (l) {
                ui_constants_1.UIConstants.Languages = l;
                return Configure;
            }
        };
        if (configCallback !== undefined && typeof configCallback === 'function') {
            configCallback(Configure);
        }
        aurelia_validation_1.ValidationRules
            .customRule('phone', function (value, obj) { return value === null || value === undefined || value === '' || PhoneLib.isValid(value); }, '\${$displayName } is not a valid phone number.');
        aurelia_validation_1.ValidationRules
            .customRule('integer', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (Number.isInteger(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be an integer value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('decimal', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (isNumber(value) && Math.floor(value % 1) === 0 && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('language', function (map, obj, controller, langInput) {
            if (!(langInput && langInput.addError && langInput.removeError))
                throw new Error('Language validation must have reference to ui-language');
            var promises = [];
            exports._.forEach(map, function (model, key) {
                promises.push(controller.validator.validateObject(model)
                    .then(function (e) {
                    if (langInput.errors.indexOf(key) > -1)
                        langInput.removeError(key);
                    if (e.length > 0)
                        langInput.addError(key);
                    return e.length > 0 ? true : false;
                }));
            });
            return Promise.all(promises).then(function (e) { return exports._.filter(e).length == 0; });
        }, 'Some language entries contain invalid values');
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
                    return ret_3 || {};
                }
            },
            'findChildren': function (collection, listProperty, property, value) {
                var ret;
                exports._.forEach(collection, function (item) {
                    ret = exports._.find(item[listProperty], function (v) {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret || {};
            }
        });
    }
    exports.configure = configure;
});
