import { Container } from "aurelia-framework";
export declare module UIUtils {
    var auContainer: Container;
    var taskbar: Element;
    var dialogContainer: Element;
    var overlayContainer: Element;
    function lazy(T: any): any;
    function newInstance(T: any, container: any): any;
    function compileView(markup: any, container: any, vm?: any): any;
    function alert(config: any): Promise<{}>;
    function confirm(config: any): Promise<{}>;
    function showToast(config: any, container?: any): void;
}
