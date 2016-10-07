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
    config.map([{
      route: ['', 'typo'],
      moduleId: './typo',
      title: 'Typography',
      nav: true,
      auth: false,
      name: 'typo'
    }, {
        route: 'sass',
        moduleId: './sass',
        title: 'Using SASS',
        nav: true,
        auth: false,
        name: 'sass'
      }, {
        route: 'colors',
        moduleId: './colors',
        title: 'Copic Colors',
        nav: true,
        auth: false,
        name: 'colors'
      }, {
        route: 'hlight',
        moduleId: './hlight',
        title: 'Highlight Test',
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