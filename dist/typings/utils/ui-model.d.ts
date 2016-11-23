import { Logger } from "aurelia-logging";
import { UIHttpService } from "./ui-http-service";
export declare class UIModel {
    logger: Logger;
    httpClient: UIHttpService;
    private __original;
    private __observers;
    constructor();
    get(...rest: any[]): void;
    post(...rest: any[]): void;
    put(...rest: any[]): void;
    delete(...rest: any[]): void;
    addObserver(ob: any): void;
    dispose(): void;
    deserialize(json: any): void;
    serialize(): {};
    static serializeObject(o: any): {};
    isDirty(): any;
    __checkDirty(o: any, t: any): any;
    saveChanges(): void;
    discardChanges(): void;
}
