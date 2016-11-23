import { TemplatingEngine } from "aurelia-framework";
export declare class UITabPanel {
    element: Element;
    tempEngine: TemplatingEngine;
    constructor(element: Element, tempEngine: TemplatingEngine);
    height: string;
    tabsChanged(): void;
    tabs: any[];
    activeTab: number;
    __hideTabs: boolean;
    __activeTab: any;
    activeTabChanged(newValue: any): void;
    closeTab(tab: any): void;
    activateTab(tab: any): void;
}
export declare class UITab {
    element: Element;
    static __seed: number;
    constructor(element: Element);
    bind(): void;
    __id: string;
    active: boolean;
    closeable: boolean;
    id: string;
    icon: string;
    label: string;
    disabled: boolean;
    remove(): void;
}
export declare class UIBreadcrumb {
    element: Element;
    constructor(element: Element);
    fireChange($event: any): boolean;
}
export declare class UICrumb {
    element: Element;
    constructor(element: Element);
    id: string;
    href: string;
    fireClick($event: any): void;
}
