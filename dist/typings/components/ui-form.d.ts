import { TaskQueue } from "aurelia-framework";
export declare class UIForm {
    element: Element;
    taskQueue: TaskQueue;
    busy: boolean;
    private __form;
    constructor(element: Element, taskQueue: TaskQueue);
    attached(): void;
    busyChanged(newValue: any): void;
    fireSubmit(): void;
    getForm(): HTMLElement;
}
export declare class UIFieldset {
    element: Element;
    label: string;
    enabled: boolean;
    private checkbox;
    constructor(element: Element);
    bind(): void;
    enabledChanged(newValue: any): void;
}
