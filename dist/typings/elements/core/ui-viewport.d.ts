import { Container } from "aurelia-framework";
import { Router } from "aurelia-router";
import { UIApplication } from "../../utils/ui-application";
export declare class UIViewport {
    element: Element;
    appState: UIApplication;
    constructor(element: Element, appState: UIApplication, container: Container);
    attached(): void;
    __taskbar: any;
    __dialogContainer: any;
    __overlayContainer: any;
    router: Router;
}
export declare class UIAppHeader {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIAppTitle {
    element: Element;
    constructor(element: Element);
    src: any;
    class: string;
}
export declare class UIAppFooter {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIAppTaskbar {
    element: Element;
    constructor(element: Element);
    attached(): void;
    __taskbar: any;
    class: string;
}
