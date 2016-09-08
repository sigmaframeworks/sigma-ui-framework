// Global methods
declare var __seed;
declare var Constants;
declare var hljs: any;

declare function TextComplete(el, strategies, options);

declare interface UIConfig {
    title(t: string): UIConfig;
    version(t: string): UIConfig;
    appKey(t: string): UIConfig;

    apiUrl(t: string): UIConfig;
    apiHeaders(t: any): UIConfig;
    addAuthHeader(t: boolean): UIConfig;

    useAmCharts(): UIConfig;

    languages(l: Array<any>): UIConfig;
}

declare interface Window {
    __seed: number;
    Constants: any;
    FormData: any;
}
declare interface Element {
    au: any;
}

declare class Chart {
    constructor(el: any, opt: any);
}
