define(["require", "exports", "aurelia-framework", "./ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    var UIUtils;
    (function (UIUtils) {
        function lazy(T) {
            if (!this.auContainer) {
                throw new Error('UIUtils.Lazy::Container not set');
            }
            return aurelia_framework_1.Lazy.of(T).get(this.auContainer)();
        }
        UIUtils.lazy = lazy;
        function newInstance(T, container) {
            if (!this.auContainer) {
                throw new Error('UIUtils.newInstance::Container not provided');
            }
            return aurelia_framework_1.NewInstance.of(T).get(this.auContainer);
        }
        UIUtils.newInstance = newInstance;
        var __compiler;
        var __resources;
        function compileView(markup, container, vm) {
            if (!__compiler)
                __compiler = this.lazy(aurelia_framework_1.ViewCompiler);
            if (!__resources)
                __resources = this.lazy(aurelia_framework_1.ViewResources);
            var viewFactory = __compiler.compile("<template>" + markup + "</template>", __resources);
            var view = viewFactory.create(this.auContainer);
            view.bind(vm);
            var slot = new aurelia_framework_1.ViewSlot(container, true);
            slot.add(view);
            slot.attached();
            if (isFunction(vm.attached))
                vm.attached();
            return view;
        }
        UIUtils.compileView = compileView;
        function alert(config) {
            var _this = this;
            var type = "fi-ui-info";
            if (config.type == "error")
                type = "fi-ui-error";
            if (config.type == "exclaim")
                type = "fi-ui-exclamation";
            return new Promise(function (resolve, reject) {
                var view = UIUtils.compileView("<div class=\"ui-dialog-wrapper ui-modal\" ref=\"__wrapper\">\n      <div class=\"ui-dialog ui-alert\">\n      <input style=\"position:fixed;top:-100%\" ref=\"__focusBlock\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"/>\n      <div class=\"ui-message-bar\">\n      <span class=\"" + (type || 'info') + "\"></span><p innerhtml.bind='message'></p></div>\n      <div class=\"ui-button-bar\"><button click.trigger=\"closeAlert()\">" + (config.okLabel || 'OK') + "</button></div>\n      </div></div>", _this.dialogContainer, {
                    __wrapper: null,
                    __focusBlock: null,
                    message: config.message,
                    attached: function () {
                        this.__focusBlock.focus();
                    },
                    closeAlert: function () {
                        resolve();
                        this.__wrapper.remove();
                    },
                    cancelBlur: function ($event) {
                        $event.preventDefault();
                        this.__focusBlock.focus();
                        return false;
                    },
                    checkKey: function ($event) {
                        var key = ($event.keyCode || $event.which);
                        if (key == 13)
                            this.closeAlert();
                        if (key == 27)
                            this.closeAlert();
                    }
                });
            });
        }
        UIUtils.alert = alert;
        function confirm(config) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var view = UIUtils.compileView("<div class=\"ui-dialog-wrapper ui-modal\" ref=\"__wrapper\">\n      <div class=\"ui-dialog ui-alert\">\n      <input style=\"position:fixed;top:-100%\" ref=\"__focusBlock\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"/>\n      <div class=\"ui-message-bar\">\n      <span class=\"fi-ui-question\"></span><p innerhtml.bind='message'></p></div>\n      <div class=\"ui-button-bar\"><button class=\"default\" click.trigger=\"closeAlert(true)\">" + (config.yesLabel || 'Yes') + "</button>\n      <button click.trigger=\"closeAlert(false)\">" + (config.noLabel || 'No') + "</button></div>\n      </div></div>", _this.dialogContainer, {
                    __wrapper: null,
                    __focusBlock: null,
                    message: config.message,
                    attached: function () {
                        this.__focusBlock.focus();
                    },
                    closeAlert: function (b) {
                        resolve(b);
                        this.__wrapper.remove();
                    },
                    cancelBlur: function ($event) {
                        $event.preventDefault();
                        this.__focusBlock.focus();
                        return false;
                    },
                    checkKey: function ($event) {
                        var key = ($event.keyCode || $event.which);
                        if (key == 13)
                            this.closeAlert(true);
                        if (key == 27)
                            this.closeAlert(false);
                    }
                });
            });
        }
        UIUtils.confirm = confirm;
        function showToast(config, container) {
            var tmr;
            if (typeof config === 'string')
                config = { message: config };
            var opt = Object.assign({ theme: 'default', autoHide: 5000, extraClass: '' }, config);
            var toast = document.createElement('div');
            toast.classList.add('ui-toast');
            toast.classList.add(opt.theme);
            if (!isEmpty(opt.extraClass))
                toast.classList.add(opt.extraClass);
            toast.innerHTML = "<div class=\"ui-toast-wrapper\">\n        " + (opt.icon ? '<span class="ui-icon ' + opt.icon + '"></span>' : '') + "\n        <p class=\"ui-message\">" + opt.message + "</p>\n        <span class=\"ui-close\">&times;</span>\n      </div>";
            (container || this.overlayContainer).appendChild(toast);
            if (opt.autoHide > 0)
                tmr = setTimeout(function () { return __removeToast(toast); }, opt.autoHide);
            toast.onclick = function () {
                clearTimeout(tmr);
                __removeToast(toast);
            };
            ui_event_1.UIEvent.queueTask(function () { return toast.classList.add('ui-toast-show'); });
        }
        UIUtils.showToast = showToast;
        function __removeToast(toast) {
            setTimeout(function () { return toast.remove(); }, 1000);
            toast.classList.remove('ui-toast-show');
        }
    })(UIUtils = exports.UIUtils || (exports.UIUtils = {}));
});
