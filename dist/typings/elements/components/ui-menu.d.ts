export declare class UIMenubar {
    element: Element;
    constructor(element: Element);
    __wrapper: Element;
    __overflow: Element;
    __overflowToggle: Element;
    __isOverflow: boolean;
    __tether: any;
    __obResize: any;
    __obClick: any;
    attached(): void;
    detached(): void;
    arrange(): void;
    showOverflow(evt: any): boolean;
}
export declare class UIMenu {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuGroup {
    element: Element;
    constructor(element: Element);
    label: string;
}
export declare class UIMenuSection {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuDivider {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuLink {
    element: Element;
    constructor(element: Element);
    bind(): void;
    icon: string;
    active: boolean;
    disabled: boolean;
    href: string;
    click(evt: any): any;
}
