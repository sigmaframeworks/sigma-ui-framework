// UI Validation Renderer
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, DOM} from "aurelia-framework";
import {ValidationRules, RenderInstruction, ValidationError} from "aurelia-validation";

@autoinject
export class UIValidationRenderer {
    constructor() {

    }

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
        let formGroup: any = getParentByClass(element, 'ui-input-group');
        if (!formGroup) return;
        let isDual = formGroup.isDual;
        formGroup.classList.add('ui-invalid');
        formGroup.classList.remove('ui-valid');

        if (formGroup.errorIcon) {
            let errs = (formGroup.errorIcon.errors = formGroup.errorIcon.errors || []);
            errs.push(error);
        }

        // if (formGroup.lastElementChild !== null) formGroup = formGroup.lastElementChild;

        // let helpBlock;
        // if (!helpBlock) {
        //     helpBlock = DOM.createElement('div');
        //     helpBlock.classList.add('ui-input-help');
        //     helpBlock.classList.add('ui-input-error');
        //     helpBlock.errorId = error.id;
        //     formGroup.appendChild(helpBlock);
        // }
        // helpBlock.error = error;
        // helpBlock.textContent = error ? error.message : 'Invalid';
    }

    remove(element: Element, error: ValidationError) {
        let formGroup: any = getParentByClass(element, 'ui-input-group');
        if (!formGroup) return;

        if (formGroup.errorIcon) {
            let errs = formGroup.errorIcon.errors || [];
            let i = errs.length;
            while (i--) {
                let message: any = errs[i];
                if (message.id == error.id) {
                    errs.splice(i, 1);
                    break;
                }
            }
            if (errs.length == 0) {
                formGroup.classList.remove('ui-invalid');
                formGroup.classList.add('ui-valid');
            }
        }

        // remove all messages related to the error.
        // let messages = formGroup.querySelectorAll('.ui-input-error');
        // let i = messages.length;
        // while (i--) {
        //     let message: any = messages[i];
        //     if (message.errorId == error.id) {
        //         message.remove();
        //         break;;
        //     }
        // }
        //
        // if (formGroup.querySelectorAll('.ui-input-error').length == 0) {
        //     formGroup.classList.remove('ui-invalid');
        //     formGroup.classList.add('ui-valid');
        // }
    }
}
