import { UIInputGroup } from "./ui-input-group";
export declare class UIDate extends UIInputGroup {
    private __dual;
    /**
     * @property    value
     * @type        string
     */
    date: string;
    /**
     * @property    value-end
     * @type        string
     */
    dateEnd: string;
    /**
     * @property    checked
     * @type        boolean
     */
    checked: boolean;
    /**
     * @property    disabled
     * @type        boolean
     */
    disabled: boolean;
    /**
     * @property    suffix-icon
     * @type        string
     */
    suffixIcon: string;
    /**
     * @property    suffix-text
     * @type        string
     */
    suffixText: string;
    /**
     * @property    button-icon
     * @type        string
     */
    buttonIcon: string;
    /**
     * @property    button-text
     * @type        string
     */
    buttonText: string;
    /**
     * @property    help-text
     * @type        string
     */
    helpText: string;
    /**
     * @property    placeholder
     * @type        string
     */
    placeholder: string;
    /**
     * @property    placeholder-second
     * @type        string
     */
    placeholderSecond: string;
    /**
     * @property    dir
     * @type        string
     */
    dir: string;
    /**
     * @property    format
     * @type        string
     */
    format: string;
    /**
     * @property    options
     * @type        string
     */
    options: UIDateOptions;
    __today: any;
    __dateStart: UIDateOptions;
    __dateEnd: UIDateOptions;
    showTime: boolean;
    constructor(element: Element);
    bind(): void;
    clearInput(isSecond: any): void;
    dateChanged(newValue: any): void;
    dateEndChanged(newValue: any): void;
}
export declare class UIDateOptions {
    minDate: any;
    maxDate: any;
    showTime: boolean;
    validDates: Array<any> | Function;
    invalidDates: Array<any> | Function;
    constructor(o?: any);
}
