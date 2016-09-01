import { Container } from "aurelia-framework";
import "amcharts/amcharts";
import * as mm from "moment";
export declare var _: any;
export declare var kramed: KramedStatic;
export declare var moment: typeof mm;
export declare var numeral: any;
export declare module UIChartStatic {
    var CHART_RED: string[];
    var CHART_PINK: string[];
    var CHART_BLUE: string[];
    var CHART_GREEN: string[];
    var CHART_ORANGE: string[];
    var CHART_VIOLET: string[];
    var CHART_SPECTRUM: string[];
    var CHART_DEFAULT: string[];
    var CHART_PIE: string[];
    function init(): void;
}
export declare module UIUtils {
    function container(container: Container): void;
    function lazy(T: any): any;
    function newInstance(T: any, container: any): any;
    function compileView(markup: any, container: any, vm?: any): any;
    function alert(config: any): void;
    function confirm(config: any): Promise<{}>;
    function showToast(container: any, config: any): void;
    function getAscii(str: any): string;
}
