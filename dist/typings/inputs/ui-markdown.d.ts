import { UIInputGroup } from "./ui-input-group";
export declare class UIMarkdown extends UIInputGroup {
    private __help;
    private __close;
    private __preview;
    private __hidePreview;
    private __disableTools;
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
     * @property    readonly
     * @type        boolean
     */
    readonly: boolean;
    /**
     * @property    placeholder
     * @type        string
     */
    placeholder: string;
    /**
     * @property    dir
     * @type        string
     */
    dir: string;
    /**
     * @property    rows
     * @type        string
     */
    rows: string;
    constructor(element: Element);
    bind(): void;
    disable(disabled?: any): void;
    toolClick($event: any): void;
    private __toggle(type);
}
