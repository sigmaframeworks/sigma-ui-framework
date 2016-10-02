// UI Language Selector
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";
import {_, UIUtils, Tether} from "../utils/ui-utils";
import {UIApplication} from "../utils/ui-application";
import {UIEvent} from "../utils/ui-event";
import {UIConstants} from "../utils/ui-constants";

@autoinject
@customElement('ui-language')
export class UILanguage extends UIInputGroup {
    __list;
    __focus;
    __options;
    __languages;
    __available;
    __tethered;

    static LANGUAGES = UIConstants.Languages;

    constructor(element: Element, app: UIApplication) {
        super(element);
    }

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: string = '';
	/**
	 * @property    languages
	 * @type        array | map
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    languages: any = [];
	/**
	 * @property    disabled
	 * @type        boolean
	 */
    @bindable()
    disabled: boolean = false;

    __errors = {};

    attached() {
        super.attached();
        UIEvent.queueTask(() => {
            this.__tethered = new Tether({
                element: this.__list,
                target: this.__input,
                attachment: 'top left',
                targetAttachment: 'bottom left',
                constraints: [
                    {
                        to: 'scrollParent',
                        attachment: 'together'
                    },
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ]
            });
            this.languagesChanged(this.languages);
            this.valueChanged(this.value);
        });
    }

    detached() {
        this.__tethered.element.remove();
        this.__tethered.destroy();
    }

    valueChanged(newValue) {
        if (newValue === null) return this.__value = '';
        let l: any = _.find(this.__languages, { 'id': newValue }) || null;
        this.__value = l === null ? '' : l.name;
    }

    formatter(evt) {
    }

    languagesChanged(newValue) {
        let s = [], a = [];
        if (isEmpty(newValue)) {
            a = _.clone(UILanguage.LANGUAGES);
        }
        else {
            let isMap = newValue instanceof Map;
            _.forEach(UILanguage.LANGUAGES, l => {
                if (_.isArray(newValue)) (newValue.indexOf(l.id) ? s.push(l) : a.push(l));
                else if (!isMap) (Object.keys(newValue).indexOf(l.id) > -1 ? s.push(l) : a.push(l));
                else if (isMap) (newValue.has(l.id) ? s.push(l) : a.push(l));
            });
        }
        this.__languages = s;
        this.__available = a;
    }

    clearErrors() {
        this.__errors = {};
    }
    addError(key) {
        this.__errors[key] = true;
    }

    __showFocus() {
        if (this.__focus) return this.__focus = false;
        this.__input.focus();
        this.__focus = true;
    }

    __gotFocus(show) {
        if (!show) return;
        this.__focus = true;
        this.__tethered.element.style.minWidth = this.__tethered.target.offsetWidth + 'px';
        this.__tethered.position();
    }

    __lostFocus() {
        setTimeout(() => this.__focus = false, 500);
    }

    __add(lang) {
        this.__languages.push(_.remove(this.__available, { 'id': lang.id })[0]);
        UIEvent.fireEvent('add', this.element, lang.id);
        this.__select(lang);
        this.__focus = false;
    }

    __select(lang) {
        if (UIEvent.fireEvent('beforeselect', this.element, lang.id) !== false) {
            this.value = lang.id;
            this.__value = lang.name;
            UIEvent.fireEvent('select', this.element, lang.id);
        }
        this.__focus = false;
    }

    __remove(lang) {
        this.__available.push(_.remove(this.__languages, { 'id': lang.id })[0]);
        if (this.__languages == null) this.__languages = [];
        UIEvent.fireEvent('delete', this.element, lang.id);
        if (this.value == lang.id) this.__select(this.__languages[0] || { id: '' });
        this.__focus = false;
    }
}
