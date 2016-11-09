// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, bindingMode, DOM, computedFrom} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as moment from "moment";
import * as Tether from "tether";

@autoinject()
@customElement('ui-date-view')
@inlineView(`<template class="ui-date-view" click.trigger="clicked($event)"><div class="ui-dv-date-wrapper">
  <div class="ui-dv-head">
    <a class="prev \${__disablePrev?'disabled':''}"><span class="fi-ui-angle-left"></span></a>
    <a class="title"><span class="ui-font-small fi-ui-tri-up" if.bind="level!=2"></span> \${title}</a>
    <a class="next \${__disableNext?'disabled':''}"><span class="fi-ui-angle-right"></span></a>
  </div>
  <div class="weekdays" if.bind="level==0">
    <span class="week">#</span>
    <span repeat.for="d of 7">\${weekday(d, __current)}</span>
  </div>
  <div repeat.for="w of 6" class="dates" if.bind="level==0">
    <span class="week">\${weekNumber(w, __current)}</span>
    <span repeat.for="d of 7" date.bind="x" class.bind="getDateClass(x=m(__start).add(w,'week').add(d,'day'), __current, minDate, maxDate)">$\{x.date()}</span>
  </div>
  <div repeat.for="w of 4" class="months" if.bind="level==1">
    <span repeat.for="d of 3" month.bind="x" class.bind="getMonthClass(x=m().set('year',__current.year()).set('month',(w*3)+d), __current, mindate, maxDate)">\${m.months(x.month())}</span>
  </div>
  <div repeat.for="w of 5" class="years" if.bind="level==2">
      <span repeat.for="d of 4" year.bind="x" class.bind="getYearClass(x=m().set('year',__decade+((w*4)+d)), __current, __decade, minDate, maxDate)">\${x.year()}</span>
  </div>
  <div class="ui-dv-foot">
    <a class="today" if.bind="level==0 && !__disableToday">Today</a>
    <a class="cancel" if.bind="level!=0">Cancel</a>
  </div>
</div><div class="ui-dv-time-wrapper" if.bind="time">
  <div>
    <a class="uphour"><span class="fi-ui-angle-up"></span></a>
    <span class="ui-hour">\${__hour | number:'{00}'}</span>
    <a class="downhour"><span class="fi-ui-angle-down"></span></a>
  </div>
  <div class="ui-sep">:</div>
  <div>
    <a class="upmin"><span class="fi-ui-angle-up"></span></a>
    <span class="ui-min">\${__minute | number:'{00}'}</span>
    <a class="downmin"><span class="fi-ui-angle-down"></span></a>
  </div>
</div></template>`)
export class UIDateView {
  constructor(public element: Element) { }

  bind() {
    this.time = isTrue(this.time);
    if (this.date && moment(this.date).isValid()) (this.__current = moment(this.date));
    else (this.__current = moment()).startOf('day');

    this.__hour = moment(this.__current).hour();
    this.__minute = moment(this.__current).minute();
    this.__minute -= this.__minute % 5;

    this.level = 0;
    this.changeDatePage();
  }

  dateChanged(newValue) {
    if (newValue && moment(newValue).isValid()) (this.__current = moment(newValue));
    else (this.__current = moment()).startOf('day');

    this.__hour = moment(this.__current).hour();
    this.__minute = moment(this.__current).minute();
    this.__minute -= this.__minute % 5;

    this.level = 0;
    this.changeDatePage();
  }

  minDateChanged() {
    this.changeDatePage();
  }
  maxDateChanged() {
    this.changeDatePage();
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) date = '';

  @bindable() time = false;
  @bindable() minDate;
  @bindable() maxDate;

  level = 0;
  title = '';

  __start;
  __current;
  __decade;
  __hour = 0;
  __minute = 0;

  m = moment;

  __disablePrev = false;
  __disableNext = false;
  __disableToday = false;

  weekday(w) {
    return moment.weekdaysMin(w);
  }

  weekNumber(w) {
    return moment(this.__start).add(w, 'week').week();
  }

  dateDisplay(w, d) {
    return moment(this.__start).add(w, 'week').add(d, 'day');
  }

  getDateClass(dt) {
    var c = 'date hover';
    if (dt.isSame(this.__current, 'month')) {
      c += ' active';
    }
    else {
      c += ' muted ';
    }
    if (dt.isSame(moment(), 'day')) c += ' today';
    if (this.date && dt.isSame(this.date, 'day')) c += ' selected';
    if (this.minDate && dt.isBefore(this.minDate, 'day')) c += ' disabled';
    if (this.maxDate && dt.isAfter(this.maxDate, 'day')) c += ' disabled';
    return c;
  }

  getMonthClass(dt) {
    var c = 'month hover';
    if (this.minDate && dt.isBefore(this.minDate, 'month')) c += ' disabled';
    if (this.maxDate && dt.isAfter(this.maxDate, 'month')) c += ' disabled';
    return c;
  }

  getYearClass(dt) {
    var c = 'year hover';
    if (this.minDate && dt.isBefore(this.minDate, 'year')) c += ' disabled';
    if (this.maxDate && dt.isAfter(this.maxDate, 'year')) c += ' disabled';
    return c;
  }

  changeDatePage() {
    let __start = moment(this.__current).startOf('month');
    let __end = moment(this.__current).endOf('month');

    if (this.level == 0) {
      this.title = moment(this.__current).format('MMMM YYYY');
      if (__start.weekday() < 3) __start.add(-7, 'day');
      this.__start = __start.add(__start.weekday() * -1, 'day');
      __end = __end.add(6 - __end.weekday(), 'day');

      if (this.minDate) this.__disablePrev = __start.isBefore(this.minDate, 'month');
      if (this.maxDate) this.__disableNext = __end.isAfter(this.maxDate, 'month');
    }
    if (this.level == 1) {
      this.title = moment(this.__current).format('YYYY');

      if (this.minDate) this.__disablePrev = moment(__start).startOf('year').isBefore(this.minDate, 'month');
      if (this.maxDate) this.__disableNext = moment(__end).endOf('year').isAfter(this.maxDate, 'month');
    }
    if (this.level == 2) {
      this.__decade = (this.__current.year() - (this.__current.year() % 20)) + 1;
      this.title = this.__decade + '-' + (this.__decade + 20);

      if (this.minDate) this.__disablePrev = moment(__start).year(this.__decade).isBefore(this.minDate, 'month');
      if (this.maxDate) this.__disableNext = moment(__end).year(this.__decade + 20).isAfter(this.maxDate, 'month');
    }

    if (this.minDate) this.__disableToday = this.__disableToday || moment().isBefore(this.minDate, 'date');
    if (this.maxDate) this.__disableNext = this.__disableToday || moment().isAfter(this.maxDate, 'date');
  }

  clicked(evt) {
    if (evt.target.classList.contains('today')) {
      this.date = moment(this.__current = moment()).hour(this.__hour).minute(this.__minute).toISOString();
      UIEvent.fireEvent('change', this.element, moment(this.date));
    }
    if (evt.target.classList.contains('date')) {
      this.date = moment(this.__current = evt.target['date']).hour(this.__hour).minute(this.__minute).toISOString();
      UIEvent.fireEvent('change', this.element, moment(this.date));
    }
    if (evt.target.classList.contains('month')) {
      this.__current = evt.target['month'];
      this.level = 0;
    }
    if (evt.target.classList.contains('year')) {
      this.__current = evt.target['year'];
      this.level = 1;
    }
    if (evt.target.classList.contains('next')) {
      if (this.level == 0) {
        this.__current = moment(this.__current).add(1, 'month');
      }
      if (this.level == 1) {
        this.__current = moment(this.__current).add(1, 'year');
      }
      if (this.level == 2) {
        this.__current = moment(this.__current).add(20, 'year');
      }
    }
    if (evt.target.classList.contains('prev')) {
      if (this.level == 0) {
        this.__current = moment(this.__current).add(-1, 'month');
      }
      if (this.level == 1) {
        this.__current = moment(this.__current).add(-1, 'year');
      }
      if (this.level == 2) {
        this.__current = moment(this.__current).add(-20, 'year');
      }
    }
    if (evt.target.classList.contains('title')) {
      if (this.level != 2) this.level++;
    }
    if (evt.target.classList.contains('cancel')) {
      this.level = 0;
    }
    if (evt.target.classList.contains('uphour')) {
      this.__hour++; if (this.__hour > 23) this.__hour = 0;
      this.date = moment(this.__current).hour(this.__hour).minute(this.__minute).toISOString();
      UIEvent.fireEvent('change', this.element, moment(this.date));
    }
    if (evt.target.classList.contains('upmin')) {
      this.__minute += 5; if (this.__minute > 55) this.__minute = 0;
      this.date = moment(this.__current).hour(this.__hour).minute(this.__minute).toISOString();
      UIEvent.fireEvent('change', this.element, moment(this.date));
    }
    if (evt.target.classList.contains('downhour')) {
      this.__hour--; if (this.__hour < 0) this.__hour = 23;
      this.date = moment(this.__current).hour(this.__hour).minute(this.__minute).toISOString();
      UIEvent.fireEvent('change', this.element, moment(this.date));
    }
    if (evt.target.classList.contains('downmin')) {
      this.__minute -= 5; if (this.__minute < 0) this.__minute = 55;
      this.date = moment(this.__current).hour(this.__hour).minute(this.__minute).toISOString();
      UIEvent.fireEvent('change', this.element, moment(this.date));
    }
    this.changeDatePage();
  }
}

@autoinject()
@customElement('ui-date')
@inlineView(`<template class="ui-input-wrapper ui-date-input \${__focus?'ui-focus':''} \${disabled?'ui-disabled':''} \${readonly?'ui-readonly':''}"><span class="ui-invalid-icon fi-ui"></span>
  <span class="ui-invalid-errors"><ul><li repeat.for="e of errors">\${e.message}</li></ul></span>
  <input class="ui-input" size="1" value.bind="__value" placeholder.bind="placeholder" 
    focus.trigger="focusing()" blur.trigger="unfocusing()" 
    click.trigger="showDropdown()" keydown.trigger="showDropdown(true)"
    ref="input" disabled.bind="disabled" readonly.bind="true" type="text"/>
  <span class="ui-clear" if.bind="__clear && __value" click.trigger="clear()">&times;</span>
  <ui-date-view class="ui-date-dropdown" date.bind="value" min-date.bind="minDate" max-date.bind="maxDate" time.bind="time"
    show.bind="__focus && __showDropdown" view-model.ref="dropdown" mousedown.trigger="stopUnfocus()">
  </ui-date-view></template>`)
export class UIDate {
  constructor(public element: Element) {
    this.__clear = element.hasAttribute('clear');
  }

  attached() {
    this.__tether = new Tether({
      element: this.dropdown.element,
      target: this.element,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      // offset: '0 10px',
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
  }
  detached() {
    this.__tether.destroy();
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) startDate = '';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) endDate = '';

  @bindable() time = false;
  @bindable() minDate;
  @bindable() maxDate;
  @bindable() placeholder = '';
  @bindable() disabled = false;
  @bindable() readonly = false;

  __clear;
  __tether;
  __value;
  dropdown;

  clear() {
    this.__value = '';
    this.value = null;
    UIEvent.fireEvent('change', this.element, this.value);
  }

  valueChanged(newValue) {
    if (newValue && moment(newValue).isValid()) this.__value = moment(newValue).format(this.time ? 'DD MMM YYYY hh:mm A' : 'DD MMM YYYY');
    else this.__value = '';
  }

  minDateChanged(newValue) {
    if (this.value && moment(this.value).isBefore(newValue, 'date')) this.value = moment(newValue).toISOString();
  }

  maxDateChanged(newValue) {
    if (this.value && moment(this.value).isAfter(newValue, 'date')) this.value = moment(newValue).toISOString();
  }

  __showDropdown;
  __unfocus;
  __focus;

  showDropdown(force) {
    this.__showDropdown = force || !this.__showDropdown;
    UIEvent.queueTask(() => this.__tether.position());
  }
  focusing() {
    clearTimeout(this.__unfocus);
    this.__focus = true;
    this.dropdown.level = 0;
    UIEvent.fireEvent('focus', this.element);
  }
  stopUnfocus() {
    clearTimeout(this.__unfocus);
    this.__focus = true;
  }
  unfocusing() {
    this.__unfocus = setTimeout(() => {
      this.__focus = false;
      this.__showDropdown = false;
    }, 200);
    UIEvent.fireEvent('blur', this.element);
  }
}
