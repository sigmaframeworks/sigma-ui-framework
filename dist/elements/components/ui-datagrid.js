var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-format"], function (require, exports, aurelia_framework_1, ui_event_1, ui_format_1) {
    "use strict";
    var UIDatagrid = (function () {
        function UIDatagrid(element) {
            this.element = element;
            this.data = [];
            this.summaryRow = false;
            this.sortColumn = '';
            this.sortOrder = '';
            this.__virtual = false;
            this.__columns = [];
            this.__tableWidth = '';
            this.__resizing = false;
            if (element.hasAttribute('auto-height'))
                this.element.classList.add('ui-auto-size');
            if (element.hasAttribute('rowselect'))
                this.__rowSelect = true;
            if (element.hasAttribute('virtual'))
                this.__virtual = true;
        }
        UIDatagrid.prototype.bind = function () {
            this.__columns = _.sortBy(this.columns, 'locked');
        };
        UIDatagrid.prototype.columnsChanged = function (newValue) {
            this.__columns = _.sortBy(this.columns, 'locked');
        };
        UIDatagrid.prototype.calculateWidth = function (cols) {
            var w = 0;
            _.forEach(cols, function (c) { c.left = w; w += c.getWidth(); });
            return (this.__tableWidth = (w + 20) + 'px');
        };
        UIDatagrid.prototype.dataChanged = function (newValue) {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () { return _this.data = _.orderBy(_this.data, [_this.sortColumn, 'ID', 'id'], [_this.sortOrder, _this.sortOrder, _this.sortOrder]); });
        };
        UIDatagrid.prototype.scrolling = function (evt) {
            if (this.__dgWrapHead)
                this.__dgWrapHead.scrollLeft = evt.target.scrollLeft;
            if (this.__dgWrapFoot)
                this.__dgWrapFoot.scrollLeft = evt.target.scrollLeft;
        };
        UIDatagrid.prototype.doSort = function (col) {
            var _this = this;
            if (!col.sortable)
                return;
            if (this.sortColumn != col.dataId)
                this.sortOrder = 'asc';
            if (this.sortColumn == col.dataId)
                this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
            this.sortColumn = col.dataId;
            ui_event_1.UIEvent.queueTask(function () { return _this.data = _.orderBy(_this.data, [_this.sortColumn, 'ID', 'id'], [_this.sortOrder, _this.sortOrder, _this.sortOrder]); });
        };
        UIDatagrid.prototype.resizeColumn = function (evt, col, next) {
            var _this = this;
            if (evt.button != 0)
                return true;
            this.__diff = 0;
            this.__column = col;
            this.__colNext = next;
            this.__resizing = true;
            this.__startX = (evt.x || evt.clientX);
            this.__ghost.style.left = (col.left + parseInt(col.width) - (col.locked == 0 ? 0 : this.__scroller.scrollLeft)) + 'px';
            document.addEventListener('mouseup', this.__stop = function (evt) { return _this.__resizeEnd(evt); });
            document.addEventListener('mousemove', this.__move = function (evt) { return _this.__resize(evt); });
        };
        UIDatagrid.prototype.__resize = function (evt) {
            var x = (evt.x || evt.clientX) - this.__startX;
            if (x < 0 && (parseInt(this.__column.width) + this.__diff) <= (this.__column.minWidth || 80))
                return;
            if (x > 0 && (parseInt(this.__column.width) + this.__diff) >= (500))
                return;
            this.__startX = (evt.x || evt.clientX);
            this.__diff += x;
            this.__ghost.style.left = (parseInt(this.__ghost.style.left) + x) + 'px';
        };
        UIDatagrid.prototype.__resizeEnd = function (evt) {
            this.__resizing = false;
            if (this.__colNext)
                this.__colNext.left += this.__diff;
            this.__column.width = (parseInt(this.__column.width) + this.__diff);
            this.calculateWidth(this.__columns);
            document.removeEventListener('mousemove', this.__move);
            document.removeEventListener('mouseup', this.__stop);
        };
        UIDatagrid.prototype.fireSelect = function (record) {
            ui_event_1.UIEvent.fireEvent('rowselect', this.element, ({ record: record }));
        };
        __decorate([
            aurelia_framework_1.children('ui-dg-column,ui-dg-button,ui-dg-switch,ui-dg-link,ui-dg-input'), 
            __metadata('design:type', Object)
        ], UIDatagrid.prototype, "columns", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDatagrid.prototype, "data", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDatagrid.prototype, "summaryRow", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDatagrid.prototype, "sortColumn", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDatagrid.prototype, "sortOrder", void 0);
        UIDatagrid = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-datagrid'),
            aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hidden\"><slot></slot></div>\n<div show.bind=\"__resizing\" ref=\"__ghost\" class=\"ui-dg-ghost\"></div>\n<div show.bind=\"data.length==0\" class=\"ui-dg-empty\"><slot name=\"dg-empty\"></slot></div>\n<div class=\"ui-dg-wrapper\" ref=\"__dgWrapHead\">\n<table width.bind=\"calculateWidth(__columns)\" css.bind=\"{'table-layout': __tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col repeat.for=\"col of __columns\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <thead><tr>\n    <td repeat.for=\"col of __columns\" click.trigger=\"doSort(col)\" class=\"${col.sortable?'ui-sortable':''} ${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\"><div>\n      <span class=\"ui-dg-header\" innerhtml.bind='col.getTitle()'></span>\n      <span class=\"ui-sort ${col.dataId==sortColumn ? sortOrder:''}\" if.bind=\"col.sortable\"></span>\n      <span class=\"ui-resizer\" if.bind=\"col.resize\" mousedown.trigger=\"resizeColumn($event,col, __columns[$index+1])\"></span>\n    </div></td>\n    <td class=\"ui-expander\"><div><span class=\"ui-dg-header\">&nbsp;</span></div></td>\n  </tr></thead>\n</table>\n</div>\n<div class=\"ui-dg-wrapper scrolling\" scroll.trigger=\"scrolling($event)\" ref=\"__scroller\">\n<table width.bind=\"calculateWidth(__columns)\" css.bind=\"{'table-layout': __tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col repeat.for=\"col of __columns\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <tbody>\n    <tr if.bind=\"!__virtual\" repeat.for=\"record of data\" click.delegate=\"fireSelect($parent.selected=record)\" class=\"${$parent.__rowSelect && $parent.selected==record?'ui-selected':''}\">\n    <td repeat.for=\"col of __columns\" class=\"${col.locked==0?'ui-locked':''} ${col.align}\" css.bind=\"{left: col.left+'px'}\">\n      <div if.bind=\"col.type=='normal'\"><span class=\"${col.class}\" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>\n      <div if.bind=\"col.type=='link'\"><a class=\"ui-link ${col.class} ${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}\" click.trigger=\"col.fireClick($event,record[col.dataId],record)\"><span class=\"fi-ui ${col.getIcon(record[col.dataId],record)}\" if.bind=\"col.icon\"></span> <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span></a></div>\n      <div if.bind=\"col.type=='button'\" class=\"no-padding\"><ui-button click.trigger=\"col.fireClick($event,record[col.dataId],record)\" theme.bind=\"col.getTheme(record[col.dataId],record)\" small square icon.bind=\"col.getIcon(record[col.dataId],record)\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\" dropdown.bind=\"dropdown\" menuopen.trigger=\"col.fireMenuOpen($event, record)\"><span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span></ui-button></div>\n      <div if.bind=\"col.type=='switch'\" class=\"no-padding\"><ui-switch change.trigger=\"col.fireChange($event.detail,record)\" theme.bind=\"col.theme\" checked.bind=\"record[col.dataId]\" \n        off-label.bind=\"col.offLabel\" off-value.bind=\"col.offValue\" on-label.bind=\"col.onLabel\" on-value.bind=\"col.onValue\" width.bind=\"col.width\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\"></ui-switch></div>\n    </td><td class=\"ui-expander\"><div>&nbsp;</div></td></tr>\n    \n    <tr if.bind=\"__virtual\" virtual-repeat.for=\"record of data\" click.delegate=\"fireSelect($parent.selected=record)\" class=\"${$parent.__rowSelect && $parent.selected==record?'ui-selected':''}\">\n    <td repeat.for=\"col of __columns\" class=\"${col.locked==0?'ui-locked':''} ${col.align}\" css.bind=\"{left: col.left+'px'}\">\n      <div if.bind=\"col.type=='normal'\"><span class=\"${col.class}\" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>\n      <div if.bind=\"col.type=='link'\"><a class=\"ui-link ${col.class} ${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}\" click.trigger=\"col.fireClick($event,record[col.dataId],record)\"><span class=\"fi-ui ${col.getIcon(record[col.dataId],record)}\" if.bind=\"col.icon\"></span> <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span></a></div>\n      <div if.bind=\"col.type=='button'\" class=\"no-padding\"><ui-button click.trigger=\"col.fireClick($event,record[col.dataId],record)\" theme.bind=\"col.getTheme(record[col.dataId],record)\" small square icon.bind=\"col.getIcon(record[col.dataId],record)\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\" dropdown.bind=\"dropdown\" menuopen.trigger=\"col.fireMenuOpen($event, record)\"><span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span></ui-button></div>\n      <div if.bind=\"col.type=='switch'\" class=\"no-padding\"><ui-switch change.trigger=\"col.fireChange($event.detail,record)\" theme.bind=\"col.theme\" checked.bind=\"record[col.dataId]\" \n        off-label.bind=\"col.offLabel\" off-value.bind=\"col.offValue\" on-label.bind=\"col.onLabel\" on-value.bind=\"col.onValue\" width.bind=\"col.width\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\"></ui-switch></div>\n    </td><td class=\"ui-expander\"><div>&nbsp;</div></td></tr>\n    \n    <tr><td repeat.for=\"col of __columns\" class=\"${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\"><div if.bind=\"!__virtual\">&nbsp;</div></td><td class=\"ui-expander\"><div if.bind=\"!__virtual\">&nbsp;</div></td></tr>\n  </tbody>\n</table></div>\n<div class=\"ui-dg-wrapper\" ref=\"__dgWrapFoot\">\n<table width.bind=\"calculateWidth(__columns)\" css.bind=\"{'table-layout': __tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col repeat.for=\"col of __columns\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <tfoot if.bind=\"summaryRow\"><tr>\n    <td repeat.for=\"col of __columns\" class=\"${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\"><div innerhtml.bind='col.getSummary(summaryRow)'></div></td>\n    <td class=\"ui-expander\"><div>&nbsp;</div></td>\n  </tr></tfoot>\n</table></div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDatagrid);
        return UIDatagrid;
    }());
    exports.UIDatagrid = UIDatagrid;
    var UIDGEmpty = (function () {
        function UIDGEmpty() {
        }
        UIDGEmpty = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-dg-empty'),
            aurelia_framework_1.inlineView("<template><div slot=\"dg-empty\"><slot></slot></div></template>"), 
            __metadata('design:paramtypes', [])
        ], UIDGEmpty);
        return UIDGEmpty;
    }());
    exports.UIDGEmpty = UIDGEmpty;
    var UIDataColumn = (function () {
        function UIDataColumn(element) {
            this.element = element;
            this.dataType = 'text';
            this.format = null;
            this.align = 'ui-text-start';
            this.left = 0;
            this.locked = 1;
            this.resize = false;
            this.sortable = false;
            this.resize = element.hasAttribute('resizeable');
            this.sortable = element.hasAttribute('sortable');
            this.locked = element.hasAttribute('locked') ? 0 : 1;
            if (element.hasAttribute('center'))
                this.align = 'ui-text-center';
            else if (element.hasAttribute('end'))
                this.align = 'ui-text-end';
            if (element.hasAttribute('age'))
                this.dataType = 'age';
            else if (element.hasAttribute('date'))
                this.dataType = 'date';
            else if (element.hasAttribute('time'))
                this.dataType = 'time';
            else if (element.hasAttribute('datetime'))
                this.dataType = 'datetime';
            else if (element.hasAttribute('fromnow'))
                this.dataType = 'fromnow';
            else if (element.hasAttribute('number'))
                this.dataType = 'number';
            else if (element.hasAttribute('currency'))
                this.dataType = 'currency';
            else if (element.hasAttribute('percent'))
                this.dataType = 'percent';
            else if (element.hasAttribute('exrate'))
                this.dataType = 'exrate';
        }
        UIDataColumn.prototype.getWidth = function (tw) {
            this.width = convertToPx(this.width || this.minWidth || 250);
            tw += this.width;
            return this.width;
        };
        UIDataColumn.prototype.getTitle = function () {
            return this.element.innerHTML;
        };
        UIDataColumn.prototype.getValue = function (value, record) {
            return this.processValue(value, record) || '&nbsp;';
        };
        UIDataColumn.prototype.processValue = function (value, record) {
            var retVal = '';
            if (isFunction(this.value))
                value = this.value(value, record);
            if (isFunction(this.display))
                retVal = this.display(({ value: value, record: record })) || '';
            else {
                switch (this.dataType) {
                    case 'age':
                        retVal = ui_format_1.UIFormat.age(value);
                        break;
                    case 'date':
                        retVal = ui_format_1.UIFormat.date(value, this.format);
                        break;
                    case 'time':
                        retVal = ui_format_1.UIFormat.time(value, this.format);
                        break;
                    case 'datetime':
                        retVal = ui_format_1.UIFormat.datetime(value, this.format);
                        break;
                    case 'fromnow':
                        retVal = ui_format_1.UIFormat.fromNow(value);
                        break;
                    case 'number':
                        retVal = ui_format_1.UIFormat.number(value, this.format);
                        break;
                    case 'currency':
                        retVal = ui_format_1.UIFormat.currency(value, this.format);
                        break;
                    case 'percent':
                        retVal = ui_format_1.UIFormat.percent(value);
                        break;
                    case 'exrate':
                        retVal = ui_format_1.UIFormat.exRate(value);
                        break;
                    default:
                        retVal = value;
                        break;
                }
            }
            return retVal;
        };
        return UIDataColumn;
    }());
    exports.UIDataColumn = UIDataColumn;
    var UIDGColumn = (function (_super) {
        __extends(UIDGColumn, _super);
        function UIDGColumn(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'normal';
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "display", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "format", void 0);
        UIDGColumn = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-column'),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDGColumn);
        return UIDGColumn;
    }(UIDataColumn));
    exports.UIDGColumn = UIDGColumn;
    var UIDGLink = (function (_super) {
        __extends(UIDGLink, _super);
        function UIDGLink(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'link';
            this.disabled = null;
        }
        UIDGLink.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
        };
        UIDGLink.prototype.getIcon = function (value, record) {
            if (isFunction(this.icon))
                return this.icon(({ value: value, record: record }));
            return record[this.icon] || this.icon;
        };
        UIDGLink.prototype.getLabel = function (value, record) {
            if (isFunction(this.label))
                return this.label(({ value: value, record: record }));
            return this.label || this.processValue(value, record) || '';
        };
        UIDGLink.prototype.fireClick = function ($event, value, record) {
            $event.stopPropagation();
            $event.preventDefault();
            if (this.isDisabled(value, record))
                return;
            ui_event_1.UIEvent.fireEvent('click', this.element, ({ value: value, record: record }));
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "disabled", void 0);
        UIDGLink = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-link'),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDGLink);
        return UIDGLink;
    }(UIDataColumn));
    exports.UIDGLink = UIDGLink;
    var UIDGButton = (function (_super) {
        __extends(UIDGButton, _super);
        function UIDGButton(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'button';
            this.theme = 'default';
            this.disabled = null;
            this.align = 'ui-text-center';
        }
        UIDGButton.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
        };
        UIDGButton.prototype.getIcon = function (value, record) {
            if (isFunction(this.icon))
                return this.icon(({ value: value, record: record }));
            return record[this.icon] || this.icon;
        };
        UIDGButton.prototype.getLabel = function (value, record) {
            if (isFunction(this.label))
                return this.label(({ value: value, record: record }));
            return this.label || this.processValue(value, record) || '';
        };
        UIDGButton.prototype.getTheme = function (value, record) {
            if (isFunction(this.theme))
                return this.theme(({ value: value, record: record }));
            return this.theme;
        };
        UIDGButton.prototype.fireClick = function ($event, value, record) {
            $event.stopPropagation();
            $event.preventDefault();
            if (this.isDisabled(value, record))
                return;
            ui_event_1.UIEvent.fireEvent('click', this.element, ({ value: value, record: record }));
            return false;
        };
        UIDGButton.prototype.fireMenuOpen = function ($event, record) {
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('menuopen', this.element, ({ record: record }));
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "icon", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "disabled", void 0);
        UIDGButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-button'),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDGButton);
        return UIDGButton;
    }(UIDataColumn));
    exports.UIDGButton = UIDGButton;
    var UIDGSwitch = (function (_super) {
        __extends(UIDGSwitch, _super);
        function UIDGSwitch(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'switch';
            this.checked = false;
            this.value = '';
            this.size = '4em';
            this.class = '';
            this.onLabel = 'on';
            this.offLabel = 'off';
            this.onValue = true;
            this.offValue = false;
            this.theme = 'default';
            this.disabled = null;
            this.align = 'ui-text-center';
        }
        UIDGSwitch.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
        };
        UIDGSwitch.prototype.fireChange = function (value, record) {
            ui_event_1.UIEvent.fireEvent('change', this.element, ({ value: value, record: record }));
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], UIDGSwitch.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "onLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "offLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "onValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "offValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGSwitch.prototype, "disabled", void 0);
        UIDGSwitch = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-switch'),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDGSwitch);
        return UIDGSwitch;
    }(UIDataColumn));
    exports.UIDGSwitch = UIDGSwitch;
});
