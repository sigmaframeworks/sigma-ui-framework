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
import {UIEvent} from "./ui-event";

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


  let __compiler;
  let __resources;

  export function compileView(markup, container, vm?) {
    if (!__compiler) __compiler = this.lazy(ViewCompiler);
    if (!__resources) __resources = this.lazy(ViewResources);

    var viewFactory = __compiler.compile(`<template>${markup}</template>`, __resources);
    let view = viewFactory.create(this.auContainer);
    view.bind(vm);

    let slot = new ViewSlot(container, true);
    slot.add(view);
    slot.attached();
    if (isFunction(vm.attached)) vm.attached();

    return view;
  }

  export function alert(config) {
    let type = "fi-ui-info";
    if (config.type == "error") type = "fi-ui-error";
    if (config.type == "exclaim") type = "fi-ui-exclamation";

    return new Promise((resolve, reject) => {
      let view = UIUtils.compileView(`<div class="ui-dialog-wrapper ui-modal" ref="__wrapper">
      <div class="ui-dialog ui-alert">
      <input style="position:fixed;top:-100%" ref="__focusBlock" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"/>
      <div class="ui-message-bar">
      <span class="${type || 'info'}"></span><p innerhtml.bind='message'></p></div>
      <div class="ui-button-bar"><button click.trigger="closeAlert()">${config.okLabel || 'OK'}</button></div>
      </div></div>`, this.dialogContainer, {
          __wrapper: null,
          __focusBlock: null,
          message: config.message,
          attached: function() {
            this.__focusBlock.focus();
          },
          closeAlert: function() {
            resolve();
            this.__wrapper.remove();
          },
          cancelBlur: function($event) {
            $event.preventDefault();
            this.__focusBlock.focus();
            return false;
          },
          checkKey: function($event) {
            let key = ($event.keyCode || $event.which);
            if (key == 13) this.closeAlert();
            if (key == 27) this.closeAlert();
          }
        });
    });
  }

  export function confirm(config) {
    return new Promise((resolve, reject) => {
      let view = UIUtils.compileView(`<div class="ui-dialog-wrapper ui-modal" ref="__wrapper">
      <div class="ui-dialog ui-alert">
      <input style="position:fixed;top:-100%" ref="__focusBlock" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"/>
      <div class="ui-message-bar">
      <span class="fi-ui-question"></span><p innerhtml.bind='message'></p></div>
      <div class="ui-button-bar"><button class="default" click.trigger="closeAlert(true)">${config.yesLabel || 'Yes'}</button>
      <button click.trigger="closeAlert(false)">${config.noLabel || 'No'}</button></div>
      </div></div>`, this.dialogContainer, {
          __wrapper: null,
          __focusBlock: null,
          message: config.message,
          attached: function() {
            this.__focusBlock.focus();
          },
          closeAlert: function(b) {
            resolve(b);
            this.__wrapper.remove();
          },
          cancelBlur: function($event) {
            $event.preventDefault();
            this.__focusBlock.focus();
            return false;
          },
          checkKey: function($event) {
            let key = ($event.keyCode || $event.which);
            if (key == 13) this.closeAlert(true);
            if (key == 27) this.closeAlert(false);
          }
        });
    });
  }

  export function showToast(config, container?) {
    let tmr;
    if (typeof config === 'string') config = { message: config };
    let opt = Object.assign({ theme: 'default', autoHide: 5000, extraClass: '' }, config);
    let toast = document.createElement('div');
    toast.classList.add('ui-toast');
    toast.classList.add(opt.theme);
    if (!isEmpty(opt.extraClass)) toast.classList.add(opt.extraClass);
    toast.innerHTML = `<div class="ui-toast-wrapper">
        ${opt.icon ? '<span class="ui-icon ' + opt.icon + '"></span>' : ''}
        <p class="ui-message">${opt.message}</p>
        <span class="ui-close">&times;</span>
      </div>`;

    (container || this.overlayContainer).appendChild(toast);
    if (opt.autoHide > 0) tmr = setTimeout(() => __removeToast(toast), opt.autoHide);
    toast.onclick = () => {
      clearTimeout(tmr);
      __removeToast(toast);
    };
    UIEvent.queueTask(() => toast.classList.add('ui-toast-show'));
  }

  function __removeToast(toast) {
    setTimeout(() => toast.remove(), 1000);
    toast.classList.remove('ui-toast-show');
  }
}