var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    var UIForm = (function () {
        function UIForm(element) {
            this.element = element;
            this.errors = [];
            this.value = '';
            this.rows = 12;
            this.dir = 'ltr';
            this.maxlength = 10000;
            this.placeholder = '';
            this.disabled = false;
            this.readonly = false;
            this.__help = false;
            this.__preview = false;
            this.__disableTools = false;
            this.__counter = element.hasAttribute('charcount');
        }
        UIForm.prototype.bind = function () {
            this.disabled = isTrue(this.disabled);
            this.readonly = isTrue(this.readonly);
        };
        UIForm.prototype.toolClicked = function (evt) {
            var _this = this;
            var btn;
            if (!(btn = getParentByTag(evt.target, 'button')))
                return;
            if (!(btn = btn['dataset']["id"]))
                return;
            var val = this.value || '';
            var diff = 0, start = this.__input.selectionStart, end = this.__input.selectionEnd, sub = val.substr(start, end - start) || 'EditThis';
            switch (btn) {
                case 'h1':
                    diff = 3;
                    this.value = val.substr(0, start) + ("\n# " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h2':
                    diff = 4;
                    this.value = val.substr(0, start) + ("\n## " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h3':
                    diff = 5;
                    this.value = val.substr(0, start) + ("\n### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h4':
                    diff = 6;
                    this.value = val.substr(0, start) + ("\n#### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h5':
                    diff = 7;
                    this.value = val.substr(0, start) + ("\n##### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h6':
                    diff = 8;
                    this.value = val.substr(0, start) + ("\n###### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'b':
                    diff = 3;
                    this.value = val.substr(0, start) + (" __" + sub + "__ ") + val.substr(end);
                    break;
                case 'i':
                    diff = 2;
                    this.value = val.substr(0, start) + (" _" + sub + "_ ") + val.substr(end);
                    break;
                case 's':
                    diff = 3;
                    this.value = val.substr(0, start) + (" ~~" + sub + "~~ ") + val.substr(end);
                    break;
                case 'a':
                    diff = 2;
                    this.value = val.substr(0, start) + (" [" + sub + "](Link_Url_Here) ") + val.substr(end);
                    break;
                case 'img':
                    diff = 3;
                    this.value = val.substr(0, start) + (" ![" + sub + "](Image_Url_Here) ") + val.substr(end);
                    break;
                case 'ul':
                    diff = 2;
                    sub = sub.replace(/^.+$/gm, function (t) { return ("* " + t); });
                    this.value = val.substr(0, start) + (sub + "\n") + val.substr(end);
                    break;
                case 'ol':
                    var i = 1;
                    diff = 3;
                    sub = sub.replace(/^.+$/gm, function (t) { return ((i++ == 1 ? '1.' : '*') + " " + t); });
                    this.value = val.substr(0, start) + (sub + "\n") + val.substr(end);
                    break;
                case 'help':
                    this.__preview = false;
                    this.__disableTools = this.__help = !this.__help;
                    break;
                case 'preview':
                    this.__help = false;
                    this.__disableTools = this.__preview = !this.__preview;
                    break;
            }
            this.__input.focus();
            if (sub == 'EditThis' && btn != 'preview' && btn != 'help')
                ui_event_1.UIEvent.queueTask(function () { return _this.__input.setSelectionRange(start + diff, start + diff + sub.length); });
        };
        UIForm.prototype.clear = function () {
            this.value = '';
            this.__input.focus();
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIForm.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        UIForm.prototype.fireChange = function (evt) {
            evt.stopPropagation();
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIForm.prototype.fireBlur = function () {
            this.__focus = false;
            ui_event_1.UIEvent.fireEvent('blur', this.element);
        };
        UIForm.prototype.fireFocus = function () {
            this.__focus = true;
            ui_event_1.UIEvent.fireEvent('focus', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIForm.prototype, "readonly", void 0);
        UIForm = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-markdown'),
            aurelia_framework_1.inlineView("<template class=\"ui-md-editor ui-input-wrapper ${__focus?'ui-focus':''} ${__counter?'ui-ta-counter':''} \n  ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\">\n<span class=\"ui-invalid-icon fi-ui\"></span>\n<span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n<div class=\"ui-input-div ui-inwrap-column ${__preview?'ui-watermark p':__help?'ui-watermark h':''}\">\n  <ui-toolbar start click.trigger=\"toolClicked($event)\">\n  <div class=\"ui-button-group ui-horizontal\">\n  <button type=\"button\" tabindex=\"-1\" data-id=\"h1\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><strong>H1</strong></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"h2\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><strong>H2</strong></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"h3\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><strong>H3</strong></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"h4\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><strong>H4</strong></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"h5\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><strong>H5</strong></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"h6\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><strong>H6</strong></button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <button type=\"button\" tabindex=\"-1\" data-id=\"b\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-bold\"></span></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"i\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-italic\"></span></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"s\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-strike\"></span></button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <button type=\"button\" tabindex=\"-1\" data-id=\"a\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-link\"></span></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"img\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-image\"></span></button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <button type=\"button\" tabindex=\"-1\" data-id=\"ul\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-list-bullet\"></span></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"ol\" disabled.bind=\"__disableTools||disabled||readonly\" class='ui-button ui-small ui-square ui-button-default'><span class=\"ui-button-icon fi-ui-md-list-number\"></span></button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <button type=\"button\" tabindex=\"-1\" data-id=\"help\" disabled.bind=\"disabled||readonly\" class='ui-button ui-small ui-button-info ui-square ui-button-default'><span class=\"ui-button-icon ${__help?'fi-ui-md-edit':'fi-ui-md-help'}\"></span></button>\n  <button type=\"button\" tabindex=\"-1\" data-id=\"preview\" disabled.bind=\"disabled||readonly\" class='ui-button ui-small ui-button-info ui-square ui-button-default'><span class=\"ui-button-icon ${__preview?'fi-ui-md-edit':'fi-ui-md-preview'}\"></span></button>\n  </div>\n  </ui-toolbar>\n  \n  <textarea class=\"ui-input\" rows.bind=\"rows\" value.bind=\"value\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || busy\" readonly.bind=\"readonly\" dir.bind=\"dir\"\n    focus.trigger=\"fireFocus()\" blur.trigger=\"fireBlur()\" maxlength.bind=\"maxlength\" ref=\"__input\" change.trigger=\"fireChange($event)\"></textarea>\n  <span class=\"ui-ta-counter\" if.bind=\"__counter\">${value.length & debounce} of ${maxlength}</span>\n  <div class='ui-md-preview ui-pad-all ui-markdown' show.bind=\"__help\">\n  <h2 class=\"ui-small-caps ui-text-primary ui-strong\">Markdown Syntax</h2>\n  <hr/>\n  <p>Add a blank line to create a separate paragraph</p>\n  <hr/>\n  <p class=\"ui-text-primary\">Headers</p>\n\n  <div>\n      <span>H1 <code class=\"ui-selectable\"># Header</code> <h1 class=\"ui-inline\">Header</h1></span>\n      <br/>\n      <span>H2 <code class=\"ui-selectable\">## Header</code> <h2 class=\"ui-inline\">Header</h2></span>\n      <br/>\n      <span>H3 <code class=\"ui-selectable\">### Header</code> <h3 class=\"ui-inline\">Header</h3></span>\n      <br/>\n      <span>H4 <code class=\"ui-selectable\">#### Header</code> <h4 class=\"ui-inline\">Header</h4></span>\n      <br/>\n      <span>H5 <code class=\"ui-selectable\">##### Header</code> <h5 class=\"ui-inline\">Header</h5></span>\n      <br/>\n      <span>H6 <code class=\"ui-selectable\">###### Header</code> <h6 class=\"ui-inline\">Header</h6></span>\n      <br/>\n  </div>\n\n  <p class=\"ui-text-primary\">Styles</p>\n\n  <p>\n      <span>Italic <code class=\"ui-selectable\">_Italic Text_</code>: <i>Italic</i></span>\n      <br/>\n      <span>Bold <code class=\"ui-selectable\">__Bold Text__</code>: <b>Bold</b></span>\n      <br/>\n      <span>Strikethrough <code class=\"ui-selectable\">~~Strikethrough~~</code>: <del>Strikethrough</del></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Links</p>\n\n  <p>\n      <code class=\"ui-selectable\">[link text](link URL)</code>\n      <br/>\n      <em>any url will be converted to a link, use the above to display custom text instead of url in the link.</em>\n      <br/>\n      <span>eg. <code>&lt;a href=\"url\">Link Text&lt;/a></code></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Images</p>\n\n  <p>\n      <code class=\"ui-selectable\">![alt text](image URL)</code>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Lists</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <br/>\n      <span><code class=\"ui-selectable\">1. list item</code>: 1. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 2. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 3. list item</span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Tables</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">|Head|Head |Head|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|:---|:---:|---:|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <br/>\n      <table>\n          <thead>\n              <tr>\n                  <th class=\"ui-text-start\">Head</th>\n                  <th class=\"ui-text-center\">Head</th>\n                  <th class=\"ui-text-end\">Head</th>\n              </tr>\n          </thead>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n      </table>\n  </p>\n  <br/>\n  <br/></div>\n  <div class=\"ui-md-preview ui-pad-all ui-markdown\" show.bind=\"__preview\" innerhtml.bind=\"value | markdown\" dir.bind=\"dir\"></div></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIForm);
        return UIForm;
    }());
    exports.UIForm = UIForm;
});
