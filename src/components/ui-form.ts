// UI Form Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, inlineView, bindingMode} from "aurelia-framework";
import {UIEvent} from "../utils/ui-event";
import {_, UIUtils} from "../utils/ui-utils";

@autoinject
@customElement('ui-form')
export class UIForm {
    @bindable
    busy: boolean;

    private __form: HTMLElement;

    constructor(public element: Element) {
        if (!this.element.hasAttribute('auto-grid')) this.element.classList.add('two-column');
    }

    attached() {
        setTimeout(() => {
            let el: any = this.element.querySelector('ui-input input,textarea,ui-phone input');
            if (!isEmpty(el)) el.focus();
        }, 10);

        if (this.busy) setTimeout(() => this.busyChanged(true), 200);
    }

    busyChanged(newValue: any) {
        let els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-input-dual,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-phone,ui-switch,ui-tags,ui-textarea');
        _.forEach(els, el => {
            try {
                el.au.controller.viewModel.disable(isTrue(newValue));
            } catch (e) {
            }
        });
    }

    fireSubmit() {
        UIEvent.fireEvent('submit', this.element, this);
    }

    getForm() {
        return this.__form;
    }
}

@autoinject
@customElement('ui-fieldset')
@inlineView('<template class="ui-fieldset"><fieldset><legend if.bind="label"><ui-checkbox checked.bind="enabled" if.bind="checkbox">${label}</ui-checkbox><span if.bind="!checkbox">${label}</span></legend><slot></slot></fieldset></template>')
export class UIFieldset {
    @bindable()
    label: string = '';
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    enabled: boolean = true;

    private checkbox = false;
    constructor(public element: Element) {
        this.checkbox = this.element.hasAttribute('enabled');
    }

    bind() {
        this.enabled = isTrue(this.enabled);
    }

    enabledChanged(newValue) {
        this.enabled = isTrue(newValue);
        this.element.classList[this.enabled ? 'remove' : 'add']('ui-disabled');
    }
}
