import { UIInputGroup } from "./ui-input-group";
export declare class UITextArea extends UIInputGroup {
    __list: any;
    __listCss: any;
    __focus: any;
    __hilight: any;
    __autoComplete: any;
    __acRegExp: any;
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
     * @property    rows
     * @type        string
     */
    rows: string;
    /**
     * @property    dir
     * @type        string
     */
    dir: string;
    /**
     * @property    auto-complete
     * @type        string
     */
    autoComplete: any;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    showList(evt: any): boolean;
    autoCompleteChanged(newValue: any): void;
    keyDown(evt: any): boolean;
    __replace(selected: any): void;
    __clicked($event: any): boolean;
    __scrollIntoView(): void;
    properties: string[];
    isBrowser: boolean;
    isFirefox: boolean;
    getCaretCoordinates(): {
        top: string;
        left: string;
    };
}
