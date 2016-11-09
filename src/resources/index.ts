// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {FrameworkConfiguration} from 'aurelia-framework';
import {ValidationRules} from 'aurelia-validation';
import {UIValidationRenderer} from "./utils/ui-validator";

import 'lodash';
import 'moment';
import 'numeral';
import 'tether';

import * as ld from "lodash";
import * as km from "kramed";
import * as mm from "moment";
import * as nm from "numeral";

export var _ = ld;
export var kramed = km;
export var moment = mm;
export var numeral = nm;

export * from "./utils/ui-event";
export * from "./utils/ui-format";

export * from "./utils/ui-tree-model";

export interface UIConfig {

}

export function configure(config: FrameworkConfiguration, configCallback) {
  config.container.registerHandler('ui-validator', container => container.get(UIValidationRenderer));

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

  // Validation Rules
  ValidationRules
    .customRule('phone', (value, obj) => value === null || value === undefined || value == '' || PhoneLib.isValid(value), '\${$displayName } is not a valid phone number.');
  ValidationRules
    .customRule('integer', (value, obj, min, max) => value === null || value === undefined || value == '' || Number.isInteger(value) && value >= (min || Number.MIN_VALUE) && value <= (max || Number.MAX_VALUE),
    '\${$displayName} must be an integer value between \${$config.min || "MIN_VALUE"} and \${$config.max || "MAX_VALUE"}.', (min, max) => ({ min, max }));
  ValidationRules
    .customRule('decimal', (value, obj, min, max) => value === null || value === undefined || value == '' || Math.floor(value % 1) === 0 && value >= (min || Number.MIN_VALUE) && value <= (max || Number.MAX_VALUE),
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

  // Setup kramed
  let rend = new kramed.Renderer();
  rend.code = (code, lang) => {
    if (window.hljs) {
      window.hljs.configure({
        useBR: true,
        tabReplace: '    '
      });
      return `<pre><code class="hljs ${lang} lang-${lang}">` + window.hljs.highlightAuto(code, [lang]).value + '</code></pre>';
    }
    return `<pre><code class="hljs ${lang} lang-${lang}">${code}</code></pre>`;
  }
  kramed.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    renderer: rend
  });

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
        return ret || {};
      }
    },
    'findChildren': function(collection, listProperty, property, value) {
      let ret;
      _.forEach(collection, function(item) {
        ret = _.find(item[listProperty], v => {
          return v[property] + '' === value + '';
        });
        return ret === undefined;
      });
      return ret || {};
    }
  });
}
