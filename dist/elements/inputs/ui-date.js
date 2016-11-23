var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "moment", "tether"], function (require, exports, aurelia_framework_1, ui_event_1, moment, Tether) {
    "use strict";
    var UIDateView = (function () {
        function UIDateView(element) {
            this.element = element;
            this.date = '';
            this.time = false;
            this.title = '';
            this.level = 0;
            this.timeLevel = 0;
            this.__hour = 0;
            this.__minute = 0;
            this.m = moment;
            this.__disablePrev = false;
            this.__disableNext = false;
            this.__disableToday = false;
        }
        UIDateView.prototype.bind = function () {
            this.time = isTrue(this.time);
            if (this.date && moment(this.date).isValid())
                (this.__current = moment(this.date));
            else
                (this.__current = moment()).startOf('day');
            this.__hour = moment(this.__current).hour();
            this.__minute = moment(this.__current).minute();
            this.__minute -= this.__minute % 5;
            this.level = 0;
            this.timeLevel = 0;
            this.changeDatePage();
        };
        UIDateView.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid())
                (this.__current = moment(newValue));
            else
                (this.__current = moment()).startOf('day');
            this.__hour = moment(this.__current).hour();
            this.__minute = moment(this.__current).minute();
            this.level = 0;
            this.timeLevel = 0;
            this.changeDatePage();
        };
        UIDateView.prototype.minDateChanged = function () {
            this.changeDatePage();
        };
        UIDateView.prototype.maxDateChanged = function () {
            this.changeDatePage();
        };
        UIDateView.prototype.weekday = function (w) {
            return moment.weekdaysMin(w);
        };
        UIDateView.prototype.weekNumber = function (w) {
            return moment(this.__start).add(w, 'week').week();
        };
        UIDateView.prototype.dateDisplay = function (w, d) {
            return moment(this.__start).add(w, 'week').add(d, 'day');
        };
        UIDateView.prototype.getDateClass = function (dt) {
            var c = 'date hover';
            if (dt.isSame(this.__current, 'month')) {
                c += ' active';
            }
            else {
                c += ' muted ';
            }
            if (dt.isSame(moment(), 'day'))
                c += ' today';
            if (this.date && dt.isSame(this.date, 'day'))
                c += ' selected';
            if (this.minDate && dt.isBefore(this.minDate, 'day'))
                c += ' disabled';
            if (this.maxDate && dt.isAfter(this.maxDate, 'day'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.getMonthClass = function (dt) {
            var c = 'month hover';
            if (this.minDate && dt.isBefore(this.minDate, 'month'))
                c += ' disabled';
            if (this.maxDate && dt.isAfter(this.maxDate, 'month'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.getYearClass = function (dt) {
            var c = 'year hover';
            if (this.minDate && dt.isBefore(this.minDate, 'year'))
                c += ' disabled';
            if (this.maxDate && dt.isAfter(this.maxDate, 'year'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.getHourClass = function (hour) {
            return '';
        };
        UIDateView.prototype.getMinuteClass = function (minute) {
            return '';
        };
        UIDateView.prototype.changeDatePage = function () {
            var __start = moment(this.__current).startOf('month');
            var __end = moment(this.__current).endOf('month');
            if (this.level == 0) {
                this.title = moment(this.__current).format('MMMM YYYY');
                if (__start.weekday() < 3)
                    __start.add(-7, 'day');
                this.__start = __start.add(__start.weekday() * -1, 'day');
                __end = __end.add(6 - __end.weekday(), 'day');
                if (this.minDate)
                    this.__disablePrev = __start.isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.__disableNext = __end.isAfter(this.maxDate, 'month');
            }
            if (this.level == 1) {
                this.title = moment(this.__current).format('YYYY');
                if (this.minDate)
                    this.__disablePrev = moment(__start).startOf('year').isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.__disableNext = moment(__end).endOf('year').isAfter(this.maxDate, 'month');
            }
            if (this.level == 2) {
                this.__decade = (this.__current.year() - (this.__current.year() % 20)) + 1;
                this.title = this.__decade + '-' + (this.__decade + 20);
                if (this.minDate)
                    this.__disablePrev = moment(__start).year(this.__decade).isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.__disableNext = moment(__end).year(this.__decade + 20).isAfter(this.maxDate, 'month');
            }
            if (this.minDate)
                this.__disableToday = this.__disableToday || moment().isBefore(this.minDate, 'date');
            if (this.maxDate)
                this.__disableNext = this.__disableToday || moment().isAfter(this.maxDate, 'date');
        };
        UIDateView.prototype.clicked = function (evt) {
            var changed = false;
            if (evt.target.classList.contains('today')) {
                this.__current = moment();
                changed = true;
            }
            else if (evt.target.classList.contains('date')) {
                this.__current = evt.target['date'];
                changed = true;
            }
            else if (evt.target.classList.contains('month')) {
                this.__current = evt.target['month'];
                this.level = 0;
            }
            else if (evt.target.classList.contains('year')) {
                this.__current = evt.target['year'];
                this.level = 1;
            }
            else if (evt.target.classList.contains('next')) {
                if (this.level == 0) {
                    this.__current = moment(this.__current).add(1, 'month');
                }
                else if (this.level == 1) {
                    this.__current = moment(this.__current).add(1, 'year');
                }
                else if (this.level == 2) {
                    this.__current = moment(this.__current).add(20, 'year');
                }
            }
            else if (evt.target.classList.contains('prev')) {
                if (this.level == 0) {
                    this.__current = moment(this.__current).add(-1, 'month');
                }
                else if (this.level == 1) {
                    this.__current = moment(this.__current).add(-1, 'year');
                }
                else if (this.level == 2) {
                    this.__current = moment(this.__current).add(-20, 'year');
                }
            }
            else if (evt.target.classList.contains('title')) {
                if (this.level != 2)
                    this.level++;
            }
            else if (evt.target.classList.contains('cancel')) {
                this.level = 0;
            }
            else if (evt.target.classList.contains('hours')) {
                this.timeLevel = 1;
            }
            else if (evt.target.classList.contains('mins')) {
                this.timeLevel = 2;
            }
            else if (evt.target.classList.contains('ampm')) {
                if (this.__hour > 11)
                    this.__hour -= 12;
                else
                    this.__hour += 12;
                changed = true;
            }
            else if (evt.target.classList.contains('hour')) {
                this.__hour = evt.target['hour'] + (this.__hour > 11 ? 12 : 0);
                this.timeLevel = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('minute')) {
                this.__minute = evt.target['minute'];
                this.timeLevel = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('uphour')) {
                if (++this.__hour > 23)
                    this.__hour = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('upmin')) {
                if (++this.__minute > 59)
                    this.__minute = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('downhour')) {
                if (--this.__hour < 0)
                    this.__hour = 23;
                changed = true;
            }
            else if (evt.target.classList.contains('downmin')) {
                if (--this.__minute < 0)
                    this.__minute = 59;
                changed = true;
            }
            this.changeDatePage();
            if (changed) {
                this.date = moment(this.__current).hour(this.__hour).minute(this.__minute).toISOString();
                ui_event_1.UIEvent.fireEvent('change', this.element, moment(this.date));
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "time", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "maxDate", void 0);
        UIDateView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-date-view'),
            aurelia_framework_1.inlineView("<template class=\"ui-date-view\" click.trigger=\"clicked($event)\"><div class=\"ui-dv-date-wrapper\">\n  <div class=\"ui-dv-head\">\n    <a class=\"prev ${__disablePrev?'disabled':''}\"><span class=\"fi-ui-angle-left\"></span></a>\n    <a class=\"title\"><span class=\"ui-font-small fi-ui-tri-up\" if.bind=\"level!=2\"></span> ${title}</a>\n    <a class=\"next ${__disableNext?'disabled':''}\"><span class=\"fi-ui-angle-right\"></span></a>\n  </div>\n  <div class=\"weekdays\" if.bind=\"level==0\">\n    <span class=\"week\">#</span>\n    <span repeat.for=\"d of 7\">${weekday(d, __current)}</span>\n  </div>\n  <div repeat.for=\"w of 6\" class=\"dates\" if.bind=\"level==0\">\n    <span class=\"week\">${weekNumber(w, __current)}</span>\n    <span repeat.for=\"d of 7\" date.bind=\"x\" class.bind=\"getDateClass(x=m(__start).add(w,'week').add(d,'day'), __current, minDate, maxDate)\">${x.date()}</span>\n  </div>\n  <div repeat.for=\"w of 4\" class=\"months\" if.bind=\"level==1\">\n    <span repeat.for=\"d of 3\" month.bind=\"x\" class.bind=\"getMonthClass(x=m().set('year',__current.year()).set('month',(w*3)+d), __current, mindate, maxDate)\">${m.months(x.month())}</span>\n  </div>\n  <div repeat.for=\"w of 5\" class=\"years\" if.bind=\"level==2\">\n      <span repeat.for=\"d of 4\" year.bind=\"x\" class.bind=\"getYearClass(x=m().set('year',__decade+((w*4)+d)), __current, __decade, minDate, maxDate)\">${x.year()}</span>\n  </div>\n  <div class=\"ui-dv-foot\">\n    <a class=\"today\" if.bind=\"level==0 && !__disableToday\">Today</a>\n    <a class=\"cancel\" if.bind=\"level!=0\">Cancel</a>\n  </div>\n</div><div class=\"ui-dv-time-wrapper\" if.bind=\"time\">\n  <div if.bind=\"timeLevel==0\">\n    <div>\n      <a class=\"uphour\"><span class=\"fi-ui-angle-up\"></span></a>\n      <a class=\"big-text hours\">${__hour==0?12:(__hour>12?__hour-12:__hour) | number:'{00}'}</a>\n      <a class=\"downhour\"><span class=\"fi-ui-angle-down\"></span></a>\n    </div>\n    <div class=\"big-text\">:</div>\n    <div>\n      <a class=\"upmin\"><span class=\"fi-ui-angle-up\"></span></a>\n      <a class=\"big-text mins\">${__minute | number:'{00}'}</a>\n      <a class=\"downmin\"><span class=\"fi-ui-angle-down\"></span></a>\n    </div>\n    <div><a class=\"big-text ampm\">${__hour<12?'AM':'PM'}</a></div>\n  </div>\n  <div if.bind=\"timeLevel==1\" repeat.for=\"r of 4\">\n    <a class=\"hour ${getHourClass(x)\" repeat.for=\"c of 4\" hour.bind=\"x=(r*3)+c\">${x | number:'{00}'}</a>\n  </div>\n  <div if.bind=\"timeLevel==2\" repeat.for=\"r of 4\">\n    <a class=\"minute ${getMinuteClass(x)\" repeat.for=\"c of 4\" minute.bind=\"x=((r*3)+c) * 5\">${x | number:'{00}'}</a>\n  </div>\n</div></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDateView);
        return UIDateView;
    }());
    exports.UIDateView = UIDateView;
    var UIDate = (function () {
        function UIDate(element) {
            this.element = element;
            this.value = '';
            this.startDate = '';
            this.endDate = '';
            this.time = false;
            this.placeholder = '';
            this.disabled = false;
            this.readonly = false;
            this.__clear = element.hasAttribute('clear');
        }
        UIDate.prototype.attached = function () {
            this.__tether = new Tether({
                element: this.dropdown.element,
                target: this.element,
                attachment: 'top left',
                targetAttachment: 'bottom left',
                constraints: [
                    {
                        to: 'scrollParent',
                        attachment: 'together'
                    },
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ],
                optimizations: {
                    moveElement: false
                }
            });
        };
        UIDate.prototype.detached = function () {
            this.__tether.destroy();
            aurelia_framework_1.DOM.removeNode(this.dropdown.element);
        };
        UIDate.prototype.clear = function () {
            this.__value = '';
            this.value = null;
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIDate.prototype.disable = function (disabled) {
            this.busy = disabled;
        };
        UIDate.prototype.valueChanged = function (newValue) {
            if (newValue && moment(newValue).isValid())
                this.__value = moment(newValue).format(this.time ? 'DD MMM YYYY hh:mm A' : 'DD MMM YYYY');
            else
                this.__value = '';
        };
        UIDate.prototype.minDateChanged = function (newValue) {
            if (this.value && moment(this.value).isBefore(newValue, 'date'))
                this.value = moment(newValue).toISOString();
        };
        UIDate.prototype.maxDateChanged = function (newValue) {
            if (this.value && moment(this.value).isAfter(newValue, 'date'))
                this.value = moment(newValue).toISOString();
        };
        UIDate.prototype.showDropdown = function (force) {
            var _this = this;
            this.__showDropdown = force || !this.__showDropdown;
            ui_event_1.UIEvent.queueTask(function () { return _this.__tether.position(); });
        };
        UIDate.prototype.focusing = function () {
            clearTimeout(this.__unfocus);
            this.__focus = true;
            this.dropdown.level = 0;
            this.dropdown.timeLevel = 0;
            ui_event_1.UIEvent.fireEvent('focus', this.element);
        };
        UIDate.prototype.stopUnfocus = function () {
            clearTimeout(this.__unfocus);
            this.__focus = true;
        };
        UIDate.prototype.unfocusing = function () {
            var _this = this;
            this.__unfocus = setTimeout(function () {
                _this.__focus = false;
                _this.__showDropdown = false;
            }, 200);
            ui_event_1.UIEvent.fireEvent('blur', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "startDate", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "endDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "time", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "maxDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDate.prototype, "readonly", void 0);
        UIDate = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-date'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-date-input ${__focus?'ui-focus':''} ${disabled?'ui-disabled':''} ${readonly || busy?'ui-readonly':''}\"><span class=\"ui-invalid-icon fi-ui\"></span>\n  <span class=\"ui-invalid-errors\"><ul><li repeat.for=\"e of __errors\">${e.message}</li></ul></span>\n  <div class=\"ui-input-div\"><input class=\"ui-input\" size=\"1\" value.bind=\"__value\" placeholder.bind=\"placeholder\" \n    focus.trigger=\"focusing()\" blur.trigger=\"unfocusing()\" \n    click.trigger=\"showDropdown()\" keydown.trigger=\"showDropdown(true)\"\n    ref=\"__input\" disabled.bind=\"disabled || busy\" readonly.bind=\"true\" type=\"text\"/>\n  <span class=\"ui-clear\" if.bind=\"__clear && __value\" click.trigger=\"clear()\">&times;</span></div>\n  <ui-date-view class=\"ui-date-dropdown\" date.bind=\"value\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\" time.bind=\"time\"\n    show.bind=\"__focus && __showDropdown\" view-model.ref=\"dropdown\" mousedown.trigger=\"stopUnfocus()\">\n  </ui-date-view></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIDate);
        return UIDate;
    }());
    exports.UIDate = UIDate;
});
