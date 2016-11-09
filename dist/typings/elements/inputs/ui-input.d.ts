export declare class UIForm {
    element: Element;
    constructor(element: Element);
    class: string;
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
    clear(): void;
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
    maxlength: number;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    clear(): void;
    fireChange(evt: any): void;
    __focus: any;
    fireBlur(): void;
    fireFocus(): void;
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
