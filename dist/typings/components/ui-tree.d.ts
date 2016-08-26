import { BindingEngine, TaskQueue } from "aurelia-framework";
import { UITreeModel, UITreeOptions } from "../utils/ui-tree-models";
export declare class UITree {
    element: Element;
    taskQueue: TaskQueue;
    private root;
    private searchText;
    private selectedNode;
    __subscribeSelect: any;
    __subscribeChecked: any;
    __subscribeSearch: any;
    value: any;
    model: any[];
    options: UITreeOptions;
    constructor(element: Element, taskQueue: TaskQueue, observer: BindingEngine);
    private bind();
    private attached();
    private detached();
    private readonly rootNodes;
    private __itemSelect(node);
    private __itemChecked(node);
    private modelChanged(newValue);
    private valueChanged(newValue);
    private __searchTextChanged(newValue);
    private __filter(obj, value, parentVisible?);
    private __find(obj, id, level, field, value?);
    private __getChecked(nodes, retVal);
    getChecked(): {
        checked: any[];
        partial: any[];
        unchecked: any[];
    };
    select(id: any, level: number): void;
    expand(id: any, level: number, expand: boolean): void;
    check(id: any, level: number, check: boolean): void;
}
export declare class TreeNode {
    node: UITreeModel;
    options: UITreeOptions;
    constructor();
    private itemSelect();
}
