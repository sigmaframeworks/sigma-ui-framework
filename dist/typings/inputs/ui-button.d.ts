export declare class UIButton {
    element: Element;
    private __button;
    private __size;
    /**
     * @property    label
     * @type        string
     */
    label: string;
    /**
     * @property    value
     * @type        string
     */
    value: string;
    /**
       * @property    icon
       * @type        string
       */
    icon: string;
    /**
       * @property    icon
       * @type        string
       */
    theme: string;
    /**
     * @property    disabled
     * @type        string
     */
    disabled: boolean;
    menu: any;
    private __hasMenu;
    private __menuEl;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    disable(disabled?: any): void;
    disabledChanged(newValue: any): void;
    fireClick($event: any): boolean;
}
export declare class UIButtonGroup {
    element: Element;
    private __size;
    private __theme;
    private __extraClass;
    /**
     * @property    toggle
     * @type        string
     */
    toggle: any;
    /**
     * @property    disabled
     * @type        string
     */
    disabled: boolean;
    /**
     * @property    value
     * @type        string
     */
    value: string;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    disable(disabled?: any): void;
    disabledChanged(newValue: any): void;
    toggleChanged(newValue: any): void;
    valueChanged(newValue: any): void;
    fireChange($event: any): boolean;
}
