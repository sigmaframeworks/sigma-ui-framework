// UI Tag Input
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject, TaskQueue} from "aurelia-framework";
import {UIListBehaviour} from "./ui-listing";
import {_, UIUtils} from "../utils/ui-utils";
import {UIEvent} from "../utils/ui-event";

@autoinject
@customElement('ui-tags')
export class UITags extends UIListBehaviour {

    __tagInput;
    __ignoreChange;
    __subscribeSearch;

    __tags = [];
    __onlyAvailable = true;

    constructor(element: Element, public taskQueue: TaskQueue) {
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
    displayProperty: any = 'name';
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
        this.__noList = this.element.hasAttribute('no-list');
    }

    attached() {
        super.attached();
        this.taskQueue.queueMicroTask(() => this.valueChanged(this.value));
    }

    detached() {
    }

    valueChanged(newValue) {
        let v: any = newValue || [];
        if (!_.isArray(v)) v = v.split(',');
        if (this.__noList) {
            this.__tags = v;
        }
        else {
            this.__options = this.__available = _.cloneDeep(this.options);
            this.__tags = _['removeByValues'](this.__available, this.valueProperty, v);
        }
    }

    optionsChanged(newValue) {
        this.__noResult = isEmpty(newValue);
        this.options = newValue;
        this.__isFiltered = false;
        this.__isGrouped = !_.isArray(newValue);
        this.__options = this.__available = _.cloneDeep(this.options);
    }

    readonlyChanged() {
        super.readonlyChanged();
        if (isTrue(this.readonly))
            this.__tagInput.classList.add('ui-readonly');
        else
            this.__tagInput.classList.remove('ui-readonly');
    }

    disable(disabled?) {
        super.disable(disabled);
        if (disabled === true || this.disabled === true || this.checked === false)
            this.__tagInput.classList.add('ui-disabled');
        else
            this.__tagInput.classList.remove('ui-disabled');
    }

    __select(item) {
        if (this.__noList) {
            let v = _.trim(this.__searchText);
            if (!isEmpty(v) && this.__tags.indexOf(v) == -1) this.__tags.push(v);
            this.value = this.__tags.join(',');
            this.__searchText = '';
            this.__focus = true;
        }
        else if (item) {
            this.__searchText = '';
            this.__tags.push(item['model']);
            this.value = _.map(this.__tags, this.valueProperty).join(',');
        }
    }

    __deselect(item) {
        this.__tags.splice(this.__tags.indexOf(item), 1);
        if (this.__noList) {
            this.value = this.__tags.join(',');
        }
        else {
            // _.remove(this.__tags, [this.valueProperty, item[this.valueProperty]]);
            this.value = _.map(this.__tags, this.valueProperty).join(',');
        }
    }

    __clicked($event) {
        let o = getParentByClass($event.target, 'ui-list-item', 'ui-list');
        if (o !== null) {
            this.__select(o);
        }
    }

    __gotFocus() {
        this.__focus = true;
        if (!this.__noList) {
            let el = <HTMLElement>this.element;
            if (el.offsetParent.scrollTop + el.offsetParent['offsetHeight'] < el.offsetHeight + el.offsetTop + 50) {
                this.__reverse = true;
                this.__list.style.bottom = el.offsetHeight + 'px';
            }
            else {
                this.__reverse = false;
                this.__list.style.bottom = "auto";
            }
            UIEvent.queueTask(() => {
                this.__input.select();
                this.__scrollIntoView();
            });
        }
        this.__tagInput.classList.add('ui-focus');
    }

    __lostFocus() {
        this.__focus = false;
        this.__tagInput.classList.remove('ui-focus');
    }

    inputClicked(evt) {
        let b = getParentByClass(evt.target, 'ui-tag', 'ui-input');
        if (b !== null) this.__deselect(b['model']);
    }

    formatter() {
        return this.value;
    }

    __scrollIntoView() {
    }
}
