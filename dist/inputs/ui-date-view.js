var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../utils/ui-utils", "./ui-date"], function (require, exports, aurelia_framework_1, ui_utils_1, ui_date_1) {
    "use strict";
    var UIDateView = (function () {
        function UIDateView(element) {
            this.element = element;
            this.date = ui_utils_1.moment().format();
            this.options = new ui_date_1.UIDateOptions();
            this.showing = true;
            this.time = false;
            this.m = ui_utils_1.moment;
            this.__current = ui_utils_1.moment();
        }
        UIDateView.prototype.bind = function () {
            if (ui_utils_1.moment(this.date).isValid()) {
                this.__current = ui_utils_1.moment(this.date);
                this.__hour = ui_utils_1.moment(this.date).hour();
                this.__minute = ui_utils_1.moment(this.date).minute();
                this.__minute -= this.__minute % 5;
                this.date = ui_utils_1.moment(this.date).hour(this.__hour).minute(this.__minute).format();
            }
            this.__changeDates();
            this.time = isTrue(this.time);
        };
        UIDateView.prototype.showingChanged = function (newValue) {
            if (this.showing = isTrue(newValue)) {
                if (ui_utils_1.moment(this.date).isValid())
                    this.__current = ui_utils_1.moment(this.date);
                this.__dates.classList.remove('ui-hidden');
                this.__months.classList.add('ui-hide');
                this.__years.classList.add('ui-hide');
                this.__changeDates();
            }
        };
        UIDateView.prototype.getDateClass = function (dt) {
            var c = 'date';
            if (dt.isSame(this.__current, 'month')) {
                c += ' active';
            }
            else {
                c += ' muted ';
            }
            if (dt.isSame(ui_utils_1.moment(), 'day'))
                c += ' today';
            if (dt.isSame(this.date, 'day'))
                c += ' selected';
            if (dt.isBefore(this.options.minDate, 'day'))
                c += ' disabled';
            if (dt.isAfter(this.options.maxDate, 'day'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.getMonthClass = function (dt) {
            var c = 'month';
            if (dt.isBefore(this.options.minDate, 'month'))
                c += ' disabled';
            if (dt.isAfter(this.options.maxDate, 'month'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.getYearClass = function (dt) {
            var c = 'year';
            if (dt.isBefore(this.options.minDate, 'year'))
                c += ' disabled';
            if (dt.isAfter(this.options.maxDate, 'year'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.datePanelClick = function ($event) {
            if ($event.target.classList.contains('disabled') ||
                $event.target.classList.contains('selected')) {
                return;
            }
            else if ($event.target.classList.contains('prevmonth')) {
                this.__current.add(-1, 'month');
                this.__changeDates();
            }
            else if ($event.target.classList.contains('nextmonth')) {
                this.__current.add(1, 'month');
                this.__changeDates();
            }
            else if ($event.target.classList.contains('prevyear')) {
                this.__current.add(-1, 'year');
                this.__changeMonths();
            }
            else if ($event.target.classList.contains('nextyear')) {
                this.__current.add(1, 'year');
                this.__changeMonths();
            }
            else if ($event.target.classList.contains('prevdecade')) {
                this.__current.add(-20, 'year');
                this.__changeYears();
            }
            else if ($event.target.classList.contains('nextdecade')) {
                this.__current.add(20, 'year');
                this.__changeYears();
            }
            else if ($event.target.classList.contains('setmonth')) {
                this.__dates.classList.add('ui-hidden');
                this.__months.classList.remove('ui-hide');
            }
            else if ($event.target.classList.contains('setyear')) {
                this.__months.classList.add('ui-hide');
                this.__years.classList.remove('ui-hide');
            }
            else if ($event.target.classList.contains('settoday')) {
                this.date = ui_utils_1.moment().format();
                this.__current = ui_utils_1.moment();
                this.__changeDates();
                if (this.element.classList.contains('floating'))
                    this.showing = false;
            }
            else if ($event.target.classList.contains('cancelselect')) {
                this.__years.classList.add('ui-hide');
                this.__months.classList.add('ui-hide');
                this.__dates.classList.remove('ui-hidden');
                this.__changeDates();
                if (this.element.classList.contains('floating'))
                    this.showing = false;
            }
            else if ($event.target.classList.contains('year')) {
                this.__current = $event.target['year'];
                this.__months.classList.remove('ui-hide');
                this.__years.classList.add('ui-hide');
                this.__changeMonths();
            }
            else if ($event.target.classList.contains('month')) {
                this.__current = $event.target['month'];
                this.__months.classList.add('ui-hide');
                this.__dates.classList.remove('ui-hidden');
                this.__changeDates();
            }
            else if ($event.target.classList.contains('date')) {
                this.date = $event.target['date'].hour(this.__hour).minute(this.__minute).format();
                this.__current = $event.target['date'];
                this.__changeDates();
                if (this.element.classList.contains('floating'))
                    this.showing = false;
            }
        };
        UIDateView.prototype.timePanelClick = function ($event) {
            if ($event.target.classList.contains('disabled') ||
                $event.target.classList.contains('selected')) {
                return;
            }
            else if ($event.target.classList.contains('uphour')) {
                this.__hour = ++this.__hour > 23 ? 0 : this.__hour;
            }
            else if ($event.target.classList.contains('downhour')) {
                this.__hour = --this.__hour < 0 ? 23 : this.__hour;
            }
            else if ($event.target.classList.contains('upmin')) {
                this.__minute = this.__minute + 5 > 55 ? 0 : this.__minute + 5;
            }
            else if ($event.target.classList.contains('downmin')) {
                this.__minute = this.__minute - 5 < 0 ? 55 : this.__minute - 5;
            }
            this.date = ui_utils_1.moment(this.date).hour(this.__hour).minute(this.__minute).format();
        };
        UIDateView.prototype.__changeDates = function () {
            this.__current.startOf('month');
            var __start = ui_utils_1.moment(this.__current).startOf('month');
            var __end = ui_utils_1.moment(this.__current).endOf('month');
            this.__month = this.__current.month();
            this.__year = this.__current.year();
            this.__decade = (this.__year - (this.__year % 20)) + 1;
            if (__start.weekday() < 3)
                __start.add(-7, 'day');
            this.__start = __start.add(__start.weekday() * -1, 'day');
            __end = __end.add(6 - __end.weekday(), 'day');
            this.__disablePrev = this.__start.isBefore(this.options.minDate, 'day');
            this.__disableNext = __end.isAfter(this.options.maxDate, 'day');
        };
        UIDateView.prototype.__changeMonths = function () {
            var __start = ui_utils_1.moment(this.__current).set('month', 0);
            var __end = ui_utils_1.moment(this.__current).set('month', 11);
            this.__year = this.__current.year();
            this.__decade = (this.__year - (this.__year % 20)) + 1;
            this.__disablePrev = __start.isBefore(this.options.minDate, 'month');
            this.__disableNext = __end.isAfter(this.options.maxDate, 'month');
        };
        UIDateView.prototype.__changeYears = function () {
            this.__year = this.__current.year();
            this.__decade = (this.__year - (this.__year % 20)) + 1;
            var __start = ui_utils_1.moment(this.__current).set('year', this.__decade);
            var __end = ui_utils_1.moment(this.__current).set('year', this.__decade + 19);
            this.__disablePrev = __start.isBefore(this.options.minDate, 'year');
            this.__disableNext = __end.isAfter(this.options.maxDate, 'year');
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UIDateView.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', ui_date_1.UIDateOptions)
        ], UIDateView.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "showing", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "time", void 0);
        UIDateView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-date-view'), 
            __metadata('design:paramtypes', [Element])
        ], UIDateView);
        return UIDateView;
    }());
    exports.UIDateView = UIDateView;
});
