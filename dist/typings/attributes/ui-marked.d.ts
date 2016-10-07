import { TaskQueue } from "aurelia-framework";
export declare class UIMarkdown {
    element: Element;
    taskQueue: TaskQueue;
    constructor(element: Element, taskQueue: TaskQueue);
    attached(): void;
}
