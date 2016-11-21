// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, useView} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {UIConstants} from "./resources/utils/ui-constants";

@autoinject()
export class App {
  router: Router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = UIConstants.App.Title;
    config.mapUnknownRoutes('./home/404');
    config.map([
      {
        route: ['', 'home'],
        moduleId: './home/view',
        title: 'Home',
        nav: false,
        auth: false,
        name: 'home'
      }, {
        route: 'start',
        moduleId: './home/start',
        title: 'Getting Started',
        nav: true,
        auth: false,
        settings: { section: 'Framework', disabled: true },
        name: 'start'
      }, {
        route: 'example',
        moduleId: './home/example',
        title: 'App Example',
        nav: true,
        auth: false,
        settings: { section: 'Framework', disabled: true },
        name: 'example'
      }, {
        route: 'styles',
        moduleId: './styles/view',
        title: 'Styling',
        nav: true,
        auth: false,
        settings: { section: 'Framework' },
        name: 'styles'
      }, {
        route: 'viewport',
        moduleId: './core/viewport',
        title: 'Viewport',
        nav: true,
        auth: false,
        settings: { section: 'Core Elements', disabled: true },
        name: 'viewport'
      }, {
        route: 'pages',
        moduleId: './core/pages',
        title: 'Pages',
        nav: true,
        auth: false,
        settings: { section: 'Core Elements' },
        name: 'pages'
      }, {
        route: 'grid',
        moduleId: './core/grid',
        title: 'Responsive Grid',
        nav: true,
        auth: false,
        settings: { section: 'Core Elements' },
        name: 'grid'
      }, {
        route: 'input',
        moduleId: './inputs/view',
        title: 'Inputs',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'input'
      }, {
        route: 'option',
        moduleId: './inputs/option',
        title: 'Option Inputs',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'option'
      }, {
        route: 'list',
        moduleId: './inputs/list',
        title: 'Lists',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'list'
      }, {
        route: 'markdown',
        moduleId: './inputs/markdown',
        title: 'Markdown Editor',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'markdown'
      }, {
        route: 'button',
        moduleId: './inputs/button',
        title: 'Buttons',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'button'
      }, {
        route: 'menu',
        moduleId: './components/menu',
        title: 'Menus',
        nav: true,
        auth: false,
        settings: { section: 'UI Components', disabled: true },
        name: 'menu'
      }, {
        route: 'drawer',
        moduleId: './components/drawer',
        title: 'Drawers',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'drawer'
      }, {
        route: 'panel',
        moduleId: './components/panel',
        title: 'Panels',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'panel'
      }, {
        route: 'dialog',
        moduleId: './components/dialog',
        title: 'Dialogs',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'dialog'
      }, {
        route: 'datagrid',
        moduleId: './components/datagrid',
        title: 'Datagrid',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'datagrid'
      }, {
        route: 'tab',
        moduleId: './components/tabs',
        title: 'Tab Panel',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'tab'
      }, {
        route: 'tree',
        moduleId: './components/tree',
        title: 'Tree Panel',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'tree'
      }]);
  }
}
