// 
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT

import {autoinject, DOM} from "aurelia-framework";
import {ValidationRules, RenderInstruction, ValidationError} from "aurelia-validation";

@autoinject
export class UIValidationRenderer {

  render(instruction: RenderInstruction) {
    for (let { error, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, error);
      }
    }

    for (let { error, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, error);
      }
    }
  }

  add(element: Element, error: ValidationError) {
    element.classList.add('ui-invalid');
    element.classList.remove('ui-valid');

    try {
      let vm = element.au.controller.viewModel;
      if (!vm.__errors) vm.__errors = [];
      vm.__errors.push(error);
    } catch (E) { }
  }

  remove(element: Element, error: ValidationError) {
    element.classList.remove('ui-invalid');
    element.classList.add('ui-valid');

    try {
      let vm = element.au.controller.viewModel;
      let i = vm.__errors.length;
      while (i--) {
        let message: any = vm.__errors[i];
        if (message.id == error.id) {
          vm.__errors.splice(i, 1);
          break;
        }
      }
      if (vm.__errors.length == 0) {
        element.classList.remove('ui-invalid');
        element.classList.add('ui-valid');
      }
    } catch (E) { }
  }
}
