export declare class ListGeneric {
    input: any;
    element: any;
    dropdown: any;
    __tether: any;
    __list: boolean;
    __tags: boolean;
    __value: string;
    __hilight: any;
    __allowSearch: boolean;
    __options: any[];
    __listGroups: any[];
    value: string;
    options: any[];
    readonly: boolean;
    disabled: boolean;
    forceSelect: boolean;
    valueProperty: string;
    iconProperty: string;
    displayProperty: string;
    bind(): void;
    attached(): void;
    busy: any;
    disable(disabled?: any): void;
    optionsChanged(newValue: any): void;
    valueChanged(newValue: any): void;
    __unfocus: any;
    __focus: boolean;
    __showDropdown: boolean;
    focusing(): void;
    stopUnfocus(): void;
    unfocusing(): void;
    openDropdown(force: any): void;
    highlightItem(evt: any): void;
    unhighlightItem(evt: any): void;
    scrollIntoView(): void;
    keyDown(evt: any): any;
    search(): void;
    fireSelect(model?: any): void;
    fireChange(): void;
    removeValue(v: any): void;
}
export declare class UICombo extends ListGeneric {
    element: Element;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    __clear: any;
    __tether: any;
    value: any;
    options: any[];
    iconClass: string;
    placeholder: string;
    emptyText: string;
    valueProperty: string;
    displayProperty: string;
    iconProperty: string;
    disabled: boolean;
    readonly: boolean;
    forceSelect: boolean;
    clear(): void;
    fireSelect(model?: any): void;
    fireChange(): void;
}
export declare class UITag extends ListGeneric {
    element: Element;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    __noList: any;
    value: any;
    options: any[];
    iconClass: string;
    placeholder: string;
    emptyText: string;
    valueProperty: string;
    displayProperty: string;
    iconProperty: string;
    disabled: boolean;
    readonly: boolean;
    forceSelect: boolean;
    clear(): void;
    getDisplay(tag: any): any;
    addValue(val: any): void;
    removeValue(val: any): void;
    fireSelect(model?: any): void;
    fireChange(): void;
}
export declare class UIList extends ListGeneric {
    element: Element;
    constructor(element: Element);
    value: any;
    options: any[];
    iconClass: string;
    placeholder: string;
    emptyText: string;
    valueProperty: string;
    displayProperty: string;
    iconProperty: string;
    disabled: boolean;
    readonly: boolean;
    fireSelect(model: any): void;
}
export declare class UILanguage extends ListGeneric {
    element: Element;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    bind(): void;
    __tether: any;
    __selected: any[];
    __available: any[];
    errors: any[];
    value: any;
    languages: any;
    disabled: boolean;
    readonly: boolean;
    width: any;
    valueChanged(newValue: any): void;
    languagesChanged(newValue: any): void;
    addError(lang: any): void;
    removeError(lang: any): void;
    busy: any;
    disable(disabled?: any): void;
    fireSelect(model?: any): void;
    add(model: any): void;
    remove(model: any): void;
}
export declare class UIReorder {
    element: Element;
    private ghostModel;
    /**
       * @property    list
       * @type        array
       */
    options: Array<any>;
    /**
     * @property    display-property
     * @type        string
     */
    displayProperty: any;
    constructor(element: Element);
    private __startY;
    private __ghostEl;
    private __dragEl;
    private __diff;
    private __top;
    private __move;
    private __stop;
    private __list;
    startDrag(opt: any, $event: any): void;
    move($event: any): void;
    stopDrag($event: any): void;
}
