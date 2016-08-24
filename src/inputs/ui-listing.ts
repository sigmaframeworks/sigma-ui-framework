// UI List Behavior for Combobox, Tag, List
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {UIInputGroup} from "./ui-input-group";
import {_, UIUtils} from "../utils/ui-utils";
import {UIEvent} from "../utils/ui-event";

export class UIListBehaviour extends UIInputGroup {
    __list;
    __focus;
    __noList;
    __options;
    __isGrouped;
    __isFiltered;
    __available;
    __searchText;
    __subscribeSearch;
    __noResult = false;

    __reverse = false;

    __hilight: HTMLElement = null;

    options;
    displayProperty;

    __onlyAvailable = false;

    constructor(element: Element) {
        super(element);
    }

    __select(item) { }
    __deselect(item) { }
    __scrollIntoView() { }
    __gotFocus() { }
    __lostFocus() { }

    keyDown(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
        let code = (evt.keyCode || evt.which);

        if (code == 13 && this.__focus) {
            this.__select(this.__hilight);
            this.__focus = false;
            return false;
        }
        else if (code == 13 && !this.__focus) {
            return UIEvent.fireEvent('enterpressed', this.element, this);
        }


        this.__focus = true;
        if (code === 8 && isEmpty(this.__searchText)) {
            this.__deselect(null);
        }
        if (this.__noResult) return true;
        if (code === 38) {
            let h = this.__list.querySelector('.ui-list-item.hilight');
            // if no hilight get selected
            if (h === null) h = this.__list.querySelector('.ui-list-item.selected');
            if (h != null) {
                h = <HTMLElement>h.previousElementSibling;
                if (h !== null && h.tagName === 'P') h = <HTMLElement>h.previousElementSibling;
                if (h !== null) {
                    if (this.__hilight != null) this.__hilight.classList.remove('hilight');
                    (this.__hilight = h).classList.add('hilight');
                    this.__scrollIntoView();
                }
            }
            return false;
        }
        else if (code === 40) {
            let h = this.__list.querySelector('.ui-list-item.hilight');
            // if no hilight get selected
            if (h === null) h = this.__list.querySelector('.ui-list-item.selected');
            // if found hilight or selected get next
            if (h !== null) h = <HTMLElement>h.nextElementSibling;
            // if no selected get first
            if (h === null) h = this.__list.querySelector('.ui-list-item');
            // if group label get next
            if (h !== null && h.tagName === 'P') h = <HTMLElement>h.nextElementSibling;
            if (h !== null) {
                if (this.__hilight != null) this.__hilight.classList.remove('hilight');
                (this.__hilight = h).classList.add('hilight');
                this.__scrollIntoView();
            }
            return false;
        }
        return true;
    }

    keyPress(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
        let code = (evt.keyCode || evt.which);
    }

    __searchTextChanged() {
        if (this.__noList) return;
        if (this.__hilight != null) this.__hilight.classList.remove('hilight');
        if (_.isEmpty(this.__searchText)) {
            this.__options = _.cloneDeep(this.__onlyAvailable ? this.__available : this.options);
            this.__noResult = isEmpty(this.__options);
            this.__isFiltered = false;
            return;
        }
        var opts = _.cloneDeep(this.__onlyAvailable ? this.__available : this.options);
        var rx = new RegExp(UIUtils.getAscii(this.__searchText), 'i');
        if (this.__isGrouped) {
            this.__options = _.forEach(opts, (v, k) => {
                opts[k] = _.filter(v, (n: any) => {
                    var lbl = n;
                    if (!isEmpty(n[this.displayProperty])) {
                        lbl = n[this.displayProperty];
                    }
                    lbl = lbl + '';
                    let asc = UIUtils.getAscii(lbl);
                    if (rx.test(asc)) {
                        if (n.hasOwnProperty(this.displayProperty)) {
                            let start = asc.search(rx);
                            lbl = lbl.substr(0, start + this.__searchText.length) + '</u>' +
                                lbl.substr(start + this.__searchText.length);
                            lbl = lbl.substr(0, start) + '<u>' + lbl.substr(start);
                            n['__display'] = lbl;
                        }
                        return true;
                    }
                    return false;
                });
                if (opts[k].length === 0) delete opts[k];
            });
        }
        if (!this.__isGrouped) {
            this.__options = _.filter(opts, (n: any) => {
                var lbl = n;
                if (!isEmpty(n[this.displayProperty])) {
                    lbl = n[this.displayProperty];
                }
                lbl = lbl + '';
                let asc = UIUtils.getAscii(lbl);
                if (rx.test(asc)) {
                    if (n.hasOwnProperty(this.displayProperty)) {
                        let start = asc.search(rx);
                        lbl = lbl.substr(0, start + this.__searchText.length) + '</u>' +
                            lbl.substr(start + this.__searchText.length);
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
        setTimeout(() => this.__hilight = this.__list.querySelector(`.ui-list-item`) || null, 100);
    }
}
