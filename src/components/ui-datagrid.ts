// UI Datagrid Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, customAttribute, bindable, useView, bindingMode, children, inlineView, BindingEngine} from "aurelia-framework";
import {BindingSignaler} from "aurelia-templating-resources";
import {UIFormat} from "../utils/ui-formatters";
import {UIEvent} from "../utils/ui-event";
import {_} from "../utils/ui-utils";

@autoinject()
@customElement('ui-datagrid')
export class UIDataGrid {
    static __id = 0;

    private __id;
    private __data = [];
    private __table;
    // private __tableLocked;
    // private __columns;
    // private __columnsLocked;
    // private __columnsList;
    private __tableWidth;
    private __ghost;
    private __indicator;
    private __wrapper;
    private __focusRow = 2;
    private __isProcessing = false;

    private columns = [];

    private __sortColumn;
    private __sortOrder;

    @bindable()
    defaultSort = 'id';
    @bindable()
    defaultOrder = 'asc';
    @bindable()
    dataList = [];
    @bindable()
    summaryRow = false;
    @bindable()
    useVirtual = false;
    @bindable()
    emptyText = '&nbsp;';

    @children('.ui-hide ui-data-column')
    colChilds = []

    private allowSelect = false;

    private __dataListChangeSubscriber;

    constructor(public element: Element, public signaler: BindingSignaler, public bindingEngine: BindingEngine) {
        this.__id = `UIDataGrid${UIDataGrid.__id++}:Refresh`;
        if (element.hasAttribute('auto-height')) this.element.classList.add('ui-auto-height');
    }

    bind() {
        this.__sortColumn = this.defaultSort;
        this.__sortOrder = this.defaultOrder;

        this.allowSelect = this.element.hasAttribute('selectable');

        this.__dataListChangeSubscriber = this.bindingEngine.collectionObserver(this.dataList).subscribe(e => {
            this.dataListChanged(this.dataList);
        });
    }

    unbind() {
        this.__dataListChangeSubscriber.dispose();
    }

    attached() {
        UIEvent.queueTask(() => this.__doSort(this.dataList));
    }

    colChildsChanged(newValue) {
        this.columns = _.orderBy(this.colChilds, ['__locked'], ['desc']);

        // this.__columnsLocked = _.filter(this.colChilds, ['__locked', true]);
        // this.__columnsList = _.filter(this.colChilds, ['__locked', false]);
        setTimeout(() => {
            var w = 0;
            _.forEach(this.columns, (c: any) => {
                c.edge = w;
                w += parseInt(c.width || 250);
                // return c.__locked;
            });
            this.__tableWidth = w;
            this.dataListChanged(this.dataList);
        }, 100);
    }

    dataListChanged(newValue) {
        // this.__table.style.tableLayout = 'auto';
        this.__doSort(newValue);
        // this.__table.style.tableLayout = 'fixed';
        this.signaler.signal(this.__id);
    }

    isLastLocked(locked, index) {
        return (locked && !(this.columns[index + 1] || { __locked: false }).__locked);
    }

    linkClicked($event, col, model) {
        $event.preventDefault();
        $event.cancelBubble = true;
        $event.stopPropagation();
        if (getParentByClass($event.target, 'ui-button', 'dg-col') === null &&
            getParentByClass($event.target, 'ui-link', 'dg-col') === null) {
            return false;
        }
        try {
            let target = getParentByClass($event.target, 'ui-button', 'dg-col') ||
                getParentByClass($event.target, 'ui-link', 'dg-col');
            if (!col.__hasMenu) {
                UIEvent.fireEvent('linkclick', this.element, { dataId: col.dataId, target: target, model: model });
            }
            if (col.__hasMenu) {
                let menu = document.querySelector('.ui-floating.show');
                if (menu) {
                    menu.classList.remove('show');
                    getParentByTag(menu, 'tr').classList.remove('focus');
                }

                // let el = <HTMLElement>target.parentElement.nextElementSibling;
                // let sc = el.parentElement.offsetParent.offsetParent.offsetParent;
                // if (sc.scrollTop + sc['offsetHeight'] < el.offsetHeight + el.offsetTop + 50) {
                // 	// this.__reverse = true;
                // 	el.style.bottom = el.offsetHeight + 'px';
                // }
                // else {
                // 	// this.__reverse = false;
                // 	el.style.bottom = "auto";
                // }

                target.parentElement.nextElementSibling.classList.add('show');
                getParentByTag(target, 'tr').classList.add('focus');
            }
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }

    menuClicked($event, col, model) {
        $event.preventDefault();
        $event.cancelBubble = true;
        $event.stopPropagation();
        getParentByTag($event.target, 'tr').classList.remove('focus');
        UIEvent.fireEvent('linkclick', this.element, { dataId: $event.detail, target: $event.target, model: model });
        return false;
    }

    rowSelect(model) {
        if (this.allowSelect)
            UIEvent.fireEvent('rowselect', this.element, model);
        return false;
    }

    sort($event, column) {
        if (column.__sortable !== true) return;

        this.__sortColumn = column.dataId;
        this.__sortOrder = $event.target.classList.contains('asc') ? 'desc' : 'asc';
        this.__doSort(this.dataList);
    }

    summary(column): string {
        if (_.isObject(this.summaryRow)) {
            return this.format(this.summaryRow[column.dataId], column, this.summaryRow);
        }
        else if (!_.isEmpty(column.summary)) {
            var v = 0, prefix = '';
            switch (column.summary) {
                case 'sum':
                    v = _.sumBy(this.__data, column.dataId);
                    break;
                case 'avg':
                    prefix = 'avg. ';
                    v = _.sumBy(this.__data, column.dataId) / this.__data.length;
                    break;
                default:
                    return column.summary;
            }
            return `<small>${prefix}</small>${this.format(v, column, {})}`;
        }
        else {
            return '&nbsp;';
        }
    }

    buildButton(value, column, model) {
        let ret, obj = {
            enabled: true, theme: column.buttonTheme, title: column.buttonTitle, icon: column.buttonIcon
        };
        if (isFunction(column.button)) {
            ret = column.button({ value: value, column: column, model: model });
        }
        if (_.isString(ret)) return `<span>${ret}</span>`;
        Object.assign(obj, ret || {});
        if (!obj.enabled) return '<span>&nbsp;</span>';
        return `<button class="ui-button ui-button-${obj.theme} ui-button-small">
					${obj.icon ? '<span class="' + obj.icon + '"></span>' : ''}
					${obj.title ? '<span>' + obj.title + '</span>' : ''}
				</button>`;
    }

    format(value, column, model): string {
        var retVal = '';
        var newValue = value;
        if (column.labels) {
            newValue = column.labels[value];
        }
        if (isFunction(column.value)) {
            newValue = column.value({ value: value, column: column, model: model });
        }

        if (isFunction(column.display)) {
            retVal = column.display({ value: value, column: column, model: model });
        }
        else {
            switch (column.__type) {
                case 'currency':
                    retVal = UIFormat.currency(newValue, model[column.symbol] || column.symbol || '$', column.format || '$ 0,0.00');
                    break;
                case 'number':
                    retVal = UIFormat.number(newValue, column.format || '0,0.00');
                    break;
                case 'date':
                    retVal = UIFormat.date(newValue, column.format || 'DD MMM YYYY');
                    break;
                case 'datetime':
                    retVal = UIFormat.date(newValue, column.format || 'DD MMM YYYY hh:mm A');
                    break;
                case 'fromnow':
                    retVal = UIFormat.fromNow(newValue);
                    break;
                case 'exrate':
                    retVal = UIFormat.exRate(newValue);
                    break;
                default:
                    retVal = newValue;
            }
        }
        return isEmpty(retVal) ? '&nbsp;' : retVal;
    }

    private __doSort(data) {
        if (this.columns.length == 0) return;
        let column = _.find(this.columns, ['dataId', this.__sortColumn]);
        let columnId = column.dataId || this.defaultSort;
        let siblingId = column.dataSort || this.defaultSort;
        this.__isProcessing = true;
        this.__data = [];
        this.__wrapper.scrollTop = 0;
        setTimeout(() => {
            this.__data = _.orderBy(data,
                [columnId, siblingId],
                [this.__sortOrder, this.defaultOrder]);
            UIEvent.queueTask(() => this.__isProcessing = false);
        }, 500);
        //setTimeout(()=> this.signaler.signal(this.__id + 'Button'), 100);
    }

    private __isResizing = false;
    private __startX = 0;
    private __diff = 0;
    private __index;
    private __column: HTMLTableColElement;

    private __move;
    private __stop;

    resizeStart($event) {
        if ($event.button != 0) return;
        if (!$event.target.classList.contains('resizer')) return;

        this.__index = $event.target.dataset['index'];

        var column = this.columns[this.__index];

        if (column.__resizeable !== true) return;

        document.addEventListener('mousemove', this.__move = e => this.resize(e));
        document.addEventListener('mouseup', this.__stop = e => this.resizeEnd(e));

        // let w = this.__tableLocked.offsetWidth;
        this.__column = this.__table.querySelector(`colgroup col[data-index="${this.__index}"]`);
        // if (!this.__column) w = 0;
        // if (!this.__column) this.__column = this.__tableLocked.querySelector(`colgroup col[data-index="${this.__index}"]`);
        this.__startX = ($event.x || $event.clientX);
        this.__isResizing = true;
        this.__diff = 0;

        this.__ghost.classList.add('resize');
        this.__ghost.classList.remove('ui-hide');
        this.__ghost.style.left = (this.__column.offsetLeft + parseInt(this.__column.width)) + 'px';
    }

    resize($event) {
        if (!this.__isResizing) return;

        var column = this.columns[this.__index];
        var x = ($event.x || $event.clientX) - this.__startX;
        if (x < 0 && (parseInt(this.__column.width) + this.__diff) <= (column.minWidth || 80)) return;
        if (x > 0 && (parseInt(this.__column.width) + this.__diff) >= (500)) return;

        this.__startX = ($event.x || $event.clientX);
        this.__diff += x;
        this.__ghost.style.left = (parseInt(this.__ghost.style.left) + x) + 'px';
    }

    resizeEnd($event) {
        document.removeEventListener('mousemove', this.__move);
        document.removeEventListener('mouseup', this.__stop);

        if (!this.__isResizing) return;
        this.__ghost.classList.add('ui-hide');
        this.__ghost.classList.remove('resize');

        var column = this.columns[this.__index];
        this.__isResizing = false;

        this.__column.width = column.width = (parseInt(this.__column.width) + this.__diff);
        this.__tableWidth = parseInt(this.__tableWidth) + this.__diff;

        var w = 0;
        _.forEach(this.columns, (c: any) => {
            c.edge = w;
            w += parseInt(c.width || 250);
            return c.__locked;
        });
    }
}

@autoinject()
@customElement('ui-data-column')
@inlineView('<template><slot></slot></template>')
export class UIDataColumn {
    @bindable()
    dataId: string;
    @bindable()
    dataSort: string;

    @bindable()
    format: string;
    @bindable()
    symbol: string;
    @bindable()
    summary: string;
    @bindable()
    labels: any;

    @bindable()
    value: any;
    @bindable()
    button: any;
    @bindable()
    display: any;

    @bindable()
    buttonTitle: string = '';
    @bindable()
    buttonIcon: string = '';
    @bindable()
    buttonTheme: string = '';
    @bindable()
    buttonMenu: Array<any>;

    @bindable()
    class: string = '';

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    width: number;
    @bindable({ defaultBindingMode: bindingMode.oneTime })
    minWidth: number;

    private edge = 0;

    private __title = '';
    private __type = 'text';
    private __align = 'start';
    private __link = false;
    private __button = false;
    private __locked = false;
    private __sortable = false;
    private __resizeable = false;
    public __hasMenu = false;

    constructor(public element: Element) {
        if (this.element.hasAttribute('center')) this.__align = 'center';
        if (this.element.hasAttribute('end')) this.__align = 'end';

        // Types
        if (this.element.hasAttribute('number')) this.__type = 'number';
        if (this.element.hasAttribute('currency')) this.__type = 'currency';
        if (this.element.hasAttribute('date')) this.__type = 'date';
        if (this.element.hasAttribute('datetime')) this.__type = 'datetime';
        if (this.element.hasAttribute('from-now')) this.__type = 'fromnow';
        if (this.element.hasAttribute('exrate')) this.__type = 'exrate';
        if (this.element.hasAttribute('color')) this.__type = 'color';

        this.__link = this.element.hasAttribute('link');
        this.__locked = this.element.hasAttribute('locked');
        this.__sortable = this.element.hasAttribute('sortable');
        this.__resizeable = this.element.hasAttribute('resizeable');

        this.element['columnDef'] = this;
    }

    bind() {
        if (this.element.hasAttribute('view')) this.buttonIcon = this.buttonIcon || 'fi-ui-view';
        if (this.element.hasAttribute('edit')) this.buttonIcon = this.buttonIcon || 'fi-ui-edit';
        if (this.element.hasAttribute('delete')) this.buttonIcon = this.buttonIcon || 'fi-ui-delete';

        this.__hasMenu = !!this.buttonMenu && this.buttonMenu.length > 0;
        if (this.__hasMenu) this.buttonIcon = this.buttonIcon || 'fi-ui-overflow-menu-alt';

        if (this.__button = !(isEmpty(this.buttonIcon) && isEmpty(this.buttonTitle) && !this.element.hasAttribute('button'))) this.__align = 'center';
    }

    attached() {
        this.__title = this.element.textContent;

        if (!this.width && !isEmpty(this.buttonIcon) && isEmpty(this.buttonTitle)) {
            this.width = convertToPx("2.5em", this.element);
        }
        else if (this.__type == 'date') {
            this.width = convertToPx("10em", this.element);
            this.__align = 'center';
        }
        else if (this.__type == 'datetime') {
            this.width = convertToPx("12em", this.element);
            this.__align = 'center';
        }
        else if (this.__type == 'exrate') {
            this.width = convertToPx("6em", this.element);
            this.__align = 'end';
        }
        else if (this.__type == 'fromnow') {
            this.width = convertToPx("10em", this.element);
        }
        else if (this.__type == 'number') {
            this.width = convertToPx("8em", this.element);
            this.__align = 'end';
        }
        else if (this.__type == 'currency') {
            this.width = convertToPx("8em", this.element);
            this.__align = 'end';
        }
        else {
            this.width = convertToPx(this.width || this.minWidth || '250px', this.element);
        }
    }
}


@autoinject()
@customElement('ui-pager')
@useView('./ui-pager.html')
export class UIPager {
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    current: number = 1;
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    total: number = 1;

    constructor(public element: Element) {
    }

    currentChanged(newValue) {
        if (isNaN(parseInt(newValue))) {
            newValue = this.current;
        }
        else {
            if (parseInt(newValue) < 1) newValue = 1;
            if (parseInt(newValue) > this.total) newValue = this.total;
            this.current = parseInt(newValue);
        }
    }

    fireChange(n) {
        if (n < 1 && this.current == 1) return;
        if (n > 0 && this.current == this.total) return;
        if (n === 0) this.current = 1;
        if (n === -1) this.current--;
        if (n === 1) this.current++;
        if (n === 2) this.current = this.total;
        UIEvent.fireEvent('pagechanged', this.element, this.current);
    }

    keyCheck(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || evt.charCode === 0) return true;

        if ((evt.which || evt.keyCode) === 13) {
            return UIEvent.fireEvent('pagechanged', this.element, this.current);
        }
        return /[0-9]/.test(String.fromCharCode(evt.charCode));
    }
}

@autoinject
@customAttribute('scroll-left')
export class ScrollLeftAttribute {
    constructor(public element: Element) {
    }

    valueChanged(newValue) {
        this.element.scrollLeft = newValue;
    }
}
