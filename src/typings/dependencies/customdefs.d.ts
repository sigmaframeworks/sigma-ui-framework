// Global methods
declare var __seed;
declare var Constants;
declare var hljs: any;

declare function isTrue(b: any): boolean;
declare function isEmpty(a: any): boolean;
declare function isFunction(a: any): boolean;
declare function getParentByTag(element: Element, selector: string): HTMLElement;
declare function getParentByClass(element: Element, selector: string, lastElement?: string): HTMLElement;
declare function convertToPx(size, context?);

declare function escape(v: string): string;
declare function unescape(v: string): string;

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


declare interface ICountry {
    continent: string;
    iso3: string;
    iso2: string;
    name: string;
    tld: string;
    currency: string;
    phone: number;
}

declare interface Window {
    isTrue;
    isEmpty;
    isFunction;
    getParentByTag;
    getParentByClass;
    convertToPx;

    __seed: number;
    Constants: any;
    FormData: any;

    countries: Array<ICountry>;
    currencies: Map<string, string>;
    filetypes: Map<string, string>;

    escape;
    unescape;
}
declare interface Element {
    au: any;
}

declare class Chart {
    constructor(el: any, opt: any);
}
