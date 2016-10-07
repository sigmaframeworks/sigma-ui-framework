export declare class UIMenubar {
    element: Element;
    constructor(element: Element);
    __wrapper: Element;
    __overflow: Element;
    __overflowToggle: Element;
    __isOverflow: boolean;
    __tether: any;
    attached(): void;
    unbind(): void;
    arrange(): void;
    showOverflow(evt: any): boolean;
}
export declare class UIMenu {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuSection {
    element: Element;
    constructor(element: Element);
    label: string;
}
export declare class UIMenuDivider {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuLink {
    element: Element;
    constructor(element: Element);
    icon: string;
    active: boolean;
    disabled: boolean;
    href: string;
    click(evt: any): any;
}
