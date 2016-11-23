import { Router } from "aurelia-router";
export declare class UIApplication {
    router: Router;
    private __logger;
    IsHttpInUse: boolean;
    IsAuthenticated: boolean;
    constructor(router: Router);
    navigate(hash: any, options?: any): void;
    navigateTo(route: any, params?: {}, options?: any): void;
    routeActive(route: any): any;
    /** App Constants **/
    private __authUser;
    private __authToken;
    AuthUser: any;
    AuthToken: any;
    login(authUser: any, authPass?: any, authToken?: any, route?: any): void;
    logout(): void;
    private __sharedState;
    shared(key: any, value?: any): any;
    /** Session State **/
    session(key: any, value?: any): any;
    clearSession(): void;
    /** Persistent State **/
    persist(key: any, value?: any): any;
    /** Logger **/
    info(tag: any, msg: any, ...rest: any[]): void;
    warn(tag: any, msg: any, ...rest: any[]): void;
    debug(tag: any, msg: any, ...rest: any[]): void;
    error(tag: any, msg: any, ...rest: any[]): void;
    /** Toasts / Alerts **/
    toast(config: any): void;
    toastSuccess(config: any): void;
    toastError(config: any): void;
    alert(config: any): Promise<{}>;
    confirm(config: any): Promise<{}>;
}
export declare class AuthInterceptor {
    appState: UIApplication;
    private logger;
    constructor(appState: UIApplication);
    run(routingContext: any, next: any): any;
}
