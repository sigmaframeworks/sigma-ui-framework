// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, bindingMode, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@customElement('ui-markdown')
@inlineView(`<template class="ui-md-editor ui-input-wrapper \${__focus?'ui-focus':''} \${__counter?'ui-ta-counter':''} 
  \${disabled?'ui-disabled':''} \${readonly || busy?'ui-readonly':''}">
<span class="ui-invalid-icon fi-ui"></span>
<span class="ui-invalid-errors"><ul><li repeat.for="e of __errors">\${e.message}</li></ul></span>
<div class="ui-input-div ui-inwrap-column \${__preview?'ui-watermark p':__help?'ui-watermark h':''}">
  <ui-toolbar start click.trigger="toolClicked($event)">
  <div class="ui-button-group ui-horizontal">
  <button type="button" tabindex="-1" data-id="h1" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><strong>H1</strong></button>
  <button type="button" tabindex="-1" data-id="h2" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><strong>H2</strong></button>
  <button type="button" tabindex="-1" data-id="h3" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><strong>H3</strong></button>
  <button type="button" tabindex="-1" data-id="h4" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><strong>H4</strong></button>
  <button type="button" tabindex="-1" data-id="h5" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><strong>H5</strong></button>
  <button type="button" tabindex="-1" data-id="h6" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><strong>H6</strong></button>
  </div>
  <div class="ui-button-group ui-horizontal">
  <button type="button" tabindex="-1" data-id="b" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-bold"></span></button>
  <button type="button" tabindex="-1" data-id="i" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-italic"></span></button>
  <button type="button" tabindex="-1" data-id="s" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-strike"></span></button>
  </div>
  <div class="ui-button-group ui-horizontal">
  <button type="button" tabindex="-1" data-id="a" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-link"></span></button>
  <button type="button" tabindex="-1" data-id="img" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-image"></span></button>
  </div>
  <div class="ui-button-group ui-horizontal">
  <button type="button" tabindex="-1" data-id="ul" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-list-bullet"></span></button>
  <button type="button" tabindex="-1" data-id="ol" disabled.bind="__disableTools||disabled||readonly" class='ui-button ui-small ui-square ui-button-default'><span class="ui-button-icon fi-ui-md-list-number"></span></button>
  </div>
  <div class="ui-button-group ui-horizontal">
  <button type="button" tabindex="-1" data-id="help" disabled.bind="disabled||readonly" class='ui-button ui-small ui-button-info ui-square ui-button-default'><span class="ui-button-icon \${__help?'fi-ui-md-edit':'fi-ui-md-help'}"></span></button>
  <button type="button" tabindex="-1" data-id="preview" disabled.bind="disabled||readonly" class='ui-button ui-small ui-button-info ui-square ui-button-default'><span class="ui-button-icon \${__preview?'fi-ui-md-edit':'fi-ui-md-preview'}"></span></button>
  </div>
  </ui-toolbar>
  
  <textarea class="ui-input" rows.bind="rows" value.bind="value" placeholder.bind="placeholder" disabled.bind="disabled || busy" readonly.bind="readonly" dir.bind="dir"
    focus.trigger="fireFocus()" blur.trigger="fireBlur()" maxlength.bind="maxlength" ref="__input" change.trigger="fireChange($event)"></textarea>
  <span class="ui-ta-counter" if.bind="__counter">\${value.length & debounce} of \${maxlength}</span>
  <div class='ui-md-preview ui-pad-all ui-markdown' show.bind="__help">
  <h2 class="ui-small-caps ui-text-primary ui-strong">Markdown Syntax</h2>
  <hr/>
  <p>Add a blank line to create a separate paragraph</p>
  <hr/>
  <p class="ui-text-primary">Headers</p>

  <div>
      <span>H1 <code class="ui-selectable"># Header</code> <h1 class="ui-inline">Header</h1></span>
      <br/>
      <span>H2 <code class="ui-selectable">## Header</code> <h2 class="ui-inline">Header</h2></span>
      <br/>
      <span>H3 <code class="ui-selectable">### Header</code> <h3 class="ui-inline">Header</h3></span>
      <br/>
      <span>H4 <code class="ui-selectable">#### Header</code> <h4 class="ui-inline">Header</h4></span>
      <br/>
      <span>H5 <code class="ui-selectable">##### Header</code> <h5 class="ui-inline">Header</h5></span>
      <br/>
      <span>H6 <code class="ui-selectable">###### Header</code> <h6 class="ui-inline">Header</h6></span>
      <br/>
  </div>

  <p class="ui-text-primary">Styles</p>

  <p>
      <span>Italic <code class="ui-selectable">_Italic Text_</code>: <i>Italic</i></span>
      <br/>
      <span>Bold <code class="ui-selectable">__Bold Text__</code>: <b>Bold</b></span>
      <br/>
      <span>Strikethrough <code class="ui-selectable">~~Strikethrough~~</code>: <del>Strikethrough</del></span>
      <br/>
  </p>

  <p class="ui-text-primary">Links</p>

  <p>
      <code class="ui-selectable">[link text](link URL)</code>
      <br/>
      <em>any url will be converted to a link, use the above to display custom text instead of url in the link.</em>
      <br/>
      <span>eg. <code>&lt;a href="url">Link Text&lt;/a></code></span>
      <br/>
  </p>

  <p class="ui-text-primary">Images</p>

  <p>
      <code class="ui-selectable">![alt text](image URL)</code>
      <br/>
  </p>

  <p class="ui-text-primary">Lists</p>

  <p>
      <span><code class="ui-selectable">* list item</code>: &#8226; list item</span>
      <br/>
      <span><code class="ui-selectable">* list item</code>: &#8226; list item</span>
      <br/>
      <span><code class="ui-selectable">* list item</code>: &#8226; list item</span>
      <br/>
      <br/>
      <span><code class="ui-selectable">1. list item</code>: 1. list item</span>
      <br/>
      <span><code class="ui-selectable">* &nbsp;list item</code>: 2. list item</span>
      <br/>
      <span><code class="ui-selectable">* &nbsp;list item</code>: 3. list item</span>
      <br/>
  </p>

  <p class="ui-text-primary">Tables</p>

  <p>
      <span><code class="ui-selectable">|Head|Head |Head|</code></span>
      <br/>
      <span><code class="ui-selectable">|:---|:---:|---:|</code></span>
      <br/>
      <span><code class="ui-selectable">|Left Align|Center Align|Right Aligned|</code></span>
      <br/>
      <span><code class="ui-selectable">|Left Align|Center Align|Right Aligned|</code></span>
      <br/>
      <br/>
      <table>
          <thead>
              <tr>
                  <th class="ui-text-start">Head</th>
                  <th class="ui-text-center">Head</th>
                  <th class="ui-text-end">Head</th>
              </tr>
          </thead>
          <tr>
              <td class="ui-text-start">Left</td>
              <td class="ui-text-center">Center</td>
              <td class="ui-text-end">Right</td>
          </tr>
          <tr>
              <td class="ui-text-start">Left</td>
              <td class="ui-text-center">Center</td>
              <td class="ui-text-end">Right</td>
          </tr>
      </table>
  </p>
  <br/>
  <br/></div>
  <div class="ui-md-preview ui-pad-all ui-markdown" show.bind="__preview" innerhtml.bind="value | markdown" dir.bind="dir"></div></div></template>`)
export class UIForm {
  constructor(public element: Element) {
    this.__counter = element.hasAttribute('charcount');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
    this.readonly = isTrue(this.readonly);
  }

  __input;
  __counter;
  errors = [];

  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value = '';

  @bindable() rows = 12;
  @bindable() dir = 'ltr';
  @bindable() maxlength = 10000;
  @bindable() placeholder = '';
  @bindable() disabled = false;
  @bindable() readonly = false;

  __help = false;
  __preview = false;
  __disableTools = false;
  toolClicked(evt) {
    let btn;
    if (!(btn = getParentByTag(evt.target, 'button'))) return;
    if (!(btn = btn['dataset']["id"])) return;

    let val = this.value || '';
    let diff = 0,
      start = this.__input.selectionStart,
      end = this.__input.selectionEnd,
      sub = val.substr(start, end - start) || 'EditThis';

    switch (btn) {
      case 'h1':
        diff = 3; this.value = val.substr(0, start) + `\n# ${sub}\n\n` + val.substr(end); break;
      case 'h2':
        diff = 4; this.value = val.substr(0, start) + `\n## ${sub}\n\n` + val.substr(end); break;
      case 'h3':
        diff = 5; this.value = val.substr(0, start) + `\n### ${sub}\n\n` + val.substr(end); break;
      case 'h4':
        diff = 6; this.value = val.substr(0, start) + `\n#### ${sub}\n\n` + val.substr(end); break;
      case 'h5':
        diff = 7; this.value = val.substr(0, start) + `\n##### ${sub}\n\n` + val.substr(end); break;
      case 'h6':
        diff = 8; this.value = val.substr(0, start) + `\n###### ${sub}\n\n` + val.substr(end); break;
      case 'b':
        diff = 3; this.value = val.substr(0, start) + ` __${sub}__ ` + val.substr(end); break;
      case 'i':
        diff = 2; this.value = val.substr(0, start) + ` _${sub}_ ` + val.substr(end); break;
      case 's':
        diff = 3; this.value = val.substr(0, start) + ` ~~${sub}~~ ` + val.substr(end); break;
      case 'a':
        diff = 2; this.value = val.substr(0, start) + ` [${sub}](Link_Url_Here) ` + val.substr(end); break;
      case 'img':
        diff = 3; this.value = val.substr(0, start) + ` ![${sub}](Image_Url_Here) ` + val.substr(end); break;
      case 'ul':
        diff = 2;
        sub = sub.replace(/^.+$/gm, (t) => `* ${t}`);
        this.value = val.substr(0, start) + `${sub}\n` + val.substr(end); break;
      case 'ol':
        var i = 1;
        diff = 3;
        sub = sub.replace(/^.+$/gm, (t) => `${i++ == 1 ? '1.' : '*'} ${t}`);
        this.value = val.substr(0, start) + `${sub}\n` + val.substr(end); break;
      case 'help':
        this.__preview = false; this.__disableTools = this.__help = !this.__help; break;
      case 'preview':
        this.__help = false; this.__disableTools = this.__preview = !this.__preview; break;
    }
    this.__input.focus();
    if (sub == 'EditThis' && btn != 'preview' && btn != 'help') UIEvent.queueTask(() => this.__input.setSelectionRange(start + diff, start + diff + sub.length));
  }

  clear() {
    this.value = ''; this.__input.focus();
    UIEvent.fireEvent('change', this.element, this.value);
  }

  busy;
  disable(disabled?) {
    this.busy = disabled;
  }

  fireChange(evt) {
    evt.stopPropagation();
    UIEvent.fireEvent('change', this.element, this.value);
  }

  __focus;
  fireBlur() {
    this.__focus = false;
    UIEvent.fireEvent('blur', this.element);
  }
  fireFocus() {
    this.__focus = true;
    UIEvent.fireEvent('focus', this.element);
  }
}
