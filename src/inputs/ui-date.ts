// UI Date Input
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";
import {moment} from "../utils/ui-utils";

@autoinject()
@customElement('ui-date')
export class UIDate extends UIInputGroup {
    private __dual = false;

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    date: string = moment().format();
	/**
	 * @property    value-end
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    dateEnd: string = moment().format();
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
	 * @property    placeholder-second
	 * @type        string
	 */
    @bindable()
    placeholderSecond: string = '';

	/**
	 * @property    dir
	 * @type        string
	 */
    @bindable()
    dir: string = '';

	/**
	 * @property    format
	 * @type        string
	 */
    @bindable()
    format: string = 'DD-MMM-YYYY';

	/**
	 * @property    options
	 * @type        string
	 */
    @bindable()
    options: UIDateOptions = new UIDateOptions();

    __today;
    __dateStart: UIDateOptions = new UIDateOptions();
    __dateEnd: UIDateOptions = new UIDateOptions();
    showTime = false;

    constructor(element: Element) {
        super(element);
    }

    bind() {
        super.bind();
        this.__dual = this.element.hasAttribute('range');

        this.__today = moment().format('DD');

        Object.assign(this.__dateStart, this.options);
        Object.assign(this.__dateEnd, this.options);

        this.dateChanged(this.date);

        this.showTime = this.format.toLowerCase().indexOf('hh:mm') > 0;

        if (this.__dual) {
            this.dateEndChanged(this.dateEnd);
            this.__dateEnd.minDate = this.date;
        }
    }

    dateChanged(newValue) {
        if (moment(newValue).isValid()) {
            this.__value = moment(newValue).format(this.format);
            if (this.__dual) {
                this.__dateEnd.minDate = newValue;
                if (moment(newValue).isAfter(this.dateEnd)) this.dateEnd = newValue;
            }
        }
        else {
            this.__value = '';
        }
    }

    dateEndChanged(newValue) {
        if (moment(newValue).isValid()) {
            this.__value2 = moment(newValue).format(this.format);
            //if (this.__dual)this.__dateStart.maxDate = newValue;
        }
        else {
            this.__value2 = '';
        }
    }

}

export class UIDateOptions {
    minDate = null;
    maxDate = null;
    showTime = false;
    validDates: Array<any> | Function;
    invalidDates: Array<any> | Function;

    constructor(o: any = {}) {
        Object.assign(this, o);
    }
}
