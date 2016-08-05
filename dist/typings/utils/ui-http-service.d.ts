import { HttpClient } from "aurelia-fetch-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { UIApplication } from "./ui-application";
export declare class UIHttpService {
    httpClient: HttpClient;
    appState: UIApplication;
    eventAggregator: EventAggregator;
    constructor(httpClient: HttpClient, appState: UIApplication, eventAggregator: EventAggregator);
    setBaseUrl(url: any): void;
    get(slug: string): Promise<any | string | void>;
    text(slug: string): Promise<any | string | void>;
    put(slug: string, obj: any): Promise<any | string | void>;
    post(slug: string, obj: any): Promise<any | string | void>;
    delete(slug: string): Promise<any | string | void>;
    upload(slug: string, form: HTMLFormElement): Promise<any | string | void>;
    reupload(slug: string, form: HTMLFormElement): Promise<any | string | void>;
    __upload(method: string, slug: string, form: HTMLFormElement): Promise<any>;
    private __getHeaders();
}
