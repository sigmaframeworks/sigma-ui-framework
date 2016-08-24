// UI Textarea
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";
import {_, UIUtils} from "../utils/ui-utils";

@autoinject()
@customElement('ui-textarea')
export class UITextArea extends UIInputGroup {
    __list;
    __listCss;
    __focus;
    __hilight;
    __autoComplete;
    __acRegExp;

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: string = '';
	/**
	 * @property    checked
	 * @type        boolean
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    checked: boolean = false;
	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable()
    disabled: boolean = false;
	/**
	 * @property    readonly
	 * @type        boolean
	 */
    @bindable()
    readonly: boolean = false;

	/**
	 * @property    prefix-icon
	 * @type        string
	 */
    @bindable()
    prefixIcon: string;
	/**
	 * @property    prefix-text
	 * @type        string
	 */
    @bindable()
    prefixText: string;

	/**
	 * @property    suffix-icon
	 * @type        string
	 */
    @bindable()
    suffixIcon: string;
	/**
	 * @property    suffix-text
	 * @type        string
	 */
    @bindable()
    suffixText: string;

	/**
	 * @property    button-icon
	 * @type        string
	 */
    @bindable()
    buttonIcon: string;
	/**
	 * @property    button-text
	 * @type        string
	 */
    @bindable()
    buttonText: string;

	/**
	 * @property    help-text
	 * @type        string
	 */
    @bindable()
    helpText: string;

	/**
	 * @property    placeholder
	 * @type        string
	 */
    @bindable()
    placeholder: string = '';

	/**
	 * @property    rows
	 * @type        string
	 */
    @bindable()
    rows: string = '5';

	/**
	 * @property    dir
	 * @type        string
	 */
    @bindable()
    dir: string = '';


	/**
	 * @property    auto-complete
	 * @type        string
	 */
    @bindable()
    autoComplete: any;

    constructor(element: Element) {
        super(element);
    }

    bind() {
        super.bind();
        if (!isEmpty(this.autoComplete))
            this.autoCompleteChanged(this.autoComplete);
    }

    attached() {
        super.attached();

        if (!isEmpty(this.autoComplete)) {
            this.__input.onkeyup = (evt) => this.showList(evt);
            this.__acRegExp = eval(`/\\b([${this.ALPHA}${this.DIGIT}]{1,})$/`);

            this.__listCss = {
                top: 0, left: 0, right: 'auto', width: '200px', 'max-height': '400px'
            }
        }
    }

    showList(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
        let code = (evt.keyCode || evt.which);

        if (code == 13) {
            return false;
        }

        let text = this.__input.value.substring(0, this.__input.selectionEnd);
        let query = text.match(this.__acRegExp);
        this.__focus = false;
        if (query !== null) {
            var rx = new RegExp(UIUtils.getAscii(query[1]), 'i');
            this.__autoComplete = _.filter(this.autoComplete, v => {
                let asc = UIUtils.getAscii(v);
                return rx.test(asc);
            });
            let pos = this.getCaretCoordinates();
            this.__listCss = Object.assign(this.__listCss, pos);
            this.__focus = this.__autoComplete.length > 0;
        }
        return true;
    }

    autoCompleteChanged(newValue) {
        if (_.isString(newValue))
            newValue = newValue.split(',');
        this.autoComplete = newValue.sort();
    }

    keyDown(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
        let code = (evt.keyCode || evt.which);

        if (code == 13 && this.__focus) {
            let h = this.__list.querySelector('.ui-list-item.hilight');
            if (h !== null)
                this.__replace(h.dataset.value);
            this.__focus = false;
            return false;
        }

        if (code === 38) {
            let h = this.__list.querySelector('.ui-list-item.hilight');
            // if found hilight or selected get previous
            if (h !== null) h = <HTMLElement>h.previousElementSibling;
            // if no hilight get first
            if (h === null) h = this.__list.querySelector('.ui-list-item');
            if (h != null) {
                if (h !== null) {
                    if (this.__hilight != null) this.__hilight.classList.remove('hilight');
                    (this.__hilight = h).classList.add('hilight');
                    this.__scrollIntoView();
                }
            }
            evt.preventDefault();
            return false;
        }
        else if (code === 40) {
            let h = this.__list.querySelector('.ui-list-item.hilight');
            // if found hilight or selected get next
            if (h !== null) h = <HTMLElement>h.nextElementSibling;
            // if no selected get first
            if (h === null) h = this.__list.querySelector('.ui-list-item');
            if (h !== null) {
                if (this.__hilight != null) this.__hilight.classList.remove('hilight');
                (this.__hilight = h).classList.add('hilight');
                this.__scrollIntoView();
            }
            evt.preventDefault();
            return false;
        }
        return true;
    }

    __replace(selected) {
        var pre = this.__input.value.substring(0, this.__input.selectionEnd);
        var post = this.__input.value.substring(this.__input.selectionEnd);
        pre = pre.replace(this.__acRegExp, ' ' + selected);
        this.__value = (pre + post).replace(/\s{2,}/g, ' ');
        this.__input.selectionStart = this.__input.selectionEnd = pre.length;
    }

    __clicked($event) {
        if ($event.button !== 0) return true;
        let o: any = getParentByClass($event.target, 'ui-list-item', 'ui-list');
        if (o !== null) {
            this.__replace(o.dataset.value);
            this.__focus = false;
        }
    }

    __scrollIntoView() {
        this.__list.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.__list.offsetHeight / 2) : 0);
    }

    // Compute autoComplete
    properties = [
        'direction', // RTL support
        'boxSizing',
        'width',
        'height',
        'overflowX',
        'overflowY',

        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'borderStyle',

        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',

        'fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'fontSize',
        'fontSizeAdjust',
        'lineHeight',
        'fontFamily',

        'textAlign',
        'textTransform',
        'textIndent',
        'textDecoration',

        'letterSpacing',
        'wordSpacing',

        'tabSize',
        'MozTabSize'

    ];

    isBrowser = (typeof window !== 'undefined');
    isFirefox = (this.isBrowser && window['mozInnerScreenX'] != null);

    getCaretCoordinates() {
        let element: any = this.__input;
        let position = this.__input.selectionStart;
        if (!this.isBrowser) {
            throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
        }

        var debug = false;
        if (debug) {
            var el = document.querySelector('#input-textarea-caret-position-mirror-div');
            if (el) {
                el.parentNode.removeChild(el);
            }
        }

        // mirrored div
        var div = document.createElement('div');
        div.id = 'input-textarea-caret-position-mirror-div';
        document.body.appendChild(div);

        var style = div.style;
        var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9

        // default textarea styles
        style.whiteSpace = 'pre-wrap';
        if (element.nodeName !== 'INPUT')
            style.wordWrap = 'break-word'; // only for textarea-s

        // position off-screen
        style.position = 'absolute'; // required to return coordinates properly
        if (!debug)
            style.visibility = 'hidden'; // not 'display: none' because we want rendering

        // transfer the element's properties to the div
        _.forEach(this.properties, prop => {
            style[prop] = computed[prop];
        });

        if (this.isFirefox) {
            // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
            if (element.scrollHeight > parseInt(computed.height))
                style.overflowY = 'scroll';
        } else {
            style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
        }

        div.textContent = element.value.substring(0, position);
        // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
        if (element.nodeName === 'INPUT')
            div.textContent = div.textContent.replace(/\s/g, '\u00a0');

        var span = document.createElement('span');
        // Wrapping must be replicated *exactly*, including when a long word gets
        // onto the next line, with whitespace at the end of the line before (#7).
        // The  *only* reliable way to do that is to copy the *entire* rest of the
        // textarea's content into the <span> created at the caret position.
        // for inputs, just '.' would be enough, but why bother?
        span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
        div.appendChild(span);

        var coordinates = {
            top: (span.offsetTop + parseInt(computed['borderTopWidth']) + 20) + 'px',
            left: (span.offsetLeft + parseInt(computed['borderLeftWidth'])) + 'px'
        };

        if (debug) {
            span.style.backgroundColor = '#aaa';
        } else {
            document.body.removeChild(div);
        }

        return coordinates;
    }
}
