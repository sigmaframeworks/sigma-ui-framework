import { PropertyObserver } from "aurelia-framework";
import { Subscription } from "aurelia-event-aggregator";
export declare module UIEvent {
    function fireEvent(event: string, element: EventTarget, data?: any): any;
    function broadcast(event: string, data?: any): void;
    function observe(object: any, property: string): PropertyObserver;
    function subscribe(event: string, callback: any): Subscription;
    function queueTask(fn: any): void;
}
