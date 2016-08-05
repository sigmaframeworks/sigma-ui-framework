export declare class UIReorder {
    element: Element;
    private ghostModel;
    /**
       * @property    list
       * @type        array
       */
    list: Array<any>;
    /**
     * @property    display-property
     * @type        string
     */
    displayProperty: any;
    constructor(element: Element);
    private __startY;
    private __ghostEl;
    private __dragEl;
    private __diff;
    private __top;
    private __move;
    private __stop;
    private __list;
    startDrag(opt: any, $event: any): void;
    move($event: any): void;
    stopDrag($event: any): void;
}
