export declare class UISwitch {
    element: Element;
    private __id;
    private __input;
    private __switch;
    private __label;
    private __theme;
    private __checked;
    /**
     * @property    label-on
     * @type        string
     */
    onLabel: string;
    /**
     * @property    label-off
     * @type        string
     */
    offLabel: string;
    /**
     * @property    disabled
     * @type        boolean
     */
    disabled: boolean;
    /**
     * @property    width
     * @type        number
     */
    width: any;
    /**
     * @property    value
     * @type        any
     */
    value: any;
    /**
     * @property    onValue
     * @type        any
     */
    onValue: any;
    /**
     * @property    onValue
     * @type        any
     */
    offValue: any;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    disable(disabled?: any): void;
    valueChanged(newValue: any): void;
    disabledChanged(newValue: any): void;
    checkChanged($event: any): void;
    onFocus(): void;
    onBlur(): void;
}
