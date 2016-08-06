### UIViewport

```html
<ui-viewport
  router.bind="aurelia-router"

  subtitle.bind="string"  
  copyright.bind="string"

  icon.bind="<path to image>"
  icon-class.bind="string"

  show-menu.bind="bool"
  show-options.bind="bool"
  show-taskbar.bind="bool"

  menu-start | menu-end>

  <!-- any button/input element to be displayed in options box -->

  <!-- if using multi dialog taskbar add quick links -->
  <div slot="quick-links"></div>

</ui-viewport>
```

* ##### Attributes
  * `router`: Main app router for building navigation menu

  * `subtitle`: Application header subtitle
  * `copyright`: Copyright message displayed on the footer

  * `icon`: Image path for logo
  * `icon-class`: Logo image classname
  * __NOTE__ provide either one

  * `show-menu`: Display side menu
  * `show-options`: Display options box in header
  * `show-taskbar`: Display taskbar for multi dialog display

  * `menu-start`: Display menu and menu toggle left for ltr, right for rtl.
  * `menu-end`: Display menu and menu toggle right for ltr, left for rtl.
  * __NOTE__ Default is `menu-start`

* ##### Events
  * `logout`: Logout event fired from options box logout/menu link for logout.

* ##### Router Options
  * Router config options
  ```ts
  configureRouter(config, router: Router) {
    // Show logo in side menu
    config.options.showLogo = true;
    // Show logout link in side menu
    config.options.showAuthentication = true;
    // Add when using authorization
    config.addPipelineStep('authorize', AuthInterceptor);
  }
  ```

  * Route extras, add settings to individual routes that have `nav:true`
  ```ts
  settings: {
    // Disable route menu link
    disabled: 'bool',

    // Title to used for menu, this allows the route to show a different title in menu and the standard title is used for document title
    menuTitle: 'string',

    // Create a section
    sectionStart: 'bool',
    sectionTitle: 'string',

    // Icon to displayed
    icon: 'classname'
  }
  ```
