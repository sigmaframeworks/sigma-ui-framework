export declare class UIInputGroup {
    element: Element;
    protected __id: string;
    protected __input: HTMLInputElement;
    protected __input2: HTMLInputElement;
    protected __label: Element;
    protected __chkbox: Element;
    protected __type: string;
    protected __format: string;
    protected __value: any;
    protected __value2: any;
    protected __clear: boolean;
    protected __checkbox: boolean;
    protected dir: string;
    protected value: any;
    protected valueSecond: string;
    protected checked: boolean;
    protected readonly: boolean;
    protected disabled: boolean;
    protected __errorIcon: any;
    /**
     * valid acceptable character list for all unicode supported languages
     */
    protected ALPHA: string;
    /**
     * valid acceptable digits list for all unicode supported languages
     */
    protected DIGIT: string;
    constructor(element: Element);
    bind(): void;
    attached(): void;
    focus(): void;
    clearInput(isSecond: any): void;
    checkedChanged(): void;
    readonlyChanged(): void;
    valueChanged(newValue: any): void;
    valueSecondChanged(newValue: any): void;
    disabledChanged(): void;
    disable(disabled?: any): void;
    onAddonClick($event: any): void;
    protected keyPress(evt: any): any;
    protected formatter(evt: any): any;
}
