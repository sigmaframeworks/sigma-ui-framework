// UI Phone Input
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, useView, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";
import {_, UIUtils} from "../utils/ui-utils";
import {UIEvent} from "../utils/ui-event";

@autoinject()
@useView('./ui-input.html')
@customElement('ui-phone')
export class UIPhone extends UIInputGroup {
    private __phoneType = PhoneLib.TYPE.FIXED_LINE_OR_MOBILE;
    private __phoneFormat = PhoneLib.FORMAT.NATIONAL;
    private placeholder = '';
    private prefixText = '';
    private prefixIcon = '';
    private ignoreUpdate = true;

    __type = 'tel';

	/**
	 * @property    value
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value: string = '';
	/**
	 * @property    isd-code
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    isdCode: string = '';
	/**
	 * @property    area-code
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    areaCode: string = '';
	/**
	 * @property    phone
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    phone: string = '';
	/**
	 * @property    extension
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    extension: string = '';
	/**
	 * @property    country
	 * @type        string
	 */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    country: string = 'us';
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

    constructor(element: Element) {
        super(element);
    }

    bind() {
        super.bind();
        this.dir = 'ltr';
        if (this.element.hasAttribute('international')) {
            this.__phoneFormat = PhoneLib.FORMAT.INTERNATIONAL;
            this.prefixIcon = `ui-flag`;
        }
        else {
            this.prefixText = '+' + PhoneLib.getDialingCode(this.country);
        }

        this.placeholder = PhoneLib.getExample(this.country, this.__phoneType,
            this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL);

        this.ignoreUpdate = false;
        var val = this.value;
        if (isEmpty(val)) {
            if (!isEmpty(this.isdCode)) val += '+' + this.isdCode;
            if (!isEmpty(this.areaCode)) val += this.areaCode;
            if (!isEmpty(this.phone)) val += ' ' + this.phone;
            if (!isEmpty(this.extension)) val += ',' + this.extension;
        }
        if (this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL && !isEmpty(val)) {
            val = PhoneLib.format(val, this.country, PhoneLib.FORMAT.NATIONAL);
        }
        this.valueChanged(val);
    }

    attached() {
        super.attached();
        this.__input.oninput = (evt) => this.formatter(evt);
    }

    countryChanged() {
        this.prefixText = '+' + PhoneLib.getDialingCode(this.country);
        this.placeholder = PhoneLib.getExample(this.country, this.__phoneType,
            this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL);
        this.valueChanged(this.value);
    }

    valueChanged(newValue) {
        if (this.ignoreUpdate) return;
        this.ignoreUpdate = true;
        if (this.__phoneFormat === PhoneLib.FORMAT.INTERNATIONAL) {
            if (isEmpty(newValue)) this.prefixIcon = 'ui-flag';
            if (!isEmpty(newValue) && !/^\+/.test(newValue)) newValue = '+' + newValue;
        }
        if (!isEmpty(newValue)) {
            if (newValue === 'NaN') newValue = '';
            this.__value =
                PhoneLib.formatInput(newValue,
                    this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '',
                    false, true);
            this.value =
                PhoneLib.format(this.__value,
                    this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '',
                    PhoneLib.FORMAT.FULL);
        }
        else {
            this.__value = '';
        }
        this.processValue();
        this.ignoreUpdate = false;
    }

    formatter(evt) {
        this.ignoreUpdate = true;
        let newValue = evt.target.value;
        let start = this.__input.selectionStart;
        if (this.__phoneFormat === PhoneLib.FORMAT.INTERNATIONAL) {
            if (isEmpty(newValue)) this.prefixIcon = 'ui-flag';
            if (!isEmpty(newValue) && !/^\+/.test(newValue)) newValue = '+' + newValue;
        }
        if (!isEmpty(newValue)) {
            if (newValue === 'NaN') newValue = '';
            newValue = newValue.replace(/\sext\.\s$/, '');
            this.__value =
                PhoneLib.formatInput(newValue,
                    this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '',
                    false, true);
            this.value = PhoneLib.format(newValue,
                this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : '',
                PhoneLib.FORMAT.FULL);
        }
        else {
            this.value = '';
        }
        this.processValue();
        UIEvent.queueTask(() => {
            var x = /(ext\.\s\d)$/.test(this.__value) ? 6 :
                (/((\s\d)|(\+\d))$/.test(this.__value) ? 2 : 0);
            if (x) this.__input.setSelectionRange(start + x, start + x);
            this.ignoreUpdate = false;
        });
    }

    protected processValue() {
        if (this.__phoneFormat === PhoneLib.FORMAT.INTERNATIONAL) {
            if (isEmpty(this.__value)) this.prefixIcon = 'ui-flag';
            if (!isEmpty(this.__value)) this.prefixIcon = 'ui-flag ' + (PhoneLib.getIso2Code(this.value) || 'US');
        }
        try {
            var info = PhoneLib.getNumberInfo(_.trim(this.value),
                this.__phoneFormat !== PhoneLib.FORMAT.INTERNATIONAL ? this.country : PhoneLib.getIso2Code(this.__value));

            this.isdCode = isNaN(info.countryCode) ? '' : info.countryCode;
            this.areaCode = isNaN(info.areaCode) ? '' : info.areaCode;
            this.phone = isNaN(info.phone) ? '' : info.phone;
            this.extension = isNaN(info.ext) ? '' : info.ext;
        } catch (e) {
            this.isdCode = '';
            this.areaCode = '';
            this.phone = '';
            this.extension = '';
        }
    }
}
