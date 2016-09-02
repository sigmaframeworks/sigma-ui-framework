import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {UIConstants, UIEvent, UIApplication} from "sigma-ui-framework";
import {I18N} from 'aurelia-i18n';

@autoinject()
export class App {
    private router: Router;

    configureRouter(config, router: Router) {
    }
    constructor(public element: Element, public app: UIApplication, public i18n: I18N) {
    }
}
