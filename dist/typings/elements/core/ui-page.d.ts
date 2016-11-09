export declare class UIPage {
    element: Element;
    constructor(element: Element);
    pageClass: string;
    pageTitle: any;
}
export declare class UISection {
    element: Element;
    constructor(element: Element);
    __columnLayout: boolean;
}
export declare class UIRouterView {
    element: Element;
    constructor(element: Element);
}
export declare class UIContent {
    element: Element;
    constructor(element: Element);
}
export declare class UISidebar {
    element: Element;
    constructor(element: Element);
    bind(): void;
    detached(): void;
    __obClick: any;
    __class: string;
    __miniDisplay: boolean;
    __collapsible: boolean;
    label: string;
    collapsed: boolean;
    position: string;
    __toggleCollapse($event: any): boolean;
    __showOverlay($event: any): boolean;
}
export declare class UIDivider {
    element: Element;
    constructor(element: Element);
}
export declare class UIToolbar {
    element: Element;
    constructor(element: Element);
}
