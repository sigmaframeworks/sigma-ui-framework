import { UIModel } from "../utils/ui-model";
import { UIApplication } from "../utils/ui-application";
import { ValidationController } from "aurelia-validation";
export declare class UILogin {
    element: Element;
    appState: UIApplication;
    controller: ValidationController;
    model: LoginModel;
    __page: any;
    __temp: any;
    __content: any;
    error: string;
    busy: boolean;
    constructor(element: Element, appState: UIApplication, controller: ValidationController);
    attached(): void;
    doLogin(): void;
    toast(config: any): void;
}
export declare class LoginModel extends UIModel {
    username: string;
    password: string;
    tempInput: string;
    remember: boolean;
    appState: UIApplication;
    constructor();
    save(): void;
}
