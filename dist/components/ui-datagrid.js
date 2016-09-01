var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-templating-resources", "../utils/ui-formatters", "../utils/ui-event", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, aurelia_templating_resources_1, ui_formatters_1, ui_event_1, ui_utils_1) {
    "use strict";
    var UIDataGrid = (function () {
        function UIDataGrid(element, signaler, bindingEngine) {
            this.element = element;
            this.signaler = signaler;
            this.bindingEngine = bindingEngine;
            this.__data = [];
            this.__focusRow = 2;
            this.__isProcessing = false;
            this.columns = [];
            this.defaultSort = 'id';
            this.defaultOrder = 'asc';
            this.dataList = [];
            this.summaryRow = false;
            this.useVirtual = false;
            this.emptyText = '&nbsp;';
            this.colChilds = [];
            this.allowSelect = false;
            this.__isResizing = false;
            this.__startX = 0;
            this.__diff = 0;
            this.__id = "UIDataGrid" + UIDataGrid.__id++ + ":Refresh";
            if (element.hasAttribute('auto-height'))
                this.element.classList.add('ui-auto-height');
        }
        UIDataGrid.prototype.bind = function () {
            var _this = this;
            this.__sortColumn = this.defaultSort;
            this.__sortOrder = this.defaultOrder;
            this.allowSelect = this.element.hasAttribute('selectable');
            this.__dataListChangeSubscriber = this.bindingEngine.collectionObserver(this.dataList).subscribe(function (e) {
                _this.dataListChanged(_this.dataList);
            });
        };
        UIDataGrid.prototype.unbind = function () {
            this.__dataListChangeSubscriber.dispose();
        };
        UIDataGrid.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () { return _this.__doSort(_this.dataList); });
        };
        UIDataGrid.prototype.colChildsChanged = function (newValue) {
            var _this = this;
            this.columns = ui_utils_1._.orderBy(this.colChilds, ['__locked'], ['desc']);
            ui_event_1.UIEvent.queueTask(function () {
                var w = 0;
                ui_utils_1._.forEach(_this.columns, function (c) {
                    c.edge = w;
                    w += parseInt(c.width || 250);
                });
                _this.__tableWidth = w;
                _this.dataListChanged(_this.dataList);
            });
        };
        UIDataGrid.prototype.dataListChanged = function (newValue) {
            this.__data = [];
            this.__wrapper.scrollTop = 0;
            this.__doSort(newValue);
        };
        UIDataGrid.prototype.isLastLocked = function (locked, index) {
            return (locked && !(this.columns[index + 1] || { __locked: false }).__locked);
        };
        UIDataGrid.prototype.linkClicked = function ($event, col, model) {
            $event.preventDefault();
            $event.cancelBubble = true;
            $event.stopPropagation();
            if (getParentByClass($event.target, 'ui-button', 'dg-col') === null &&
                getParentByClass($event.target, 'ui-link', 'dg-col') === null) {
                return false;
            }
            try {
                var target = getParentByClass($event.target, 'ui-button', 'dg-col') ||
                    getParentByClass($event.target, 'ui-link', 'dg-col');
                if (!col.__hasMenu) {
                    ui_event_1.UIEvent.fireEvent('linkclick', this.element, { dataId: col.dataId, target: target, model: model });
                }
                if (col.__hasMenu) {
                    var menu = document.querySelector('.ui-floating.show');
                    if (menu) {
                        menu.classList.remove('show');
                        getParentByTag(menu, 'tr').classList.remove('focus');
                    }
                    var td = getParentByTag(target, 'td');
                    var el = target.parentElement.nextElementSibling;
                    var sc = this.__wrapper;
                    el.classList.add('show');
                    if (sc.scrollTop + sc['offsetHeight'] < td.offsetHeight + td.offsetTop + el.offsetHeight) {
                        el.style.top = "auto";
                        el.style.bottom = '1.75em';
                    }
                    else {
                        el.style.top = '1.75em';
                        el.style.bottom = "auto";
                    }
                    getParentByTag(target, 'tr').classList.add('focus');
                }
            }
            catch (e) {
                console.log(e);
            }
            return false;
        };
        UIDataGrid.prototype.menuClicked = function ($event, col, model) {
            $event.preventDefault();
            $event.cancelBubble = true;
            $event.stopPropagation();
            getParentByTag($event.target, 'tr').classList.remove('focus');
            ui_event_1.UIEvent.fireEvent('linkclick', this.element, { dataId: $event.detail, target: $event.target, model: model });
            return false;
        };
        UIDataGrid.prototype.rowSelect = function (model) {
            if (this.allowSelect)
                ui_event_1.UIEvent.fireEvent('rowselect', this.element, model);
            return false;
        };
        UIDataGrid.prototype.sort = function ($event, column) {
            if (column.__sortable !== true)
                return;
            this.__sortColumn = column.dataId;
            this.__sortOrder = $event.target.classList.contains('asc') ? 'desc' : 'asc';
            this.__doSort(this.dataList);
        };
        UIDataGrid.prototype.summary = function (column) {
            if (ui_utils_1._.isObject(this.summaryRow)) {
                return this.format(this.summaryRow[column.dataId], column, this.summaryRow);
            }
            else if (!ui_utils_1._.isEmpty(column.summary)) {
                var v = 0, prefix = '';
                switch (column.summary) {
                    case 'sum':
                        v = ui_utils_1._.sumBy(this.__data, column.dataId);
                        break;
                    case 'avg':
                        prefix = 'avg. ';
                        v = ui_utils_1._.sumBy(this.__data, column.dataId) / this.__data.length;
                        break;
                    default:
                        return column.summary;
                }
                return "<small>" + prefix + "</small>" + this.format(v, column, {});
            }
            else {
                return '&nbsp;';
            }
        };
        UIDataGrid.prototype.buildButton = function (value, column, model) {
            var ret, obj = {
                enabled: true, theme: column.buttonTheme, title: column.buttonTitle, icon: column.buttonIcon
            };
            if (isFunction(column.button)) {
                ret = column.button({ value: value, column: column, model: model });
            }
            if (ui_utils_1._.isString(ret))
                return "<span>" + ret + "</span>";
            Object.assign(obj, ret || {});
            if (!obj.enabled)
                return '<span>&nbsp;</span>';
            return "<button class=\"ui-button ui-button-" + obj.theme + " ui-button-small\">\n\t\t\t\t\t" + (obj.icon ? '<span class="' + obj.icon + '"></span>' : '') + "\n\t\t\t\t\t" + (obj.title ? '<span>' + obj.title + '</span>' : '') + "\n\t\t\t\t</button>";
        };
        UIDataGrid.prototype.format = function (value, column, model) {
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
                        retVal = ui_formatters_1.UIFormat.currency(newValue, model[column.symbol] || column.symbol || '$', column.format || '$ 0,0.00');
                        break;
                    case 'number':
                        retVal = ui_formatters_1.UIFormat.number(newValue, column.format || '0,0.00');
                        break;
                    case 'date':
                        retVal = ui_formatters_1.UIFormat.date(newValue, column.format || 'DD MMM YYYY');
                        break;
                    case 'datetime':
                        retVal = ui_formatters_1.UIFormat.date(newValue, column.format || 'DD MMM YYYY hh:mm A');
                        break;
                    case 'fromnow':
                        retVal = ui_formatters_1.UIFormat.fromNow(newValue);
                        break;
                    case 'exrate':
                        retVal = ui_formatters_1.UIFormat.exRate(newValue);
                        break;
                    default:
                        retVal = newValue;
                }
            }
            return isEmpty(retVal) ? '&nbsp;' : retVal;
        };
        UIDataGrid.prototype.__doSort = function (data) {
            var _this = this;
            if (this.columns.length == 0)
                return;
            var column = ui_utils_1._.find(this.columns, ['dataId', this.__sortColumn]);
            var columnId = column.dataId || this.defaultSort;
            var siblingId = column.dataSort || this.defaultSort;
            this.__isProcessing = true;
            setTimeout(function () {
                _this.__data = ui_utils_1._.orderBy(data, [columnId, siblingId], [_this.__sortOrder, _this.defaultOrder]);
                ui_event_1.UIEvent.queueTask(function () {
                    _this.signaler.signal(_this.__id);
                    _this.__isProcessing = false;
                });
            }, 500);
        };
        UIDataGrid.prototype.resizeStart = function ($event) {
            var _this = this;
            if ($event.button != 0)
                return;
            if (!$event.target.classList.contains('resizer'))
                return;
            this.__index = $event.target.dataset['index'];
            var column = this.columns[this.__index];
            if (column.__resizeable !== true)
                return;
            document.addEventListener('mousemove', this.__move = function (e) { return _this.resize(e); });
            document.addEventListener('mouseup', this.__stop = function (e) { return _this.resizeEnd(e); });
            this.__column = this.__table.querySelector("colgroup col[data-index=\"" + this.__index + "\"]");
            this.__startX = ($event.x || $event.clientX);
            this.__isResizing = true;
            this.__diff = 0;
            this.__ghost.classList.add('resize');
            this.__ghost.classList.remove('ui-hide');
            this.__ghost.style.left = (this.__column.offsetLeft + parseInt(this.__column.width)) + 'px';
        };
        UIDataGrid.prototype.resize = function ($event) {
            if (!this.__isResizing)
                return;
            var column = this.columns[this.__index];
            var x = ($event.x || $event.clientX) - this.__startX;
            if (x < 0 && (parseInt(this.__column.width) + this.__diff) <= (column.minWidth || 80))
                return;
            if (x > 0 && (parseInt(this.__column.width) + this.__diff) >= (500))
                return;
            this.__startX = ($event.x || $event.clientX);
            this.__diff += x;
            this.__ghost.style.left = (parseInt(this.__ghost.style.left) + x) + 'px';
        };
        UIDataGrid.prototype.resizeEnd = function ($event) {
            document.removeEventListener('mousemove', this.__move);
            document.removeEventListener('mouseup', this.__stop);
            if (!this.__isResizing)
                return;
            this.__ghost.classList.add('ui-hide');
            this.__ghost.classList.remove('resize');
            var column = this.columns[this.__index];
            this.__isResizing = false;
            this.__column.width = column.width = (parseInt(this.__column.width) + this.__diff);
            this.__tableWidth = parseInt(this.__tableWidth) + this.__diff;
            var w = 0;
            ui_utils_1._.forEach(this.columns, function (c) {
                c.edge = w;
                w += parseInt(c.width || 250);
                return c.__locked;
            });
        };
        UIDataGrid.__id = 0;
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "defaultSort", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "defaultOrder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "dataList", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "summaryRow", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "useVirtual", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.children('.ui-hide ui-data-column'), 
            __metadata('design:type', Object)
        ], UIDataGrid.prototype, "colChilds", void 0);
        UIDataGrid = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-datagrid'), 
            __metadata('design:paramtypes', [Element, aurelia_templating_resources_1.BindingSignaler, aurelia_framework_1.BindingEngine])
        ], UIDataGrid);
        return UIDataGrid;
    }());
    exports.UIDataGrid = UIDataGrid;
    var UIDataColumn = (function () {
        function UIDataColumn(element) {
            this.element = element;
            this.buttonTitle = '';
            this.buttonIcon = '';
            this.buttonTheme = '';
            this.class = '';
            this.edge = 0;
            this.__title = '';
            this.__type = 'text';
            this.__align = 'start';
            this.__link = false;
            this.__button = false;
            this.__locked = false;
            this.__sortable = false;
            this.__resizeable = false;
            this.__hasMenu = false;
            if (this.element.hasAttribute('center'))
                this.__align = 'center';
            if (this.element.hasAttribute('end'))
                this.__align = 'end';
            if (this.element.hasAttribute('number'))
                this.__type = 'number';
            if (this.element.hasAttribute('currency'))
                this.__type = 'currency';
            if (this.element.hasAttribute('date'))
                this.__type = 'date';
            if (this.element.hasAttribute('datetime'))
                this.__type = 'datetime';
            if (this.element.hasAttribute('from-now'))
                this.__type = 'fromnow';
            if (this.element.hasAttribute('exrate'))
                this.__type = 'exrate';
            if (this.element.hasAttribute('color'))
                this.__type = 'color';
            this.__link = this.element.hasAttribute('link');
            this.__locked = this.element.hasAttribute('locked');
            this.__sortable = this.element.hasAttribute('sortable');
            this.__resizeable = this.element.hasAttribute('resizeable');
            this.element['columnDef'] = this;
        }
        UIDataColumn.prototype.bind = function () {
            if (this.element.hasAttribute('view'))
                this.buttonIcon = this.buttonIcon || 'fi-ui-view';
            if (this.element.hasAttribute('edit'))
                this.buttonIcon = this.buttonIcon || 'fi-ui-edit';
            if (this.element.hasAttribute('delete'))
                this.buttonIcon = this.buttonIcon || 'fi-ui-delete';
            this.__hasMenu = !!this.buttonMenu && this.buttonMenu.length > 0;
            if (this.__hasMenu)
                this.buttonIcon = this.buttonIcon || 'fi-ui-overflow-menu-alt';
            if (this.__button = !(isEmpty(this.buttonIcon) && isEmpty(this.buttonTitle) && !this.element.hasAttribute('button')))
                this.__align = 'center';
            if (!this.width && !isEmpty(this.buttonIcon) && isEmpty(this.buttonTitle)) {
                this.width = convertToPx("2.5em");
            }
            else if (this.__type == 'date') {
                this.width = convertToPx("10em");
                this.__align = 'center';
            }
            else if (this.__type == 'datetime') {
                this.width = convertToPx("12em");
                this.__align = 'center';
            }
            else if (this.__type == 'exrate') {
                this.width = convertToPx("6em");
                this.__align = 'end';
            }
            else if (this.__type == 'fromnow') {
                this.width = convertToPx("10em");
            }
            else if (this.__type == 'number') {
                this.width = convertToPx("8em");
                this.__align = 'end';
            }
            else if (this.__type == 'currency') {
                this.width = convertToPx("8em");
                this.__align = 'end';
            }
            else {
                this.width = convertToPx(this.width || this.minWidth || '250px');
            }
        };
        UIDataColumn.prototype.attached = function () {
            this.__title = this.element.textContent;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "dataSort", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "format", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "symbol", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "summary", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataColumn.prototype, "labels", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataColumn.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataColumn.prototype, "button", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDataColumn.prototype, "display", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "buttonTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "buttonIcon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "buttonTheme", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], UIDataColumn.prototype, "buttonMenu", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIDataColumn.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }), 
            __metadata('design:type', Number)
        ], UIDataColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }), 
            __metadata('design:type', Number)
        ], UIDataColumn.prototype, "minWidth", void 0);
        UIDataColumn = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-data-column'),
            aurelia_framework_1.inlineView('<template><slot></slot></template>'), 
            __metadata('design:paramtypes', [Element])
        ], UIDataColumn);
        return UIDataColumn;
    }());
    exports.UIDataColumn = UIDataColumn;
    var UIPager = (function () {
        function UIPager(element) {
            this.element = element;
            this.current = 1;
            this.total = 1;
        }
        UIPager.prototype.currentChanged = function (newValue) {
            if (isNaN(parseInt(newValue))) {
                newValue = this.current;
            }
            else {
                if (parseInt(newValue) < 1)
                    newValue = 1;
                if (parseInt(newValue) > this.total)
                    newValue = this.total;
                this.current = parseInt(newValue);
            }
        };
        UIPager.prototype.fireChange = function (n) {
            if (n < 1 && this.current == 1)
                return;
            if (n > 0 && this.current == this.total)
                return;
            if (n === 0)
                this.current = 1;
            if (n === -1)
                this.current--;
            if (n === 1)
                this.current++;
            if (n === 2)
                this.current = this.total;
            ui_event_1.UIEvent.fireEvent('pagechanged', this.element, this.current);
        };
        UIPager.prototype.keyCheck = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || evt.charCode === 0)
                return true;
            if ((evt.which || evt.keyCode) === 13) {
                return ui_event_1.UIEvent.fireEvent('pagechanged', this.element, this.current);
            }
            return /[0-9]/.test(String.fromCharCode(evt.charCode));
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Number)
        ], UIPager.prototype, "current", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Number)
        ], UIPager.prototype, "total", void 0);
        UIPager = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-pager'),
            aurelia_framework_1.useView('./ui-pager.html'), 
            __metadata('design:paramtypes', [Element])
        ], UIPager);
        return UIPager;
    }());
    exports.UIPager = UIPager;
    var ScrollLeftAttribute = (function () {
        function ScrollLeftAttribute(element) {
            this.element = element;
        }
        ScrollLeftAttribute.prototype.valueChanged = function (newValue) {
            this.element.scrollLeft = newValue;
        };
        ScrollLeftAttribute = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customAttribute('scroll-left'), 
            __metadata('design:paramtypes', [Element])
        ], ScrollLeftAttribute);
        return ScrollLeftAttribute;
    }());
    exports.ScrollLeftAttribute = ScrollLeftAttribute;
});
