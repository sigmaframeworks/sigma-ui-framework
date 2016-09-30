// UI Combobox
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIListBehaviour} from "./ui-listing";
import {_, UIUtils, Tether} from "../utils/ui-utils";
import {UIEvent} from "../utils/ui-event";

@autoinject
@customElement('ui-combo')
export class UIComboBox extends UIListBehaviour {

    constructor(element: Element) {
        super(element);
    }

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
	 * @property    dir
	 * @type        string
	 */
    @bindable()
    dir: string = '';

	/**
	 * @property    option
	 * @type        string
	 */
    @bindable()
    options: any = [];
	/**
	 * @property    value-property
	 * @type        string
	 */
    @bindable()
    valueProperty: string = 'id';
	/**
	 * @property    display-property
	 * @type        string
	 */
    @bindable()
    displayProperty: any = 'text';
	/**
	 * @property    icon-property
	 * @type        string
	 */
    @bindable()
    iconProperty: any = '';
	/**
	 * @property    icon-class
	 * @type        string
	 */
    @bindable()
    iconClass: any = '';

	/**
	 * @property    empty-text
	 * @type        string
	 */
    @bindable()
    emptyText = 'No Results Found...';

    bind() {
        super.bind();
        this.optionsChanged(this.options);
    }

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
            this.valueChanged(this.value);
        });
    }

    detached() {
        this.__tethered.element.remove();
        this.__tethered.destroy();
    }

    valueChanged(newValue) {
        if (!isEmpty(newValue)) {
            let v = _['findDeep'](this.options, this.valueProperty, newValue);
            this.__searchText = v ? v[this.displayProperty] : '';
            if (v === null) this.value = null;
            UIEvent.fireEvent('select', this.element, v);
        }
        else {
            this.value = this.__searchText = '';
            UIEvent.fireEvent('select', this.element, null);
        }
    }

    optionsChanged(newValue) {
        this.__noResult = isEmpty(newValue);
        this.options = newValue;
        this.__isFiltered = false;
        this.__isGrouped = !_.isArray(newValue);
        this.__options = _.cloneDeep(this.options || []);
        UIEvent.queueTask(() => this.valueChanged(this.value));
    }

    __select(item) {
        if (item !== null) {
            this.value = item.dataset['value'];
            this.__searchText = item.model[this.displayProperty];
        }
        else {
            this.value = this.__searchText = '';
        }
        if (this.__isFiltered) {
            this.__isFiltered = false;
            this.__options = _.cloneDeep(this.options);
            this.__noResult = isEmpty(this.__options);
        }
        this.__focus = false;
    }

    __clicked($event) {
        let o = getParentByClass($event.target, 'ui-list-item', 'ui-list');
        if (o !== null) {
            this.__select(this.__hilight = o);
        }
    }

    __showFocus() {
        if (this.__focus) return this.__focus = false;
        this.__input.focus();
        this.__focus = true;
    }

    __gotFocus(show) {
        this.__hilight = this.__list.querySelector(`[data-value="${this.value}"]`);
        if (show) this.__focus = true;

        // let el = <HTMLElement>this.__input;
        // if (this.showReverse()) {
        //     this.__reverse = true;
        //     this.__list.style.bottom = el.offsetHeight + 'px';
        // }
        // else {
        //     this.__reverse = false;
        //     this.__list.style.bottom = "auto";
        // }
        this.__tethered.element.style.minWidth = this.__tethered.target.offsetWidth + 'px';
        this.__tethered.position();
        UIEvent.queueTask(() => {
            this.__input.select();
            this.__scrollIntoView();
        });
    }

    __lostFocus() {
        if (this.__focus) this.__select(this.__hilight);
        setTimeout(() => this.__focus = false, 500);
    }

    formatter() {
        return this.value;
    }

    __scrollIntoView() {
        this.__list.scrollTop = (this.__hilight !== null ? this.__hilight.offsetTop - (this.__list.offsetHeight / 2) : 0);
    }
}
