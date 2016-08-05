COMPONENTS
----------

-	[UIForm](#uiform)
-	[UIMenu](#uimenu)
-	[UIPanel](#uipanel)
-	[UIDialog](#uidialog)
-	[UITabPanel](#uitabpanel)
-	[UITree](#uitree)
-	[UIDataGrid](#uidatagrid)
-	[UIPager](#uipager)
-	[UILogin](#uilogin)
-	[UIRibbon](#uiribbon)

---

### UIForm

-	Form layout can contain only two columns

```html
<ui-form busy.bind=? validation.bind=? submit.trigger=?>    
    <ui-row>
        <ui-column> <ui-input.....> </ui-column>
        <ui-column> <ui-input.....> </ui-column>
    </ui-row>
</ui-form>
```

---

### UIMenu

```html
<ui-menu (router.bind=? | menu.bind=?) menuclick.trigger=?>    
</ui-menu>
```

```typescript
menu:Array = [{
    id
    icon?
    title
    href?
    isActive
}, '-', 'Section']
```

-	`-` will create a separator
-	`string` will add a section header

---

### UIPanel

```html
<ui-panel>
    <!--optional header-->
    <ui-header collapse="true|false" close="true|false" primary|secondary>Title</ui-header>
    <!--optional toolbar-->
    <ui-toolbar>...</ui-toolbar>

    <ui-body scroll padded></ui-body>
</ui-panel>
```

---

### UIDialog

*Dialog content view*

```html
<template>
    <!-- any page component or panel -->
</template>
```

*Dialog content view-model must extend UIDialog*

```typescript
class MyDialog extends UIDialog {
    icon:string;
    title:string;
    width:string;
    height:string;

    modal: boolean;
    drag: boolean;
    resize: boolean;
    maximize: boolean;

    // The model being passed can be consumed in any of the following methods
    canActivate(model?){}
    activate(model?){}
}
```

*Initializing the view*

```typescript
import {UIDialogService} from "aurelia-ui-framework";

@inject(UIDialogService)
class AnyView {
    constructor(dialogService){}
    showDialog() {
        dialogService.show(MyDialog, model?);
    }
}
```

---

### UITabPanel

```html
<ui-tab-panel active-tab=?>
    <ui-tab label=? icon=? scroll|flex>
        <compose></compose>
        or
        <!-- any page component or panel -->
    </ui-tab>
</ui-tab-panel>
```

---

### UITree

```html
<ui-tree model.bind=? value.bind=? options.bind=?></ui-tree>
```

```typescript
treeOptions:UITreeOptions = {
  // show maximum of ? levels
  maxLevels: number;

  // show checkboxes
  showCheckbox: boolean;
  // show checkbox only at ? level, -1/null all levels
  checkboxLevel: number;

  showRoot: boolean;
  rootLabel: string;
}
```

```typescript
treeModel:Array<UITreeModel> = [{
  id: any;
  name: string;
  leaf: boolean;

  iconGlyph?: string;

  checked?: boolean;
  expanded?: boolean;
  isVisible?: boolean;
}]
```

---

### UIDataGrid

```html
<ui-datagrid data-list.bind=? summary-row="true | false" selectable rowselect.trigger=?
  default-sort=? default-order="asc | desc" linkclick.trigger=?>
    <ui-data-column data-id=? locked sortable resizeable
      (align) [start | center | end]
      (display) [link | edit | delete]
      (data-type) [text | date | datetime| from-now | number | currency]>Label</ui-data-column>
    ...
</ui-datagrid>
```

- DataGrid Attributes

  - `selectable` allow row selection

  - `rowselect` event trigger, access row model `$event.detail`

  - `linkclick` event trigger, `$event.detail = {dataId:column id, model: row model}`

-	More Column Attributes

	-	`data-sort=?` second sort column

	-	`format=?` date/number format

	-	`symbol=?` currency symbol

	-	`summary=?` summary type `sum`, `avg`

	-	`button-title=?`, `button-icon=?`, `button-theme=?` button display

-	Callable Attributes

	-	`button.call` callback function to return button config

	-	`display.call` callback function to return html string to display

	-	`value.call` callback function to return calculated value

	-	all callbacks are passed `{value, column, model}`, current value, column data-id and row model
