// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";

@autoinject()
export class StylesView {
  router: Router;

  configureRouter(config, router: Router) {
    this.router = router;
    config.map([
      {
        route: ['', 'typo'],
        moduleId: './typo',
        title: 'Typography',
        settings: { icon: 'fi-ui-st-typo' },
        nav: true,
        auth: false,
        name: 'typo'
      }, {
        route: 'sass',
        moduleId: './sass',
        title: 'Using SASS',
        settings: { icon: 'fi-ui-st-css' },
        nav: true,
        auth: false,
        name: 'sass'
      }, {
        route: 'colors',
        moduleId: './colors',
        title: 'Copic Colors',
        settings: { icon: 'fi-ui-st-color' },
        nav: true,
        auth: false,
        name: 'colors'
      }, {
        route: 'hlight',
        moduleId: './hlight',
        title: 'Highlight Test',
        settings: { icon: 'fi-ui-st-test' },
        nav: true,
        auth: false,
        name: 'hlight'
      }]);
  }

  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 1000);
    });
  }

}