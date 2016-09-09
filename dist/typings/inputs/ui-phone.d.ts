import { UIInputGroup } from "./ui-input-group";
export declare class UIPhone extends UIInputGroup {
    private __phoneType;
    private __phoneFormat;
    private placeholder;
    private prefixText;
    private prefixIcon;
    private ignoreUpdate;
    __type: string;
    /**
     * @property    value
     * @type        string
     */
    value: string;
    /**
     * @property    isd-code
     * @type        string
     */
    isdCode: string;
    /**
     * @property    area-code
     * @type        string
     */
    areaCode: string;
    /**
     * @property    phone
     * @type        string
     */
    phone: string;
    /**
     * @property    extension
     * @type        string
     */
    extension: string;
    /**
     * @property    country
     * @type        string
     */
    country: string;
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
     * @property    readonly
     * @type        boolean
     */
    readonly: boolean;
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
    constructor(element: Element);
    bind(): void;
    countryChanged(): void;
    valueChanged(newValue: any): void;
    formatter(evt: any): any;
    protected processValue(): void;
}
