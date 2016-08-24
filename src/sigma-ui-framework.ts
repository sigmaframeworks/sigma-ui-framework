// UI Framework Config
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT
import 'lodash';
import 'moment';
import 'numeral';
import 'kramed';
import './scripts/phonelib';
import './scripts/fileTypes';
import './scripts/countries';
import './scripts/currencies';
import {FrameworkConfiguration} from "aurelia-framework";
import {UIConstants} from "./utils/ui-constants";
import {UIChartStatic, kramed} from "./utils/ui-utils";
import {UIApplication} from "./utils/ui-application";
import {UIValidationRenderer} from "./utils/ui-validation";

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

    /** Inputs **/
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
        highlight: function(code, type) {
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
        loadCharts: () => {
            aurelia.globalResources('./components/ui-chart');
            UIChartStatic.init();
            return Configure;
        },
        languages: (l) => {
            UIConstants.Languages = l;
            return Configure;
        }
    }

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
export {UITreeModel} from "./utils/ui-tree-models";
export {UIHttpService} from "./utils/ui-http-service";
export {UIValidationRenderer, validatemap, validatephone} from "./utils/ui-validation";
export {UIChartStatic, UIUtils, _, moment, numeral, kramed} from "./utils/ui-utils";
