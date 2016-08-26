export declare class UITabPanel {
    element: Element;
    private __tabs;
    private __tabButtons;
    private __selectedTab;
    tabs: any[];
    activeTab: number;
    constructor(element: Element);
    bind(): void;
    tabsChanged(): void;
    activeTabChanged(newValue: any): void;
}
export declare class UITab {
    element: Element;
    label: string;
    icon: string;
    isSelected: boolean;
    constructor(element: Element);
}
