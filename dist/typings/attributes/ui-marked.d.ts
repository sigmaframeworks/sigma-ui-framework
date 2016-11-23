import { TaskQueue } from "aurelia-framework";
export declare class UIMarkdownView {
    element: Element;
    taskQueue: TaskQueue;
    constructor(element: Element, taskQueue: TaskQueue);
    attached(): void;
}
