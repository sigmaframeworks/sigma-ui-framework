# Sigma UI Framework

A bespoke UI Framework built on Aurelia for desktop business application


[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Travis][travis-image]][travis-url]
[![MIT License][license-image]][license-url]
[![Gitter][gitter-image]][gitter-url]
[![Website][website-image]][website-url]


**[Documentation](http://sigmaframeworks.io/docs/framework)**

**[Demo](http://demo.sigmaframeworks.io/)**


|Safari|Chrome|Firefox|MS Edge|IE11|
|---|---|---|---|---|
|OK|OK|OK|Slow|Not Working|

----

##### Getting Started

> Before staring setup a project using the [ui-skeleton](//github.com/sigmaframeworks/sigma-ui-skeleton).


* `src/main.ts` Main aurelia entry point

  ```ts
  export function configure(aurelia) {
    aurelia.use
      .plugin('aurelia-validation')
      .plugin('sigma-ui-framework', function(config) {
        config
          .title(string)
          .version(string)
          .appKey(string)

          .apiUrl(url)
          .apiHeaders(object)
          // Send authorization header with every request
          .addAuthHeader(bool)

          .useAmCharts()
          .languages(array<{id, name}>)
      });

    aurelia.start()
    	.then(() => aurelia.setRoot())
    	.then(() => {
    		var splash = window.document.querySelector('.ui-splash');
    		splash.classList.add('animate');
    		setTimeout(() => {
    			splash.parentElement.removeChild(splash);
    		}, 1000);
    	})
    	.catch(e => {
    		console.log(e);
    	});
  }
  ```

* To use internationalization

  ```bash
  npm install aurelia-i18n i18next-xhr-backend --save
  ```

  Add the following to `function configure` in `main.ts`
  ```ts
  import {I18N} from 'aurelia-i18n';
  import * as Backend from 'i18next-xhr-backend'; // <-- your previously installed backend plugin

  aurelia.use
  .plugin('aurelia-i18n', (instance) => {
        // register backend plugin
        instance.i18next.use(Backend);

        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
          backend: {                                  // <-- configure backend settings
            loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
          },
          lng : 'es',
          attributes : ['t','i18n'],
          fallbackLng : 'en',
          debug : false
        });
      });
```




[website-image]: https://img.shields.io/badge/visit-website-orange.svg?style=flat
[website-url]: http://sigmaframeworks.io

[gitter-image]: https://img.shields.io/badge/gitter-join_chat-red.svg?style=flat
[gitter-url]: https://gitter.im/sigma-frameworks/ui-framework

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[travis-image]: https://img.shields.io/travis/sigmaframeworks/sigma-ui-framework.svg?style=flat&maxAge=2592000
[travis-url]: https://travis-ci.org/sigmaframeworks/sigma-ui-framework

[npm-url]: https://npmjs.org/package/sigma-ui-framework
[npm-version-image]: http://img.shields.io/npm/v/sigma-ui-framework.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dt/sigma-ui-framework.svg?style=flat
