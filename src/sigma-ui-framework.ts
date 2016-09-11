// UI Framework Config
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT
import 'lodash';
import 'moment';
import 'numeral';
import 'kramed';
import {FrameworkConfiguration} from "aurelia-framework";
import {UIConstants} from "./utils/ui-constants";
import {UIChartStatic, kramed, _} from "./utils/ui-utils";
import {UIApplication} from "./utils/ui-application";
import {UIValidationRenderer} from "./utils/ui-validation";
import {ValidationRules, RenderInstruction, ValidationError} from "aurelia-validation";

export function configure(aurelia: FrameworkConfiguration, configCallback) {
    aurelia.container.registerHandler('ui-validator', container => container.get(UIValidationRenderer));

    ///** Core **/
    aurelia.globalResources('./core/ui-viewport');
    aurelia.globalResources('./core/ui-page');
    aurelia.globalResources('./core/ui-grid');

    ///** Components **/
    aurelia.globalResources('./components/ui-menu');
    aurelia.globalResources('./components/ui-form');
    aurelia.globalResources('./components/ui-ribbon');
    aurelia.globalResources('./components/ui-panel');
    aurelia.globalResources('./components/ui-login');
    aurelia.globalResources('./components/ui-tree');
    aurelia.globalResources('./components/ui-datagrid');
    aurelia.globalResources('./components/ui-tab-panel');
    aurelia.globalResources('./components/ui-chart');

    /** Inputs **/
    aurelia.globalResources('./inputs/ui-button');
    aurelia.globalResources('./inputs/ui-switch');
    aurelia.globalResources('./inputs/ui-option');
    aurelia.globalResources('./inputs/ui-display');
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

    /** Utils **/
    aurelia.globalResources('./utils/ui-converters');

    kramed.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
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

    ValidationRules
        .customRule('phone', (value, obj) => value === null || value === undefined || PhoneLib.isValid(value), '\${$displayName } is not a valid phone number.');
    ValidationRules
        .customRule('integer', (value, obj, min, max) => value === null || value === undefined || Number.isInteger(value) && value >= (min || Number.MIN_VALUE) && value <= (max || Number.MAX_VALUE),
        '\${$displayName} must be an integer value between \${$config.min || "MIN_VALUE"} and \${$config.max || "MAX_VALUE"}.', (min, max) => ({ min, max }));
    ValidationRules
        .customRule('decimal', (value, obj, min, max) => value === null || value === undefined || Math.floor(value % 1) === 0 && value >= (min || Number.MIN_VALUE) && value <= (max || Number.MAX_VALUE),
        '\${$displayName} must be a decimal value between \${$config.min || "MIN_VALUE"} and \${$config.max || "MAX_VALUE"}.', (min, max) => ({ min, max }));
    ValidationRules
        .customRule('language', (map, obj, controller, langInput) => {
            if (!(langInput && langInput.clearErrors && langInput.addError)) throw new Error('Language validation must have reference to ui-language');
            let promises = [];
            langInput.clearErrors();
            _.forEach(map, (model, key) => {
                promises.push(controller.validator.validateObject(model)
                    .then(e => {
                        if (e.length > 0) langInput.addError(key);
                        return e.length > 0 ? key : '';
                    }));
            });
            return Promise.all(promises).then(e => e.join('').length == 0);
        }, 'Some language entries contain invalid values');

    var Configure = {
        title: (t) => {
            UIConstants.App.Title = t;
            return Configure;
        },
        version: (t) => {
            UIConstants.App.Version = t;
            return Configure;
        },
        appKey: (t) => {
            UIConstants.App.Key = t;
            return Configure;
        },
        apiUrl: (t) => {
            UIConstants.Http.BaseUrl = t;
            return Configure;
        },
        apiHeaders: (t) => {
            UIConstants.Http.Headers = t;
            return Configure;
        },
        addAuthHeader: (t) => {
            UIConstants.Http.AuthorizationHeader = t;
            return Configure;
        },
        useAmCharts: () => {
            UIChartStatic.init();
            return Configure;
        },
        languages: (l) => {
            UIConstants.Languages = l;
            return Configure;
        }
    };

    if (configCallback !== undefined && typeof configCallback === 'function') {
        configCallback(Configure);

        // if (UIApplication.defaults.UseCharts) {
        // 	aurelia.globalResources('./components/ui-chart');
        // 	UIChartStatic.init();
        // }
    }
}

export {UIEvent} from "./utils/ui-event";
export {UIConstants} from "./utils/ui-constants";
export {UIFormat} from "./utils/ui-formatters";
export {UIApplication, AuthInterceptor} from "./utils/ui-application";
export {UIModel} from "./utils/ui-model";
export {UIDialogService, UIDialog} from "./utils/ui-dialog";
export {UITreeModel, UITreeOptions} from "./utils/ui-tree-models";
export {UIHttpService} from "./utils/ui-http-service";
export {UIValidationRenderer} from "./utils/ui-validation";
export {UIUtils, UIChartStatic, _, moment, numeral, kramed} from "./utils/ui-utils";
