// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";

@autoinject()
export class App {
  router: Router;
  configureRouter(config, router: Router) {
    this.router = router;
    config.title = "Sigma UI";
    config.map([{
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
        settings: { section: 'Core Elements', disabled: true },
        name: 'pages'
      }, {
        route: 'grid',
        moduleId: './core/grid',
        title: 'Grid System',
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
        route: 'switch',
        moduleId: './inputs/switch',
        title: 'Switches',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements', disabled: true },
        name: 'switch'
      }, {
        route: 'list',
        moduleId: './inputs/list',
        title: 'Lists',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements', disabled: true },
        name: 'list'
      }, {
        route: 'markdown',
        moduleId: './inputs/markdown',
        title: 'Markdown Editor',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements', disabled: true },
        name: 'markdown'
      }, {
        route: 'button',
        moduleId: './components/button',
        title: 'Buttons',
        nav: true,
        auth: false,
        settings: { section: 'Components' },
        name: 'button'
      }, {
        route: 'menu',
        moduleId: './components/menu',
        title: 'Menus',
        nav: true,
        auth: false,
        settings: { section: 'Components', disabled: true },
        name: 'menu'
      }, {
        route: 'drawer',
        moduleId: './components/drawer',
        title: 'Drawers',
        nav: true,
        auth: false,
        settings: { section: 'Components' },
        name: 'drawer'
      }, {
        route: 'panel',
        moduleId: './components/panel',
        title: 'Panels',
        nav: true,
        auth: false,
        settings: { section: 'Components' },
        name: 'panel'
      }, {
        route: 'datagrid',
        moduleId: './components/datagrid',
        title: 'Datagrid',
        nav: true,
        auth: false,
        settings: { section: 'Widgets' },
        name: 'datagrid'
      }, {
        route: 'tab',
        moduleId: './components/tab',
        title: 'Tab Panel',
        nav: true,
        auth: false,
        settings: { section: 'Widgets', disabled: true },
        name: 'tab'
      }, {
        route: 'tree',
        moduleId: './components/tree',
        title: 'Tree Panel',
        nav: true,
        auth: false,
        settings: { section: 'Widgets', disabled: true },
        name: 'tree'
      }]);
  }
  doalert() {
    alert('Hello');
  }
}
