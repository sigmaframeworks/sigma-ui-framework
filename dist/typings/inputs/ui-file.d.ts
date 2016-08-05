export declare class UIFileInput {
    element: Element;
    static FILE_IMAGES: string;
    static FILE_DOCS: string;
    fileTypes: string;
    constructor(element: Element);
    attached(): void;
    __input: any;
    __files: any[];
    __dragging: boolean;
    __dragEnter($event: any): boolean;
    __dragExit($event: any): void;
    __drop($event: any): void;
    __fileChoose(): void;
    __remove(index: any): void;
}
