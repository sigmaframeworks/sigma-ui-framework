import { Container, ViewCompiler, ViewResources, CompositionEngine } from "aurelia-framework";
export declare class UIDialogService {
    private compiler;
    private container;
    private resources;
    private compositionEngine;
    private dialogContainer;
    private taskBar;
    private __active;
    private __windows;
    constructor(compiler: ViewCompiler, container: Container, resources: ViewResources, compositionEngine: CompositionEngine);
    show(vm: any, model?: any): Promise<void>;
    private __createDialog(vm);
    private __getViewModel(instruction);
    private __invokeLifecycle(instance, name, model);
    private __initDialog(dialog);
    private __closeDialog(dialog);
    private __setNextActive();
    private __collapse($event);
    private __taskClick(dialog);
    private __changeActive(dialog);
    /**
     * dialog move
     */
    private __isDragging;
    private __isResizing;
    private __startX;
    private __startY;
    private __dialog;
    private moveStart($event);
    private moveEnd();
    private move($event);
}
export declare class UIDialog {
    static __id: number;
    static __x: number;
    static __y: number;
    private __id;
    private __dialog;
    private __dialogWrapper;
    private __active;
    private __minimized;
    private __taskButton;
    __current: any;
    icon: any;
    title: string;
    width: string;
    height: string;
    modal: boolean;
    drag: boolean;
    resize: boolean;
    maximize: boolean;
    bind(): void;
    close($event?: any): void;
    focus(): void;
    expand($event: any): void;
    collapse($event: any): void;
    toast(config: any): void;
}
