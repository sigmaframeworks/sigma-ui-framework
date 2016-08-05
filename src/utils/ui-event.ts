// UI Event Utility
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {UIUtils} from "./ui-utils";
import {BindingEngine, PropertyObserver, DOM} from "aurelia-framework";
import {EventAggregator, Subscription} from "aurelia-event-aggregator";

export module UIEvent {
	export function fireEvent(event: string,
		element: EventTarget,
		data?: any): any {

		let e = DOM.createCustomEvent(event, { bubbles: true, cancelable: true, detail: data });
		return element.dispatchEvent(e);
	}


	var __ea;
	var __ob;

	export function broadcast(event, data) {
		if (!__ea) {
			__ea = UIUtils.lazy(EventAggregator);
		}
		__ea.publish(event, data);
	}

	export function observe(object, property): PropertyObserver {
		if (!__ob) {
			__ob = UIUtils.lazy(BindingEngine);
		}
		return __ob.propertyObserver(object, property);
	}

	export function subscribe(event, callback): Subscription {
		if (!__ea) {
			__ea = UIUtils.lazy(EventAggregator);
		}
		return __ea.subscribe(event, callback);
	}
}
