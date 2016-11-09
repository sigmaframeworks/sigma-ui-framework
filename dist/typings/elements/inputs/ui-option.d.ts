export declare class UIOptionGroup {
    element: Element;
    constructor(element: Element);
    attached(): void;
    valueChanged(newValue: any): void;
    value: any;
    name: string;
    changed($event: any): void;
}
export declare class UICheckbox {
    element: Element;
    constructor(element: Element);
    bind(): void;
    checked: boolean;
    size: string;
    class: string;
    disabled: boolean;
    __changed($event: any): any;
}
export declare class UIRadio {
    element: Element;
    constructor(element: Element);
    bind(): void;
    checked: any;
    size: string;
    name: string;
    class: string;
    value: string;
    disabled: boolean;
    checkedChanged($event: any): any;
    changed($event: any): any;
}
export declare class UISwitch {
    element: Element;
    constructor(element: Element);
    bind(): void;
    checkedChanged(newValue: any): void;
    valueChanged(newValue: any): void;
    checked: boolean;
    value: any;
    size: string;
    class: string;
    onLabel: string;
    offLabel: string;
    onValue: boolean;
    offValue: boolean;
    disabled: boolean;
    theme: string;
    changed($event: any): any;
}
