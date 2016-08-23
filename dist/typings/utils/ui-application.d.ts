import { Router } from "aurelia-router";
export declare class UIApplication {
    router: Router;
    private __logger;
    AppConfig: {
        Key: string;
        Title: string;
        Version: string;
    };
    HttpConfig: {
        BaseUrl: string;
        Headers: {};
        AuthorizationHeader: boolean;
    };
    IsHttpInUse: boolean;
    IsAuthenticated: boolean;
    constructor(router: Router);
    navigate(hash: any): void;
    navigateTo(route: any, params?: {}): void;
    /** App Constants **/
    private __username;
    private __userGroup;
    private __userGroupLabel;
    private __authUser;
    private __authToken;
    Username: any;
    UserGroup: any;
    UserGroupLabel: any;
    AuthUser: any;
    AuthToken: any;
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
    /** Toast **/
    private __overlayContainer;
    toast(config: any): void;
    toastSuccess(config: any): void;
    toastError(config: any): void;
    alert(config: any): void;
    confirm(config: any): Promise<{}>;
}
export declare class AuthInterceptor {
    appState: UIApplication;
    private logger;
    constructor(appState: UIApplication);
    run(routingContext: any, next: any): any;
    isAllowed(groups: any): boolean;
}
