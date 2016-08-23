import { Router } from "aurelia-router";
import { UIApplication } from "../utils/ui-application";
export declare class UIMenu {
    element: Element;
    appState: UIApplication;
    /**
     * @property    router
     * @type        Aurelia Router
     */
    router: Router;
    children: Array<any>;
    menu: any[];
    hideTitle: boolean;
    constructor(element: Element, appState: UIApplication);
    childrenChanged(newValue: any): void;
    isActive(route: any): any;
    onClick($event: any): boolean;
}
