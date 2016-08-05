var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "./ui-application"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, ui_application_1) {
    "use strict";
    var UIHttpService = (function () {
        function UIHttpService(httpClient, appState, eventAggregator) {
            this.httpClient = httpClient;
            this.appState = appState;
            this.eventAggregator = eventAggregator;
            this.appState.info(this.constructor.name, 'Initialized');
            var self = this;
            httpClient.configure(function (config) {
                config
                    .withBaseUrl(appState.HttpConfig.BaseUrl)
                    .withInterceptor({
                    request: function (request) {
                        appState.info(self.constructor.name, "Requesting " + request.method + " " + request.url);
                        appState.IsHttpInUse = true;
                        return request;
                    },
                    response: function (response) {
                        appState.info(self.constructor.name, "Response " + response.status + " " + response.url);
                        appState.IsHttpInUse = false;
                        if (response instanceof TypeError) {
                            throw Error(response['message']);
                        }
                        if (response.status == 401) {
                            eventAggregator.publish('Unauthorized', null);
                        }
                        else if (response.status != 200) {
                            return response.text()
                                .then(function (resp) {
                                var json = {};
                                try {
                                    json = JSON.parse(resp);
                                }
                                catch (e) { }
                                if (json.message)
                                    throw Error(json.message);
                                if (json.error)
                                    throw Error(json.error);
                                if (response.statusText)
                                    throw Error(response.statusText);
                                if (!response.statusText)
                                    throw Error('Network Error!!');
                                return null;
                            });
                        }
                        return response;
                    },
                    requestError: function (error) {
                        appState.IsHttpInUse = false;
                        if (error !== null)
                            throw Error(error.message);
                        return error;
                    },
                    responseError: function (error) {
                        appState.IsHttpInUse = false;
                        if (error !== null)
                            throw Error(error.message);
                        return error;
                    }
                });
            });
        }
        UIHttpService.prototype.setBaseUrl = function (url) {
            this.httpClient.baseUrl = url;
        };
        UIHttpService.prototype.get = function (slug) {
            this.appState.info(this.constructor.name, "get [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        UIHttpService.prototype.text = function (slug) {
            this.appState.info(this.constructor.name, "text [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.text(); });
        };
        UIHttpService.prototype.put = function (slug, obj) {
            this.appState.info(this.constructor.name, "put [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'put',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        UIHttpService.prototype.post = function (slug, obj) {
            this.appState.info(this.constructor.name, "post [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'post',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        UIHttpService.prototype.delete = function (slug) {
            this.appState.info(this.constructor.name, "delete [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'delete',
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        UIHttpService.prototype.upload = function (slug, form) {
            this.appState.info(this.constructor.name, "upload [" + slug + "]");
            return this.__upload('post', slug, form);
        };
        UIHttpService.prototype.reupload = function (slug, form) {
            this.appState.info(this.constructor.name, "reupload [" + slug + "]");
            return this.__upload('put', slug, form);
        };
        UIHttpService.prototype.__upload = function (method, slug, form) {
            var data = new FormData();
            for (var i = 0, q = form.querySelectorAll('input'); i < q.length; i++) {
                if (q[i].type == 'file') {
                    var files = q[i]['draggedFiles'] || q[i].files;
                    for (var x = 0; x < files; x++) {
                        data.append((q[i].name || 'file') + (i + 1), files[x], files[x].name);
                    }
                }
                else {
                    data.append(q[i].name || ('input' + (i + 1)), q[i].value);
                }
            }
            return this.httpClient
                .fetch(slug, {
                method: method,
                body: data,
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        UIHttpService.prototype.__getHeaders = function () {
            var headers = {
                'X-Requested-With': 'Fetch',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            };
            Object.assign(headers, this.appState.HttpConfig.Headers || {});
            if (this.appState.HttpConfig.AuthorizationHeader && !isEmpty(this.appState.AuthUser)) {
                var token = this.appState.AuthUser + ":" + this.appState.AuthToken;
                var hash = btoa(token);
                headers['Authorization'] = "Basic " + hash;
            }
            return headers;
        };
        UIHttpService = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, ui_application_1.UIApplication, aurelia_event_aggregator_1.EventAggregator])
        ], UIHttpService);
        return UIHttpService;
    }());
    exports.UIHttpService = UIHttpService;
});
