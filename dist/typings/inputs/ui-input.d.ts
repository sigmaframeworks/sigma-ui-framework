import { UIInputGroup } from "./ui-input-group";
export declare class UIInput extends UIInputGroup {
    element: Element;
    /**
     * @property    value
     * @type        string
     */
    value: string;
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
     * @property    prefix-icon
     * @type        string
     */
    prefixIcon: string;
    /**
     * @property    prefix-text
     * @type        string
     */
    prefixText: string;
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
     * @property    dir
     * @type        string
     */
    dir: string;
    /**
     * @property    name
     * @type        string
     */
    name: string;
    constructor(element: Element);
    bind(): void;
    protected formatter(evt: any): any;
}
