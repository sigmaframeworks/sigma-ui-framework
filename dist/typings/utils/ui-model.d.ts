import { Logger } from "aurelia-logging";
import { ValidationController } from "aurelia-validation";
import { UIHttpService } from "./ui-http-service";
export declare class UIModel {
    logger: Logger;
    httpClient: UIHttpService;
    controller: ValidationController;
    private __original;
    private __observers;
    constructor();
    get(...rest: any[]): void;
    post(...rest: any[]): void;
    put(...rest: any[]): void;
    delete(...rest: any[]): void;
    dispose(): void;
    validate(): Promise<any>;
    deserialize(json: any): void;
    serialize(): {};
    __serializeObject(o: any): {};
    ___serializeKey(key: any, o: any): void;
    isDirty(): any;
    __checkDirty(o: any, t: any): any;
    saveChanges(): void;
    discardChanges(): void;
}
