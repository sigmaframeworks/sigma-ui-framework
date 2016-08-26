// UI Generic Data Model
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {transient} from "aurelia-framework";
import {getLogger, Logger} from "aurelia-logging";
import {ValidationController, ValidationControllerFactory} from "aurelia-validation";
import {UIHttpService} from "./ui-http-service";
import {_, UIUtils} from "./ui-utils";

@transient()
export class UIModel {
    public logger: Logger;
    public httpClient: UIHttpService;

    public controller: ValidationController;

    private __original: any;
    private __observers;

    constructor() {
        this.logger = getLogger(this.constructor.name);
        Object.defineProperties(this, {
            'httpClient': {
                value: UIUtils.lazy(UIHttpService),
                writable: false,
                enumerable: false
            },
            'controller': {
                value: UIUtils.lazy(ValidationControllerFactory).createForCurrentScope(),
                writable: true,
                enumerable: false
            },
            'logger': {
                value: getLogger(this.constructor.name),
                writable: false,
                enumerable: false
            },
            '__observers': {
                value: [],
                writable: true,
                enumerable: false
            },
            '__original': {
                value: {},
                writable: true,
                enumerable: false
            }
        });
        this.logger.info("Model Initialized");
    }

    get(...rest) {
        throw new Error('Not implemented [get]');
    }

    post(...rest) {
        throw new Error('Not implemented [post]');
    }

    put(...rest) {
        throw new Error('Not implemented [put]');
    }

    delete(...rest) {
        throw new Error('Not implemented [delete]');
    }

    dispose() {
        this.logger.debug("Model Disposing");
        while (this.__observers && this.__observers.length) {
            this.__observers.pop()
                .dispose();
        }
    }

    validate(): Promise<any> {
        return this.controller.validate();
    }

    deserialize(json) {
        this.__original = _.cloneDeep(json);
        Object.keys(this.__original)
            .forEach((key) => {
                if (this.hasOwnProperty(key)) this[key] = json[key];
            });
    }

    serialize() {
        try {
            return this.__serializeObject(this);
        }
        catch (e) {
            throw new Error(`Error serializing object [${this.constructor.name}]`);
        }
    }

    __serializeObject(o) {
        let _pojo = {};
        if (o instanceof Map) {
            o.forEach((obj, key) => {
                if (obj instanceof UIModel) {
                    _pojo[key] = obj.serialize();
                }
                if (_.isObject(obj)) {
                    _pojo[key] = this.__serializeObject(obj)
                }
                else if (_.isArray(obj)) {
                    _pojo[key] = obj.join(',');
                }
                else {
                    _pojo[key] = isEmpty(obj) ? null : obj;
                }
            })
        }
        else {
            Object.keys(o)
                .forEach((key) => {
                    if (key !== 'undefined' && !/^__/.test(key)) {
                        if (o[key] instanceof UIModel) {
                            _pojo[key] = o[key].serialize();
                        }
                        if (_.isObject(o[key])) {
                            _pojo[key] = this.__serializeObject(o[key])
                        }
                        else if (_.isArray(o[key])) {
                            _pojo[key] = o[key].join(',');
                        }
                        else {
                            _pojo[key] = isEmpty(o[key]) ? null : o[key];
                        }
                    }
                });
        }
        return _pojo;
    }

    ___serializeKey(key, o) {
        (key) => {
            if (key !== 'undefined' && !/^__/.test(key)) {
                if (o[key] instanceof UIModel) {
                    return o[key].serialize();
                }
                if (_.isObject(o[key])) {
                    return this.__serializeObject(o[key])
                }
                else if (_.isArray(o[key])) {
                    return o[key].join(',');
                }
                else {
                    return isEmpty(o[key]) ? null : o[key];
                }
            }
        }
    }

    isDirty() {
        if (_.isEmpty(this.__original)) {
            Object.keys(this)
                .forEach((key) => {
                    if (key !== 'undefined' && !/^__/.test(key)) {
                        this.__original[key] = this[key]
                    }
                });
        }
        return this.__checkDirty(this.__original, this);
    }

    __checkDirty(o, t) {
        return !Object.keys(o)
            .every((key) => {
                if (t[key] instanceof UIModel) return !t[key].isDirty();
                if (_.isArray(o[key]) && o[key].length != t[key].length) return false;
                if (_.isArray(o[key]) || _.isObject(o[key])) return !this.__checkDirty(o[key], t[key]);

                return t.hasOwnProperty(key) && (t[key] === o[key]);
            });
    }

    saveChanges() {
        this.__original = _.cloneDeep(this.serialize());
    }

    discardChanges() {
        Object.keys(_.cloneDeep(this.__original))
            .forEach((key) => {
                this[key] = this.__original[key];
            });
    }
}
