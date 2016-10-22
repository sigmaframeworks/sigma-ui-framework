// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {Origin} from "aurelia-metadata";
import {
  customElement,
  useView,
  singleton,
  Lazy,
  View,
  ViewSlot,
  Container,
  NewInstance,
  ViewCompiler,
  ViewResources,
  CompositionEngine
} from "aurelia-framework";

export module UIUtils {
  export var auContainer: Container;
  export var taskbar: Element;
  export var dialogContainer: Element;
  export var overlayContainer: Element;

  export function lazy(T): any {
    if (!this.auContainer) {
      throw new Error('UIUtils.Lazy::Container not set');
    }
    return Lazy.of(T).get(this.auContainer)();
  }

  export function newInstance(T, container): any {
    if (!this.auContainer) {
      throw new Error('UIUtils.newInstance::Container not provided');
    }
    return NewInstance.of(T).get(this.auContainer);
  }
}