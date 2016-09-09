var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./ui-input-group", "../utils/ui-utils", "../utils/ui-event"], function (require, exports, ui_input_group_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UIListBehaviour = (function (_super) {
        __extends(UIListBehaviour, _super);
        function UIListBehaviour(element) {
            _super.call(this, element);
            this.__noResult = false;
            this.__reverse = false;
            this.__hilight = null;
            this.__onlyAvailable = false;
        }
        UIListBehaviour.prototype.__select = function (item) { };
        UIListBehaviour.prototype.__deselect = function (item) { };
        UIListBehaviour.prototype.__scrollIntoView = function () { };
        UIListBehaviour.prototype.__gotFocus = function (show) { };
        UIListBehaviour.prototype.__lostFocus = function () { };
        UIListBehaviour.prototype.keyDown = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (this.readonly || this.disabled)
                return;
            if (code == 13 && this.__focus) {
                this.__select(this.__hilight);
                this.__focus = false;
                return false;
            }
            else if (code == 13 && !this.__focus) {
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element, this);
            }
            this.__focus = true;
            if (code === 8 && isEmpty(this.__searchText)) {
                this.__deselect(null);
            }
            if (this.__noResult)
                return true;
            if (code === 38) {
                var h = this.__list.querySelector('.ui-list-item.hilight');
                if (h === null)
                    h = this.__list.querySelector('.ui-list-item.selected');
                if (h != null) {
                    h = h.previousElementSibling;
                    if (h !== null && h.tagName === 'P')
                        h = h.previousElementSibling;
                    if (h !== null) {
                        if (this.__hilight != null)
                            this.__hilight.classList.remove('hilight');
                        (this.__hilight = h).classList.add('hilight');
                        this.__scrollIntoView();
                    }
                }
                return false;
            }
            else if (code === 40) {
                var h = this.__list.querySelector('.ui-list-item.hilight');
                if (h === null)
                    h = this.__list.querySelector('.ui-list-item.selected');
                if (h !== null)
                    h = h.nextElementSibling;
                if (h === null)
                    h = this.__list.querySelector('.ui-list-item');
                if (h !== null && h.tagName === 'P')
                    h = h.nextElementSibling;
                if (h !== null) {
                    if (this.__hilight != null)
                        this.__hilight.classList.remove('hilight');
                    (this.__hilight = h).classList.add('hilight');
                    this.__scrollIntoView();
                }
                return false;
            }
            return true;
        };
        UIListBehaviour.prototype.keyPress = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
        };
        UIListBehaviour.prototype.isScrolling = function (node) {
            return getComputedStyle(node).getPropertyValue('overflow') == 'auto' || getComputedStyle(node).getPropertyValue('overflow-y') == 'auto';
        };
        UIListBehaviour.prototype.showReverse = function () {
            var el = this.__input;
            var p = this.element;
            var top = 0;
            while (!this.isScrolling(p)) {
                top += p.offsetTop;
                p = p.offsetParent;
            }
            console.log(top, el.offsetHeight, p.scrollTop, p.offsetHeight);
            return p.scrollTop + p.offsetHeight < el.offsetHeight + top + 50;
        };
        UIListBehaviour.prototype.__searchTextChanged = function () {
            var _this = this;
            if (this.__noList)
                return;
            if (this.__hilight != null)
                this.__hilight.classList.remove('hilight');
            if (ui_utils_1._.isEmpty(this.__searchText)) {
                this.__options = ui_utils_1._.cloneDeep(this.__onlyAvailable ? this.__available : this.options);
                this.__noResult = isEmpty(this.__options);
                this.__isFiltered = false;
                return;
            }
            var opts = ui_utils_1._.cloneDeep(this.__onlyAvailable ? this.__available : this.options);
            var rx = new RegExp(ui_utils_1.UIUtils.getAscii(this.__searchText), 'i');
            if (this.__isGrouped) {
                this.__options = ui_utils_1._.forEach(opts, function (v, k) {
                    opts[k] = ui_utils_1._.filter(v, function (n) {
                        var lbl = n;
                        if (!isEmpty(n[_this.displayProperty])) {
                            lbl = n[_this.displayProperty];
                        }
                        lbl = lbl + '';
                        var asc = ui_utils_1.UIUtils.getAscii(lbl);
                        if (rx.test(asc)) {
                            if (n.hasOwnProperty(_this.displayProperty)) {
                                var start = asc.search(rx);
                                lbl = lbl.substr(0, start + _this.__searchText.length) + '</u>' +
                                    lbl.substr(start + _this.__searchText.length);
                                lbl = lbl.substr(0, start) + '<u>' + lbl.substr(start);
                                n['__display'] = lbl;
                            }
                            return true;
                        }
                        return false;
                    });
                    if (opts[k].length === 0)
                        delete opts[k];
                });
            }
            if (!this.__isGrouped) {
                this.__options = ui_utils_1._.filter(opts, function (n) {
                    var lbl = n;
                    if (!isEmpty(n[_this.displayProperty])) {
                        lbl = n[_this.displayProperty];
                    }
                    lbl = lbl + '';
                    var asc = ui_utils_1.UIUtils.getAscii(lbl);
                    if (rx.test(asc)) {
                        if (n.hasOwnProperty(_this.displayProperty)) {
                            var start = asc.search(rx);
                            lbl = lbl.substr(0, start + _this.__searchText.length) + '</u>' +
                                lbl.substr(start + _this.__searchText.length);
                            lbl = lbl.substr(0, start) + '<u>' + lbl.substr(start);
                            n['__display'] = lbl;
                        }
                        return true;
                    }
                    return false;
                });
            }
            this.__isFiltered = true;
            this.__noResult = isEmpty(this.__options);
            ui_event_1.UIEvent.queueTask(function () { return _this.__hilight = _this.__list.querySelector(".ui-list-item") || null; });
        };
        return UIListBehaviour;
    }(ui_input_group_1.UIInputGroup));
    exports.UIListBehaviour = UIListBehaviour;
});
