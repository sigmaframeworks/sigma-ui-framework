export declare class UIButton {
    element: Element;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    unbind(): void;
    __tether: any;
    __button: Element;
    icon: string;
    label: string;
    class: string;
    dropdown: any;
    disabled: boolean;
    click(evt: any): boolean;
    disabledChanged(newValue: any): void;
}
