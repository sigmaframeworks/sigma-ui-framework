// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {FrameworkConfiguration} from 'aurelia-framework';

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

export interface AuiConfig {

}

export function configure(config: FrameworkConfiguration, configCallback) {
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
}
