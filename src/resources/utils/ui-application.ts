// UI Application
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {singleton, autoinject} from "aurelia-framework";
import {Redirect, Router} from "aurelia-router";
import {getLogger} from "aurelia-logging";
import {UIConstants} from "./ui-constants";
import {UIUtils} from "./ui-utils";
import {UIEvent} from "./ui-event";

@singleton()
@autoinject()
export class UIApplication {

  private __logger;

  public IsHttpInUse: boolean = false;
  public IsAuthenticated: boolean = false;

  constructor(public router: Router) {
    this.__logger = getLogger('UIApplication');
    this.__logger.info('Initialized');
  }

  navigate(hash, options?) {
    this.__logger.info("navigate::" + hash);
    this.router.navigate(hash, options);
  }

  navigateTo(route, params = {}, options?) {
    this.__logger.info("navigateTo::" + route);
    this.router.navigateToRoute(route, params, options);
  }

  /** App Constants **/
  private __authUser;
  private __authToken;

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

  login(authUser, authToken?) {
    this.AuthUser = authUser;
    this.AuthToken = authToken;
    this.IsAuthenticated = true;
    this.navigateTo('');
  }
  logout() {
    this.AuthUser = null;
    this.AuthToken = null;
    this.persist('AppPassword', null);
    this.IsAuthenticated = false;
    this.navigateTo('login');
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
        return JSON.parse(window.sessionStorage.getItem(UIConstants.App.Key + ':' + key));
      }
      else if (value === null) {
        window.sessionStorage.removeItem(UIConstants.App.Key + ':' + key);
      }
      else {
        window.sessionStorage.setItem(UIConstants.App.Key + ':' + key, JSON.stringify(value));
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
        return JSON.parse(window.localStorage.getItem(UIConstants.App.Key + ':' + key));
      }
      else if (value === null) {
        window.localStorage.removeItem(UIConstants.App.Key + ':' + key);
      }
      else {
        window.localStorage.setItem(UIConstants.App.Key + ':' + key, JSON.stringify(value));
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

  /** Toasts / Alerts **/
  toast(config) {
    UIUtils.showToast(config);
  }

  toastSuccess(config) {
    if (typeof config === 'string') config = { message: config };
    config.theme = 'success';
    UIUtils.showToast(config);
  }

  toastError(config) {
    if (typeof config === 'string') config = { message: config };
    config.theme = 'danger';
    UIUtils.showToast(config);
  }


  alert(config) {
    if (typeof config === 'string') config = { message: config };
    config.type = config.type || "info";
    config.button = config.okLabel || "OK";
    return UIUtils.alert(config);
  }
  confirm(config) {
    if (typeof config === 'string') config = { message: config };
    config.yesLabel = config.yesLabel || "Yes";
    config.noLabel = config.noLabel || "No";
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

    return next();
  }
}
