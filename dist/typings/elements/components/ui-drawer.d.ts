export declare class UIAppDrawer {
    element: Element;
    constructor(element: Element);
    bind(): void;
    __closeOnClick: any;
    class: string;
    position: string;
    __closeDrawer(): void;
}
export declare class UIAppDrawerToggle {
    element: Element;
    constructor(element: Element);
    class: string;
    drawer: any;
    __openDrawer(evt: any): boolean;
}
