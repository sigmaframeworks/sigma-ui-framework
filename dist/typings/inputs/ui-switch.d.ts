export declare class UISwitch {
    element: Element;
    private __id;
    private __input;
    private __switch;
    private __label;
    private __theme;
    /**
     * @property    label-on
     * @type        string
     */
    labelOn: string;
    /**
     * @property    label-off
     * @type        string
     */
    labelOff: string;
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
     * @property    checked
     * @type        boolean
     */
    private checked;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    disable(disabled?: any): void;
    disabledChanged(newValue: any): void;
    valueChanged($event: any): void;
    onFocus(): void;
    onBlur(): void;
}
