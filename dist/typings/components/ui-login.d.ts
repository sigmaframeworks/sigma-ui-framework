import { UIModel } from "../utils/ui-model";
import { UIApplication } from "../utils/ui-application";
export declare class UILogin {
    element: Element;
    appState: UIApplication;
    model: LoginModel;
    __page: any;
    error: string;
    busy: boolean;
    __rowLayout: boolean;
    constructor(element: Element, appState: UIApplication);
    attached(): void;
    doLogin(): void;
    toast(config: any): void;
}
export declare class LoginModel extends UIModel {
    username: string;
    password: string;
    remember: boolean;
    appState: UIApplication;
    constructor();
    save(): void;
}
