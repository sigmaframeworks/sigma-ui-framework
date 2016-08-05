export declare class UIValidationRenderer {
    boundaryElement: Element;
    constructor(boundaryElement: Element);
    render(error: any, target: any): void;
    unrender(error: any, target: any): void;
}
export declare function validatemap(targetOrConfig?: any, key?: any, descriptor?: any): any;
export declare function validatephone(targetOrConfig?: any, key?: any, descriptor?: any): any;
