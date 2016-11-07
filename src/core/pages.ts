// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";

@autoinject()
export class PagesView {
  router: Router;

  configureRouter(config, router: Router) {
    this.router = router;
    config.map([{
      route: ['', 'simple'],
      moduleId: './page-simple',
      title: 'Simple',
      nav: true,
      auth: false,
      name: 'simple'
    }, {
        route: 'sidebar',
        moduleId: './page-sidebar',
        title: 'With Sidebar',
        nav: true,
        auth: false,
        name: 'sidebar'
      }, {
        route: 'toolbar',
        moduleId: './page-toolbar',
        title: 'With Toolbar',
        nav: true,
        auth: false,
        name: 'toolbar'
      }, {
        route: 'mixed',
        moduleId: './page-mixed',
        title: 'Mixed Layout',
        nav: true,
        auth: false,
        name: 'mixed'
      }]);
  }

  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }

}