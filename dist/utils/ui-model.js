var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-logging", "aurelia-validation", "./ui-http-service", "./ui-utils"], function (require, exports, aurelia_framework_1, aurelia_logging_1, aurelia_validation_1, ui_http_service_1, ui_utils_1) {
    "use strict";
    var UIModel = (function () {
        function UIModel() {
            this.logger = aurelia_logging_1.getLogger(this.constructor.name);
            Object.defineProperties(this, {
                'httpClient': {
                    value: ui_utils_1.UIUtils.lazy(ui_http_service_1.UIHttpService),
                    writable: false,
                    enumerable: false
                },
                'controller': {
                    value: ui_utils_1.UIUtils.lazy(aurelia_validation_1.ValidationControllerFactory).createForCurrentScope(),
                    writable: true,
                    enumerable: false
                },
                'logger': {
                    value: aurelia_logging_1.getLogger(this.constructor.name),
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
        UIModel.prototype.get = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            throw new Error('Not implemented [get]');
        };
        UIModel.prototype.post = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            throw new Error('Not implemented [post]');
        };
        UIModel.prototype.put = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            throw new Error('Not implemented [put]');
        };
        UIModel.prototype.delete = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            throw new Error('Not implemented [delete]');
        };
        UIModel.prototype.dispose = function () {
            this.logger.debug("Model Disposing");
            while (this.__observers && this.__observers.length) {
                this.__observers.pop()
                    .dispose();
            }
        };
        UIModel.prototype.validate = function () {
            return this.controller.validate();
        };
        UIModel.prototype.deserialize = function (json) {
            var _this = this;
            this.__original = ui_utils_1._.cloneDeep(json);
            Object.keys(this.__original)
                .forEach(function (key) {
                if (_this.hasOwnProperty(key))
                    _this[key] = json[key];
            });
        };
        UIModel.prototype.serialize = function () {
            try {
                return this.__serializeObject(this);
            }
            catch (e) {
                throw new Error("Error serializing object [" + this.constructor.name + "]");
            }
        };
        UIModel.prototype.__serializeObject = function (o) {
            var _this = this;
            var _pojo = {};
            if (o instanceof Map) {
                o.forEach(function (obj, key) {
                    if (obj instanceof UIModel) {
                        _pojo[key] = obj.serialize();
                    }
                    if (ui_utils_1._.isObject(obj)) {
                        _pojo[key] = _this.__serializeObject(obj);
                    }
                    else if (ui_utils_1._.isArray(obj)) {
                        _pojo[key] = obj.join(',');
                    }
                    else {
                        _pojo[key] = isEmpty(obj) ? null : obj;
                    }
                });
            }
            else {
                Object.keys(o)
                    .forEach(function (key) {
                    if (key !== 'undefined' && !/^__/.test(key)) {
                        if (o[key] instanceof UIModel) {
                            _pojo[key] = o[key].serialize();
                        }
                        if (ui_utils_1._.isObject(o[key])) {
                            _pojo[key] = _this.__serializeObject(o[key]);
                        }
                        else if (ui_utils_1._.isArray(o[key])) {
                            _pojo[key] = o[key].join(',');
                        }
                        else {
                            _pojo[key] = isEmpty(o[key]) ? null : o[key];
                        }
                    }
                });
            }
            return _pojo;
        };
        UIModel.prototype.___serializeKey = function (key, o) {
            var _this = this;
            (function (key) {
                if (key !== 'undefined' && !/^__/.test(key)) {
                    if (o[key] instanceof UIModel) {
                        return o[key].serialize();
                    }
                    if (ui_utils_1._.isObject(o[key])) {
                        return _this.__serializeObject(o[key]);
                    }
                    else if (ui_utils_1._.isArray(o[key])) {
                        return o[key].join(',');
                    }
                    else {
                        return isEmpty(o[key]) ? null : o[key];
                    }
                }
            });
        };
        UIModel.prototype.isDirty = function () {
            var _this = this;
            if (ui_utils_1._.isEmpty(this.__original)) {
                Object.keys(this)
                    .forEach(function (key) {
                    if (key !== 'undefined' && !/^__/.test(key)) {
                        _this.__original[key] = _this[key];
                    }
                });
            }
            return this.__checkDirty(this.__original, this);
        };
        UIModel.prototype.__checkDirty = function (o, t) {
            var _this = this;
            return !Object.keys(o)
                .every(function (key) {
                if (t[key] instanceof UIModel)
                    return !t[key].isDirty();
                if (ui_utils_1._.isArray(o[key]) && o[key].length != t[key].length)
                    return false;
                if (ui_utils_1._.isArray(o[key]) || ui_utils_1._.isObject(o[key]))
                    return !_this.__checkDirty(o[key], t[key]);
                return t.hasOwnProperty(key) && (t[key] === o[key]);
            });
        };
        UIModel.prototype.saveChanges = function () {
            this.__original = ui_utils_1._.cloneDeep(this.serialize());
        };
        UIModel.prototype.discardChanges = function () {
            var _this = this;
            Object.keys(ui_utils_1._.cloneDeep(this.__original))
                .forEach(function (key) {
                _this[key] = _this.__original[key];
            });
        };
        UIModel = __decorate([
            aurelia_framework_1.transient(), 
            __metadata('design:paramtypes', [])
        ], UIModel);
        return UIModel;
    }());
    exports.UIModel = UIModel;
});
