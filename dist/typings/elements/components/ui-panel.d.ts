export declare class UIPanelGroup {
    element: Element;
    constructor(element: Element);
    attached(): void;
    panels: any;
    __unCollapse(): void;
}
export declare class UIPanel {
    element: Element;
    constructor(element: Element);
    closePanel(): void;
    collapsed: boolean;
    toggleCollapse(): void;
}
export declare class UIContent {
    element: Element;
    constructor(element: Element);
    __wrapperClass: string;
    height: string;
    maxHeight: string;
}
export declare class UIHeaderTool {
    element: Element;
    constructor(element: Element);
    __type: any;
    __icon: any;
    fireEvent(evt: any): any;
}
export declare class UIHeaderIcon {
    element: Element;
    constructor(element: Element);
    icon: string;
}
export declare class UIHeaderTitle {
    element: Element;
    constructor(element: Element);
}
export declare class UIHeader {
    element: Element;
    constructor(element: Element);
}
