import { TaskQueue } from "aurelia-framework";
export declare class UIOption {
    element: Element;
    protected __id: string;
    protected __input: Element;
    protected checked: boolean;
    protected disabled: boolean;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    disable(disabled?: any): void;
    disabledChanged(newValue: any): void;
}
export declare class UICheckbox extends UIOption {
    __type: string;
    /**
     * @property    disabled
     * @type        boolean
     */
    disabled: boolean;
    /**
     * @property    checked
     * @type        boolean
     */
    checked: boolean;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    valueChanged($event: any): void;
}
export declare class UIRadio extends UIOption {
    __type: string;
    /**
     * @property    value
     * @type        string
     */
    value: string;
    /**
     * @property    disabled
     * @type        boolean
     */
    disabled: boolean;
    /**
     * @property    checked
     * @type        boolean
     */
    checked: any;
    constructor(element: Element);
    attached(): void;
    valueChanged($event: any): void;
}
export declare class UIOptionGroup {
    element: Element;
    taskQueue: TaskQueue;
    private __label;
    private __name;
    /**
     * @property    label
     * @type        string
     */
    label: string;
    /**
     * @property    name
     * @type        string
     */
    name: string;
    /**
     * @property    value
     * @type        string
     */
    value: string;
    constructor(element: Element, taskQueue: TaskQueue);
    attached(): void;
    valueChanged(newValue: any): void;
    checkChanged($event: any): void;
}
