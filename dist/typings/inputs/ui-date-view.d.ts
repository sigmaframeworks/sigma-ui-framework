import { UIDateOptions } from "./ui-date";
export declare class UIDateView {
    element: Element;
    m: any;
    __start: any;
    __month: any;
    __year: any;
    __current: any;
    __disablePrev: any;
    __disableNext: any;
    __hour: any;
    __minute: any;
    __dates: any;
    __months: any;
    __years: any;
    __decade: any;
    /**
    * @property    value
    * @type        string
    */
    date: string;
    /**
    * @property    options
    * @type        string
    */
    options: UIDateOptions;
    showing: boolean;
    time: boolean;
    constructor(element: Element);
    bind(): void;
    showingChanged(newValue: any): void;
    getDateClass(dt: any): string;
    getMonthClass(dt: any): string;
    getYearClass(dt: any): string;
    datePanelClick($event: any): void;
    timePanelClick($event: any): void;
    private __changeDates();
    private __changeMonths();
    private __changeYears();
}
