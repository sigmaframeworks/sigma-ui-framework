define(["require", "exports", "./utils/ui-constants", "./utils/ui-utils", "./utils/ui-validation", "./utils/ui-event", "./utils/ui-constants", "./utils/ui-formatters", "./utils/ui-application", "./utils/ui-model", "./utils/ui-dialog", "./utils/ui-tree-models", "./utils/ui-http-service", "./utils/ui-validation", "./utils/ui-utils", 'lodash', 'moment', 'numeral', 'kramed', './scripts/phonelib', './scripts/fileTypes', './scripts/countries', './scripts/currencies'], function (require, exports, ui_constants_1, ui_utils_1, ui_validation_1, ui_event_1, ui_constants_2, ui_formatters_1, ui_application_1, ui_model_1, ui_dialog_1, ui_tree_models_1, ui_http_service_1, ui_validation_2, ui_utils_2) {
    "use strict";
    function configure(aurelia, configCallback) {
        aurelia.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
        aurelia.globalResources('./core/ui-viewport');
        aurelia.globalResources('./core/ui-page');
        aurelia.globalResources('./core/ui-grid');
        aurelia.globalResources('./components/ui-menu');
        aurelia.globalResources('./components/ui-form');
        aurelia.globalResources('./components/ui-ribbon');
        aurelia.globalResources('./components/ui-panel');
        aurelia.globalResources('./components/ui-login');
        aurelia.globalResources('./components/ui-tree');
        aurelia.globalResources('./components/ui-datagrid');
        aurelia.globalResources('./components/ui-tab-panel');
        aurelia.globalResources('./inputs/ui-button');
        aurelia.globalResources('./inputs/ui-switch');
        aurelia.globalResources('./inputs/ui-option');
        aurelia.globalResources('./inputs/ui-input');
        aurelia.globalResources('./inputs/ui-file');
        aurelia.globalResources('./inputs/ui-phone');
        aurelia.globalResources('./inputs/ui-markdown');
        aurelia.globalResources('./inputs/ui-textarea');
        aurelia.globalResources('./inputs/ui-input-dual');
        aurelia.globalResources('./inputs/ui-combo');
        aurelia.globalResources('./inputs/ui-tags');
        aurelia.globalResources('./inputs/ui-language');
        aurelia.globalResources('./inputs/ui-date');
        aurelia.globalResources('./inputs/ui-date-view');
        aurelia.globalResources('./inputs/ui-reorder');
        aurelia.globalResources('./inputs/ui-list');
        aurelia.globalResources('./utils/ui-converters');
        ui_utils_1.kramed.setOptions({
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, type) {
                if (hljs) {
                    hljs.configure({
                        useBR: true,
                        tabReplace: '    '
                    });
                    return hljs.highlightAuto(code).value;
                }
                return code;
            }
        });
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
            addAuthHeader: function (t) {
                ui_constants_1.UIConstants.Http.AuthorizationHeader = t;
                return Configure;
            },
            loadCharts: function () {
                aurelia.globalResources('./components/ui-chart');
                ui_utils_1.UIChartStatic.init();
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
    }
    exports.configure = configure;
    exports.UIEvent = ui_event_1.UIEvent;
    exports.UIConstants = ui_constants_2.UIConstants;
    exports.UIFormat = ui_formatters_1.UIFormat;
    exports.UIApplication = ui_application_1.UIApplication;
    exports.AuthInterceptor = ui_application_1.AuthInterceptor;
    exports.UIModel = ui_model_1.UIModel;
    exports.UIDialogService = ui_dialog_1.UIDialogService;
    exports.UIDialog = ui_dialog_1.UIDialog;
    exports.UITreeModel = ui_tree_models_1.UITreeModel;
    exports.UIHttpService = ui_http_service_1.UIHttpService;
    exports.UIValidationRenderer = ui_validation_2.UIValidationRenderer;
    exports.validatemap = ui_validation_2.validatemap;
    exports.validatephone = ui_validation_2.validatephone;
    exports.UIChartStatic = ui_utils_2.UIChartStatic;
    exports.UIUtils = ui_utils_2.UIUtils;
    exports._ = ui_utils_2._;
    exports.moment = ui_utils_2.moment;
    exports.numeral = ui_utils_2.numeral;
    exports.kramed = ui_utils_2.kramed;
});
