export declare class UIPage {
    element: Element;
    private __body;
    /**
     * @property    page-title
     * @type        string
     */
    pageTitle: string;
    constructor(element: Element);
    toast(config: any): void;
}
export declare class UISection {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIContent {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UISidebar {
    element: Element;
    private collapsible;
    private __content;
    /**
     * @property    width
     * @type        string
     */
    width: string;
    constructor(element: Element);
    bind(): void;
    private __close;
    attached(): void;
    dettached(): void;
    closeOverlay(evt: any): void;
    toggleCollapse($event: any): void;
    showOverlay(): void;
}
export declare class UIDivider {
}
export declare class UIToolbar {
    element: Element;
    constructor(element: Element);
    fireSubmit(): void;
}
export declare class UIStatsbar {
}
export declare class UIStat {
    value: any;
    icon: any;
}
