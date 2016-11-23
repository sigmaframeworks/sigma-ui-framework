export declare class UIForm {
    element: Element;
    constructor(element: Element);
    bind(): void;
    __input: any;
    __counter: any;
    errors: any[];
    /**
     * @property
     * @type
     */
    value: string;
    rows: number;
    dir: string;
    maxlength: number;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    __help: boolean;
    __preview: boolean;
    __disableTools: boolean;
    toolClicked(evt: any): void;
    clear(): void;
    busy: any;
    disable(disabled?: any): void;
    fireChange(evt: any): void;
    __focus: any;
    fireBlur(): void;
    fireFocus(): void;
}
