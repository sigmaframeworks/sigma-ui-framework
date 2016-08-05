// Global methods
declare var __seed;
declare var Constants;

declare function isTrue(b: any): boolean;
declare function isEmpty(a: any): boolean;
declare function isFunction(a: any): boolean;
declare function getParentByTag(element: Element, selector: string): HTMLElement;
declare function getParentByClass(element: Element, selector: string, lastElement?: string): HTMLElement;

declare function escape(v: string): string;
declare function unescape(v: string): string;

declare function TextComplete(el, strategies, options);

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
