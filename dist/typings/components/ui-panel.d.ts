export declare class UIPanel {
    element: Element;
    expanded: boolean;
    collapsed: boolean;
    constructor(element: Element);
    close(): void;
}
export declare class UIHeader {
    element: Element;
    icon: string;
    close: boolean;
    expand: boolean;
    collapse: boolean;
    constructor(element: Element);
    bind(): void;
    closeChanged(newValue: any): void;
    expandChanged(newValue: any): void;
    collapseChanged(newValue: any): void;
    fireClose(): void;
    fireExpand(): void;
    fireCollapse(): void;
}
export declare class UIBody {
    element: Element;
    constructor(element: Element);
    expand($event: any): void;
}
