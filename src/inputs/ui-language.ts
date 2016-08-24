// UI Language Selector
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";
import {_, UIUtils} from "../utils/ui-utils";
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

    static LANGUAGES = UIConstants.Languages;

    constructor(element: Element, app: UIApplication) {
        super(element);
    }

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    language: string = '';
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

    attached() {
        super.attached();
        this.languagesChanged(this.languages);
        this.languageChanged(this.language);
    }

    languageChanged(newValue) {
        if (newValue === null) return this.__value = '';
        let l: any = _.find(this.__languages, ['id', newValue]) || null;
        this.__value = l === null ? '' : l.name;
    }

    languagesChanged(newValue) {
        let s = [], a = [];
        let isMap = newValue instanceof Map;
        _.forEach(UILanguage.LANGUAGES, l => {
            if (!isMap && newValue.indexOf(l.id) == -1) a.push(l);
            if (!isMap && newValue.indexOf(l.id) > -1) s.push(l);
            if (isMap && newValue.has(l.id)) s.push(l);
            if (isMap && !newValue.has(l.id)) a.push(l);
        });
        this.__languages = s;
        this.__available = a;
    }

    formatter() {
        return this.value;
    }

    __add(lang) {
        this.__languages.push(_.remove(this.__available, ['id', lang.id])[0]);
        UIEvent.fireEvent('add', this.element, lang.id);
        this.__select(lang);
        this.__focus = false;
    }

    __select(lang) {
        this.language = lang.id;
        UIEvent.fireEvent('select', this.element, lang.id);
        this.__focus = false;
    }

    __remove(lang) {
        this.__available.push(_.remove(this.__languages, ['id', lang.id])[0]);
        if (this.__languages == null) this.__languages = [];
        UIEvent.fireEvent('delete', this.element, lang.id);
        this.__select(this.__languages[0] || { id: '' });
        this.__focus = false;
    }
}
