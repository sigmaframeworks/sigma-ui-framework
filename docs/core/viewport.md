# UI Viewport


Main application viewport


* ##### ui-viewport

  ```html
  <ui-viewport
    router.bind="router">
    
    <ui-app-header>
      
      <ui-drawer-toggle drawer.bind="menuDraw"></ui-drawer-toggle>
      
      <ui-app-title src.bind="logo image">${router.title}</ui-app-title>
      
      <p if.bind="app.IsAuthenticated">Logged in as ${app.AuthUser}</p>
      
      <ui-button if.bind="app.IsAuthenticated" click.trigger="app.logout()">Sign-Out</ui-button>
      
    </ui-app-header>
    
    <ui-drawer ref="menuDraw">...</ui-drawer>
    
    <ui-menubar>...</ui-menubar>
    
    <ui-app-taskbar></ui-app-taskbar>
    
    <ui-app-footer>...</ui-app-footer>
    
  </ui-viewport>
  ```
  
  ```ts
  import {autoinject} from "aurelia-framework";
  import {UIApplication, UIConstants, AuthInterceptor} from "sigma-ui-framework";
  
  @autoinject()
  export class App {
    constructor(public app:UIApplication){}
  
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router) {
      this.router = router;
      config.title = UIConstants.App.Title;
      config.addPipelineStep('authorize', AuthInterceptor);
      config.map([
        {
          route: ['', 'home'],
          moduleId: './home/view',
          title: 'Home',
          nav: false,
          auth: true,
          name: 'home'
        }, {
          route: 'login',
          moduleId: './home/login',
          title: 'Login',
          nav: false,
          auth: false,
          name: 'login'
        },
        ...]);
    }
  }
  ```