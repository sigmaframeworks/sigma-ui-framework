// UI Login Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, inject, NewInstance, customElement, containerless, bindable, transient, bindingMode} from "aurelia-framework";
import {UIEvent} from "../utils/ui-event";
import {UIUtils} from "../utils/ui-utils";
import {UIModel} from "../utils/ui-model";
import {UIApplication} from "../utils/ui-application";
import {ValidationRules, ValidationController} from "aurelia-validation";

@inject(Element, UIApplication, NewInstance.of(ValidationController))
@customElement('ui-login')
export class UILogin {
    model: LoginModel;

    __page;

    @bindable
    error: string;
    @bindable
    busy: boolean = false;

    __rowLayout = false;

    constructor(public element: Element, public appState: UIApplication, public controller: ValidationController) {
        this.model = new LoginModel();
        this.__rowLayout = element.hasAttribute('row-layout');
    }

    attached() {
        if (this.model.remember === true) this.doLogin();
    }

    doLogin() {
        this.controller.validate()
            .then(e => {
                if (e.length == 0) {
                    this.error = '';
                    UIEvent.queueTask(() => UIEvent.fireEvent('login', this.element, this.model));
                }
            });
    }

    toast(config) {
        if (typeof config === 'string') config = { message: config };
        config.extraClass = 'ui-page-toast';
        UIUtils.showToast(this.__page, config);
    }
}

@transient()
@autoinject()
export class LoginModel extends UIModel {
    username: string = '';
    password: string = '';

    remember: boolean = false;

    appState: UIApplication;

    constructor() {
        super();

        let _u, _p;
        this.appState = UIUtils.lazy(UIApplication);
        if ((_u = this.appState.persist('AppUsername')) !== null) {
            this.username = _u;
        }
        if ((_p = this.appState.persist('AppPassword')) !== null) {
            this.password = _p;
            this.remember = true;
        }

        ValidationRules
            .ensure((model: LoginModel) => model.username)
            .required()
            .email()
            .ensure(model => model.password)
            .required()
            .on(LoginModel);
    }

    save() {
        this.appState.persist('AppUsername', this.username);
        this.appState.persist('AppPassword', this.remember ? this.password : null);
    }
}
