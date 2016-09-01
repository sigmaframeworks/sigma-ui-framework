export declare class UITreeModel {
    id: any;
    name: string;
    level: number;
    iconGlyph: string;
    root: boolean;
    leaf: boolean;
    active: boolean;
    expanded: boolean;
    children: Array<UITreeModel>;
    checked: number;
    parent: UITreeModel;
    isVisible: boolean;
    private __checkLevel;
    constructor(level: number, maxLevels: number, checkLevel: number, model: any, parent?: UITreeModel);
    isChecked: any;
    updateChild(v: any): void;
    updatePartial(): void;
    readonly isLeaf: boolean;
}
export declare class UITreeOptions {
    maxLevels: number;
    showCheckbox: boolean;
    checkboxLevel: number;
    showRoot: boolean;
    rootLabel: string;
    selectionLevel: number;
    constructor(obj?: {});
}
export interface UITreePanel {
    select(id: any, level: number): any;
    expand(id: any, level: number, expand: boolean): any;
    check(id: any, level: number, check: boolean): any;
    getChecked(): any;
}
