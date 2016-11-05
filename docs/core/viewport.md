# UI Viewport


* ##### ui-viewport

  ```html
  <ui-viewport
    router.bind="router">
    
    <ui-app-header>
      
      <ui-drawer-toggle drawer.bind="menuDraw"></ui-drawer-toggle>
      
      <ui-app-title src.bind="logo image">App Title</ui-app-title>
      
    </ui-app-header>
    
    <ui-drawer ref="menuDraw">...</ui-drawer>
    
    <ui-menubar>...</ui-menubar>
    
    <ui-app-taskbar></ui-app-taskbar>
    
    <ui-app-footer>...</ui-app-footer>
    
  </ui-viewport>
  ```