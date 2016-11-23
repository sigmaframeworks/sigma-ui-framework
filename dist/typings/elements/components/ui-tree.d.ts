import { BindingEngine } from "aurelia-framework";
import { UITreeOptions, UITreeModel } from "../../utils/ui-tree-model";
export declare class UITreePanel {
    element: Element;
    constructor(element: Element, observer: BindingEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    valueChanged(newValue: any): void;
    modelChanged(newValue: any): void;
    getChecked(): {
        checked: any[];
        partial: any[];
        unchecked: any[];
    };
    private readonly rootNodes;
    private root;
    private searchText;
    private selectedNode;
    __searchable: any;
    __ignoreChange: any;
    __subscribeSearch: any;
    value: any;
    model: any[];
    options: UITreeOptions;
    private __find(obj, id, field, value?, expand?);
    private __getChecked(nodes, retVal?);
    private __itemSelect(node);
    private __itemChecked(node);
    private __itemClicked(node);
    private __searchTextChanged(newValue);
    private __filter(obj, value, parentVisible?);
}
export declare class TreeNode {
    element: Element;
    node: UITreeModel;
    options: UITreeOptions;
    constructor(element: Element);
    fireClicked(): void;
}
