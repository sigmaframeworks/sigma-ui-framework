import { UIListBehaviour } from "./ui-listing";
export declare class UIList extends UIListBehaviour {
    element: Element;
    /**
     * @property    value
     * @type        array
     */
    value: any;
    /**
     * @property    options
     * @type        array
     */
    options: Array<any>;
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
     * @property    help-text
     * @type        string
     */
    helpText: string;
    /**
     * @property    value-property
     * @type        string
     */
    valueProperty: string;
    /**
     * @property    display-property
     * @type        string
     */
    displayProperty: any;
    /**
     * @property    display-property
     * @type        string
     */
    countProperty: any;
    /**
     * @property    icon-property
     * @type        string
     */
    iconProperty: any;
    /**
     * @property    icon-class
     * @type        string
     */
    iconClass: any;
    private placeholder;
    private __modeCopy;
    private __searchable;
    __value: any[];
    __onlyAvailable: boolean;
    private __ignoreChange;
    constructor(element: Element);
    bind(): void;
    valueChanged(newValue: any): void;
    optionsChanged(newValue: any): void;
    formatter(): any;
    __select(item: any): void;
    addAll(): void;
    removeAll(): void;
    addEl($event: any): void;
    removeEl($event: any): void;
    __moveLeft(value: any): void;
    __moveRight(value: any): void;
    __updateValue(): void;
    private __isNew;
    private __model;
    __dragStart($event: any, isNew: any): boolean;
    __dragEnter($event: any): boolean;
}
