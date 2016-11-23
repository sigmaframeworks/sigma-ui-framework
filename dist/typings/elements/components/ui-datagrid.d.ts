export declare class UIDatagrid {
    element: Element;
    constructor(element: Element);
    bind(): void;
    columnsChanged(newValue: any): void;
    columns: any;
    data: any[];
    summaryRow: boolean;
    sortColumn: string;
    sortOrder: string;
    __rowSelect: any;
    __columns: any[];
    __tableWidth: string;
    calculateWidth(cols: any): string;
    __dgWrapHead: any;
    __dgWrapFoot: any;
    scrolling(evt: any): void;
    doSort(col: any): void;
    __move: any;
    __stop: any;
    __diff: any;
    __startX: any;
    __column: any;
    __colNext: any;
    __ghost: any;
    __scroller: any;
    __resizing: boolean;
    resizeColumn(evt: any, col: any, next: any): boolean;
    __resize(evt: any): void;
    __resizeEnd(evt: any): void;
    fireSelect(record: any): void;
}
export declare class UIDGEmpty {
}
export declare class UIDataColumn {
    element: Element;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    value: any;
    display: any;
    dataType: string;
    format: any;
    align: string;
    left: number;
    locked: number;
    resize: boolean;
    sortable: boolean;
    getWidth(tw: any): any;
    getTitle(): string;
    getValue(value: any, record: any): string;
}
export declare class UIDGColumn extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    value: any;
    display: any;
    format: any;
}
export declare class UIDGLink extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    icon: any;
    label: any;
    disabled: any;
    isDisabled(value: any, record: any): any;
    getIcon(value: any, record: any): any;
    getLabel(value: any, record: any): any;
    fireClick(value: any, record: any): void;
}
export declare class UIDGButton extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    icon: any;
    label: any;
    dropdown: any;
    theme: any;
    disabled: any;
    isDisabled(value: any, record: any): any;
    getIcon(value: any, record: any): any;
    getLabel(value: any, record: any): any;
    getTheme(value: any, record: any): any;
    fireClick(value: any, record: any): void;
    fireMenuOpen($event: any, record: any): any;
}
export declare class UIDGSwitch extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    checked: boolean;
    value: any;
    size: string;
    class: string;
    onLabel: string;
    offLabel: string;
    onValue: boolean;
    offValue: boolean;
    theme: string;
    disabled: any;
    isDisabled(value: any, record: any): any;
    fireChange(value: any, record: any): void;
}
