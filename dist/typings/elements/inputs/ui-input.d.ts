export declare class UIForm {
    element: Element;
    constructor(element: Element);
    class: string;
    busy: boolean;
    attached(): void;
    busyChanged(newValue: any): void;
    fireSubmit(): void;
}
export declare class UIFieldset {
    element: Element;
    constructor(element: Element);
    __collapsable: any;
    class: string;
    legend: string;
    enabled: boolean;
}
export declare class UIInputGroup {
    element: Element;
    constructor(element: Element);
    bind(): void;
    width: any;
}
export declare class UIInputLabel {
    element: Element;
    static seed: number;
    constructor(element: Element);
    attached(): void;
    __label: any;
    __labelClass: string;
    __for: string;
    class: string;
}
export declare class UIInputAddon {
    element: Element;
    constructor(element: Element);
    __focus(): boolean;
    icon: any;
}
export declare class UIInputButton {
    element: Element;
    constructor(element: Element);
    icon: any;
}
export declare class UIInputInfo {
    element: Element;
    constructor(element: Element);
}
export declare class UIInputDisplay {
    element: Element;
    constructor(element: Element);
    value: any;
}
export declare class UIInput {
    element: Element;
    constructor(element: Element);
    bind(): void;
    __type: any;
    __format: any;
    __counter: any;
    __clear: any;
    __input: any;
    __value: string;
    errors: any[];
    /**
     * @property
     * @type
     */
    value: any;
    /**
     * @property
     * @type
     */
    number: number;
    /**
     * @property
     * @type
     */
    decimal: number;
    maxlength: number;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    dir: string;
    width: any;
    clear(): void;
    widthChanged(newValue: any): void;
    busy: any;
    disable(disabled?: any): void;
    __ignoreChange: boolean;
    valueChanged(newValue: any): void;
    numberChanged(newValue: any): void;
    decimalChanged(newValue: any): void;
    format(evt: any): void;
    keyDown(evt: any): any;
    fireChange(evt: any): void;
    __focus: any;
    fireBlur(): void;
    fireFocus(): void;
}
export declare class UITextarea {
    element: Element;
    constructor(element: Element);
    bind(): void;
    __counter: any;
    __clear: any;
    __input: any;
    errors: any[];
    /**
     * @property
     * @type
     */
    value: string;
    rows: number;
    dir: string;
    maxlength: number;
    placeholder: string;
    autoComplete: string;
    disabled: boolean;
    readonly: boolean;
    clear(): void;
    busy: any;
    disable(disabled?: any): void;
    fireChange(evt: any): void;
    fireInput(evt: any): void;
    __focus: any;
    fireBlur(): void;
    fireFocus(): void;
    __list: any;
    __tether: any;
    __hilight: any;
    __listCss: {
        top: string;
        left: string;
        right: string;
        width: string;
        'max-height': string;
    };
    __acRegExp: any;
    __showList: any;
    __autoComplete: any;
    attached(): void;
    detached(): void;
    autoCompleteChanged(newValue: any): void;
    showList(evt: any): boolean;
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
export declare class UIPhone {
    element: Element;
    constructor(element: Element);
    bind(): void;
    __clear: any;
    __input: any;
    __ctry: string;
    __value: string;
    __prefix: string;
    __national: boolean;
    __placeholder: string;
    errors: any[];
    /**
     * @property
     * @type
     */
    value: any;
    /**
     * @property
     * @type
     */
    phone: any;
    country: string;
    disabled: boolean;
    readonly: boolean;
    clear(): void;
    busy: any;
    disable(disabled?: any): void;
    __ignoreChange: boolean;
    valueChanged(newValue: any): void;
    countryChanged(newValue: any): void;
    format(evt: any): void;
    keyDown(evt: any): any;
    fireChange(evt: any): void;
    __focus: any;
    fireBlur(): void;
    fireFocus(): void;
}
