export declare class UIButton {
    element: Element;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    detached(): void;
    button: any;
    __tether: any;
    __obClick: any;
    icon: string;
    label: string;
    class: string;
    value: string;
    theme: string;
    width: string;
    dropdown: any;
    disabled: boolean;
    click(evt: any): boolean;
    disabledChanged(newValue: any): void;
}
export declare class UIButtonGroup {
    element: Element;
    constructor(element: Element);
    bind(): void;
    buttons: any[];
    value: string;
    disabled: boolean;
    disabledChanged(newValue: any): void;
    buttonsChanged(): void;
    __active: any;
    valueChanged(newValue: any): void;
    __click(evt: any): void;
}
