# UI Viewport


* ##### ui-datagrid

  ```html
  <ui-datagrid data.bind="array" summary-row.bind="data object"
    sort-column="data-id" sort-order="asc | desc">
    
    <ui-dg-empty>
      <!-- display when no records found -->
      <h4>No records found</h4>
      <ui-button>Refesh</ui-button>
    </ui-dg-empty>
    
    <!-- columns -->
    ...
  </ui-datagrid>
  ```
  
* ##### ui-dg-column
  
  ```html
  <ui-dg-column data-id="property id" width="px | em" min-width="px | em"
    format="date | number format" display.call="fn(value,record)" value.call="fn(value,record)"
    [date | time | datetime | age | number | currency | percent] [start | center | end] 
    [locked] [sortable] [resizeable]>Column Label</ui-dg-column>
  ```
  * `data-id`: Record property id
  * `display.call`: Function must return a string or HTML markup
  * `value.call`: Function must return value, called before formatting
  
* ##### ui-dg-link
  
  ```html
  <ui-dg-link data-id="property id" width="px | em" min-width="px | em"
    format="date | number format" display.call="fn(value,record)" value.call="fn(value,record)"
    label="Link Label" icon[callable]="icon class | property id | fn(value.record)" click.trigger="fn($event)"
    [date | time | datetime | age | number | currency | percent] [start | center | end] 
    [locked] [sortable] [resizeable]>Column Label</ui-dg-link>
  ```
  * `label`: (optional) if specified all links will display label, else will display formatted data-id property
  * `icon`: (optional) icon class
  * `icon.call`: (optional) must return string of css class(es)
  * `click`: $event.detail object `values`, `record`
  
* ##### ui-dg-button

  Similar to link, but display as button
  
  ```html
  <ui-dg-button data-id="property id" width="px | em" min-width="px | em"
    format="date | number format" display.call="fn(value,record)" value.call="fn(value,record)"
    label="Link Label" icon[callable]="icon class | property id | fn(value.record)" click.trigger="fn($event)"
    theme[callable]="button theme" dropdown.bind="menu reference" menuopen.trigger="fn($event)"
    [date | time | datetime | age | number | currency | percent] [start | center | end] 
    [locked] [sortable] [resizeable]>Column Label</ui-dg-button>
  ```
  * `label`: (optional) if specified all links will display label, else will display formatted data-id property
  * `icon`: (optional) icon class
  * `icon.call`: (optional) must return string of css class(es)
  * `theme`: (optional) button theme [primary | secondary | dark | info | danger | success | warning]
  * `theme.call`: (optional) must return string of button theme
  * `dropdown`: See UIButton for details
  * `menuopen`: Callback before displaying dropdown, useful for customizing the dropdown for each record
  * `click`: $event.detail object `values`, `record`