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
    /**
     * @property    menu
     * @type        Array of links
     */
    menu: Array<any>;
    private __temp;
    constructor(element: Element, appState: UIApplication);
    attached(): void;
    isActive(route: any): any;
    onClick($event: any): boolean;
}
