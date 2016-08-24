// UI List Reorder
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, bindable, bindingMode, autoinject} from "aurelia-framework";
import {_, UIUtils} from "../utils/ui-utils";

@autoinject()
@customElement('ui-reorder')
export class UIReorder {
    private ghostModel;

	/**
	   * @property    list
	   * @type        array
	   */
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    list: Array<any> = [];
	/**
	 * @property    display-property
	 * @type        string
	 */
    @bindable()
    displayProperty: any = 'name';


    constructor(public element: Element) {
    }

    private __startY = 0;
    private __ghostEl;
    private __dragEl;
    private __diff = 0
    private __top = 0;

    private __move;
    private __stop;
    private __list;

    startDrag(opt, $event) {
        if ($event.button != 0) return;
        this.ghostModel = opt;

        this.__dragEl = getParentByClass($event.target, 'ui-list-item', 'ui-list-group');
        this.__top = this.__diff = this.__dragEl.offsetTop;
        this.__dragEl.classList.add('dragging');
        this.__list = this.element.querySelectorAll('.ui-list-item');

        this.__startY = ($event.y || $event.clientY);

        document.addEventListener('mousemove', this.__move = e => this.move(e));
        document.addEventListener('mouseup', this.__stop = e => this.stopDrag(e));
    }

    move($event) {
        var y = ($event.y || $event.clientY) - this.__startY;

        this.__startY = ($event.y || $event.clientY);
        this.__diff += y;

        let sh = this.__dragEl.offsetParent.scrollHeight;
        this.__top = this.__diff < 0 ? 0 : (this.__diff > sh ? sh : this.__diff);
        this.__dragEl.offsetParent.scrollTop = this.__top - (sh / 2);

        if (this.__top >= this.__dragEl.offsetTop + this.__dragEl.offsetHeight) {
            let next = this.__dragEl.nextSibling;
            if (next) this.__dragEl.parentElement.insertBefore(next, this.__dragEl);
        }
        if (this.__top + this.__dragEl.offsetHeight <= this.__dragEl.offsetTop) {
            let prev = this.__dragEl.previousSibling;
            if (prev) this.__dragEl.parentElement.insertBefore(this.__dragEl, prev);
        }

    }
    stopDrag($event) {
        this.__dragEl.classList.remove('dragging');
        this.ghostModel = null;

        let list = this.element.querySelectorAll('.ui-list-item');
        let newList = [];
        _.forEach(list, (l: any) => {
            if (l.model) newList.push(l.model);
        });
        this.list = newList;

        document.removeEventListener('mousemove', this.__move);
        document.removeEventListener('mouseup', this.__stop);
    }
}
