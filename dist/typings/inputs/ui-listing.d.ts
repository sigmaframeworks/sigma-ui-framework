import { UIInputGroup } from "./ui-input-group";
export declare class UIListBehaviour extends UIInputGroup {
    __list: any;
    __focus: any;
    __noList: any;
    __options: any;
    __isGrouped: any;
    __isFiltered: any;
    __available: any;
    __searchText: any;
    __subscribeSearch: any;
    __noResult: boolean;
    __reverse: boolean;
    __hilight: HTMLElement;
    options: any;
    displayProperty: any;
    __onlyAvailable: boolean;
    constructor(element: Element);
    __select(item: any): void;
    __deselect(item: any): void;
    __scrollIntoView(): void;
    __gotFocus(): void;
    __lostFocus(): void;
    keyDown(evt: any): any;
    keyPress(evt: any): boolean;
    __searchTextChanged(): void;
}
