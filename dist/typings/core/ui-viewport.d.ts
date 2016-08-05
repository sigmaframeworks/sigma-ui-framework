import { Container } from "aurelia-framework";
import { Router } from "aurelia-router";
import { UIApplication } from "../utils/ui-application";
export declare class UIViewport {
    element: Element;
    appState: UIApplication;
    /**
     * @property    router
     * @type        Aurelia Router
     */
    router: Router;
    icon: string;
    subtitle: string;
    copyright: string;
    showMenu: boolean;
    showOptions: boolean;
    showTaskbar: boolean;
    constructor(element: Element, appState: UIApplication, container: Container);
    bind(): void;
    isActive(route: any): any;
    __showMenu($event: any): void;
    __hideMenu($event: any): boolean;
    logout(): void;
}
