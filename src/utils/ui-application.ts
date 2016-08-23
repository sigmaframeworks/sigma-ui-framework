// UI Application
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {singleton, autoinject} from "aurelia-framework";
import {getLogger} from "aurelia-logging";
import {UIUtils} from "./ui-utils";
import {UIEvent} from "./ui-event";
import {Redirect, Router} from "aurelia-router";
import {UIConstants} from "./ui-constants";

@singleton()
@autoinject()
export class UIApplication {

	private __logger;

	public AppConfig = UIConstants.App;
	public HttpConfig = UIConstants.Http;

	public IsHttpInUse: boolean = false;
	public IsAuthenticated: boolean = false;

	constructor(public router: Router) {
		this.__logger = getLogger('UIApplication');
		this.__logger.info('Initialized');

		Object.assign(this.AppConfig, UIConstants.App);
		Object.assign(this.HttpConfig, UIConstants.Http);
	}

	navigate(hash) {
		this.__logger.info("navigate::" + hash);
		this.router.navigate(hash);
	}

	navigateTo(route, params = {}) {
		this.__logger.info("navigateTo::" + route);
		this.router.navigateToRoute(route, params);
	}

	/** App Constants **/
	private __username;
	private __userGroup;
	private __userGroupLabel;
	private __authUser;
	private __authToken;

	get Username() {
		return this.__username;
	}

	set Username(v) {
		this.__username = v;
	}

	get UserGroup() {
		return this.__userGroup;
	}

	set UserGroup(v) {
		this.__userGroup = v;
	}

	get UserGroupLabel() {
		return this.__userGroupLabel;
	}

	set UserGroupLabel(v) {
		this.__userGroupLabel = v;
	}

	get AuthUser() {
		return this.__authUser;
	}

	set AuthUser(v) {
		this.__authUser = v;
	}

	get AuthToken() {
		return this.__authToken;
	}

	set AuthToken(v) {
		this.__authToken = v;
	}

	private __sharedState = {};
	shared(key, value: any = '§') {
		if (value === '§') {
			return this.__sharedState[key];
		}
		else if (value === null) {
			delete this.__sharedState[key];
		}
		else {
			this.__sharedState[key] = value;
		}
		return null;
	}

	/** Session State **/
	session(key, value: any = '§') {
		if (window.sessionStorage) {
			if (value === '§') {
				return JSON.parse(window.sessionStorage.getItem(this.AppConfig.Key + ':' + key));
			}
			else if (value === null) {
				window.sessionStorage.removeItem(this.AppConfig.Key + ':' + key);
			}
			else {
				window.sessionStorage.setItem(this.AppConfig.Key + ':' + key, JSON.stringify(value));
			}
		}
		return null;
	}

	clearSession() {
		if (window.sessionStorage) window.sessionStorage.clear();
	}

	/** Persistent State **/
	persist(key, value: any = '§') {
		if (window.localStorage) {
			if (value === '§') {
				return JSON.parse(window.localStorage.getItem(this.AppConfig.Key + ':' + key));
			}
			else if (value === null) {
				window.localStorage.removeItem(this.AppConfig.Key + ':' + key);
			}
			else {
				window.localStorage.setItem(this.AppConfig.Key + ':' + key, JSON.stringify(value));
			}
		}
		return null;
	}

	/** Logger **/
	info(tag, msg, ...rest) {
		this.__logger.info(`${tag}::${msg}`, rest);
	}

	warn(tag, msg, ...rest) {
		this.__logger.warn(`${tag}::${msg}`, rest);
	}

	debug(tag, msg, ...rest) {
		this.__logger.debug(`${tag}::${msg}`, rest);
	}

	error(tag, msg, ...rest) {
		this.__logger.error(`${tag}::${msg}`, rest);
	}

	/** Toast **/
	private __overlayContainer;

	toast(config) {
		if (!this.__overlayContainer) this.__overlayContainer = document.body.querySelector('.ui-viewport .ui-overlay-container');
		UIUtils.showToast(this.__overlayContainer, config);
	}

	toastSuccess(config) {
		if (!this.__overlayContainer) this.__overlayContainer = document.body.querySelector('.ui-viewport .ui-overlay-container');
		if (typeof config === 'string') config = { message: config };
		config.theme = 'success';
		UIUtils.showToast(this.__overlayContainer, config);
	}

	toastError(config) {
		if (!this.__overlayContainer) this.__overlayContainer = document.body.querySelector('.ui-viewport .ui-overlay-container');
		if (typeof config === 'string') config = { message: config };
		config.theme = 'danger';
		UIUtils.showToast(this.__overlayContainer, config);
	}


	alert(config) {
		if (typeof config === 'string') config = { message: config };
		config.type = config.type || "info";
		config.button = config.button || "OK";
		UIUtils.alert(config);
	}
	confirm(config) {
		if (typeof config === 'string') config = { message: config };
		config.yesLabel = config.button || "Yes";
		config.noLabel = config.button || "No";
		return UIUtils.confirm(config);
	}
}


@singleton()
@autoinject()
export class AuthInterceptor {
	private logger;

	constructor(public appState: UIApplication) {
		this.logger = getLogger('AuthInterceptor');
		this.logger.info('Initialized');

		UIEvent.subscribe('Unauthorized', () => appState.navigateTo('login', { status: 401 }));
	}

	run(routingContext, next) {
		// Check if the route has an "auth" key
		// The reason for using `nextInstructions` is because this includes child routes.
		if (routingContext.getAllInstructions()
			.some(i => i.config.auth)) {
			if (!this.appState.IsAuthenticated) {
				this.logger.warn('Not authenticated');
				let url = routingContext.router.generate('login', { status: 401 });
				this.appState.IsAuthenticated = false;
				this.appState.session('AppCurrentRoute', [routingContext.config.route, routingContext.params]);
				this.appState.session('AppCurrentFragment', routingContext.fragment);
				return next.reject(new Redirect(url));
			}
		}
		// Check if route is not login then check if the user group is allowed to access the route
		if (!routingContext.config.isLogin && !this.isAllowed(routingContext.config.group)) {
			this.logger.warn(`Access denied [${routingContext.config.group}]`);
			this.appState.toast({ message: '⚠︎ Access Denied', theme: 'danger' });
			return next.reject();
		}

		return next();
	}

	// Test user group against permitted route groups
	isAllowed(groups) {
		if (groups && this.appState.UserGroup !== null) {
			return new RegExp(`^(${groups})$`).test(this.appState.UserGroup);
		}

		return true;
	}
}
