// UI Chart Views
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, useView, bindingMode, inlineView, BindingEngine} from "aurelia-framework";
import {_, UIChartStatic} from "../utils/ui-utils";
import "amcharts/amcharts";
import "amcharts/pie";
import "amcharts/serial";
import "amcharts/themes/light";
import "amcharts/plugins/export/export";
// import "amcharts/amcharts/plugins/export/export.css!";
// import "amcharts/amcharts3/amcharts/plugins/export/libs/blob.js/blob";
// import "amcharts/amcharts3/amcharts/plugins/export/libs/fabric.js/fabric";
// import "amcharts/amcharts3/amcharts/plugins/export/libs/jszip/jszip";
// import "amcharts/amcharts3/amcharts/plugins/export/libs/pdfmake/pdfmake";
// import "amcharts/amcharts3/amcharts/plugins/export/libs/xlsx/xlsx";

export class UIChart {
    __canvas;
    __chart;
}

@customElement('ui-chart')
export class UIChartBase extends UIChart {
	/**
		 * @property    chart-title
		 * @type        string
		 */
    @bindable()
    chartTitle: string = '';
	/**
		 * @property    chart-options
		 * @type        Array
		 */
    @bindable()
    chartOptions: AmCharts.AmChart = <AmCharts.AmChart>{};
	/**
		 * @property    width
		 * @type        number
		 */
    @bindable()
    width: number = 600;
	/**
		 * @property    height
		 * @type        number
		 */
    @bindable()
    height: number = 400;

    chartDataChanged(newValue) {
        if (_.isEmpty(newValue)) return;
        this.__buildChart();
    }

    __buildChart() {
        this.__chart = AmCharts.makeChart(this.__canvas, _.cloneDeep(this.chartOptions));
        this.__chart.write(this.__canvas);
    }
}

@autoinject()
@customElement('ui-bar')
@useView('./ui-chart.html')
export class UIBar extends UIChart {
	/**
	   * @property    chart-title
	   * @type        string
	   */
    @bindable()
    chartTitle: string = '';
	/**
	   * @property    chart-data
	   * @type        Array
	   */
    @bindable()
    chartData: Array<any> = [];
	/**
	   * @property    chart-options
	   * @type        Array
	   */
    @bindable()
    chartOptions: UIBarOptions = <UIBarOptions>{};
	/**
		 * @property    width
		 * @type        number
		 */
    @bindable()
    width: number = 600;
	/**
		 * @property    height
		 * @type        number
		 */
    @bindable()
    height: number = 400;

    @bindable()
    legend: string = 'right';


    private isColumn = false;
    private canExport = false;
    private showLegend = false;

    private __graphs = [];
    private __options: AmCharts.AmSerialChart = <AmCharts.AmSerialChart>{};

    constructor(element: Element) {
        super();
        this.isColumn = element.hasAttribute('column');
        this.canExport = element.hasAttribute('export');
        this.showLegend = element.hasAttribute('legend');

        if (element.hasAttribute('stretch')) element.classList.add('ui-stretch');
    }

    chartDataChanged(newValue) {
        if (_.isEmpty(newValue)) return;
        this.__buildChart();
    }

    bind() {
        this.chartTitle = this.chartOptions.chartTitle || this.chartTitle;
        this.__options.type = "serial";
        this.__options.theme = this.chartOptions.theme || 'default';
        this.__options.precision = 2;
        this.__options.usePrefixes = true;
        this.__options.marginRight = this.canExport ? 70 : 30;
        this.__options.startDuration = 1;
        this.__options.rotate = !this.isColumn;
        this.__options.chartCursor = <AmCharts.ChartCursor>{
            cursorPosition: "middle"
        };
        this.__options.export = <AmCharts.ExportSettings>{
            enabled: this.canExport,
            libs: { autoLoad: false },
            menu: [{
                'class': "export-main",
                'menu': ["PNG", "JPG", "CSV", "JSON"]
            }]
        };
        this.__options.valueAxes = [{
            title: this.chartOptions.valueAxisTitle || '',
            unit: this.chartOptions.valueAxisUnit,
            unitPosition: 'left'
        }];
        this.__options.balloon = <AmCharts.AmBalloon>{
            fillAlpha: .95
        };
        if (this.showLegend) {
            this.__options.legend = <AmCharts.AmLegend>{
                horizontalGap: 10,
                maxColumns: this.legend == 'bottom' ? 10 : 1,
                position: this.legend || 'right',
                useGraphSettings: true,
                markerSize: 10
            }
        }
        this.__options.categoryField = this.chartOptions.categoryField;
        this.__options.categoryAxis = <AmCharts.CategoryAxis>{
            // parseDates: true
            labelRotation: -30,
            title: this.chartOptions.categoryAxisTitle || ''
        };

        this.__graphs = [];
        _.forEach(this.chartOptions.series, v => {
            this.__graphs.push(Object.assign({}, {
                type: "column",
                balloonText: `<div style="font-size: 120%;">[[title]]:</div><div style="font-size: 150%;">${v['unitPrefix'] || ''}[[value]]</div>`,
                columnWidth: .85,
                fillAlphas: 0.8,
                lineAlpha: 0.2,
                fillColorsField: 'color'
            }, v));
        });

    }

    __buildChart() {
        this.__options.graphs = _.cloneDeep(this.__graphs);
        this.__options.dataProvider = _.cloneDeep(this.chartData);

        this.__chart = AmCharts.makeChart(this.__canvas, this.__options);
        this.__chart.write(this.__canvas);
    }
}


@autoinject()
@customElement('ui-pie')
@useView('./ui-chart.html')
export class UIPie extends UIChart {
	/**
	   * @property    chart-title
	   * @type        string
	   */
    @bindable()
    chartTitle: string = '';
	/**
	   * @property    chart-data
	   * @type        Array
	   */
    @bindable()
    chartData: Array<any> = [];
	/**
		 * @property    width
		 * @type        number
		 */
    @bindable()
    width: number = 600;
	/**
		 * @property    height
		 * @type        number
		 */
    @bindable()
    height: number = 400;

	/**
		 * @property    value-property
		 * @type        string
		 */
    @bindable()
    valueProperty: string = '';
	/**
	   * @property    title-property
	   * @type        string
	   */
    @bindable()
    titleProperty: string = '';

    @bindable()
    legend: string = 'right';
    @bindable()
    donut: string = '0%';
    @bindable()
    theme: string = 'pie';
    @bindable()
    colorProperty: string = '';

    private showDonut = false;
    private canExport = false;
    private groupExtras = false;

    constructor(element: Element) {
        super();
        this.showDonut = element.hasAttribute('donut');
        this.canExport = element.hasAttribute('export');
        this.groupExtras = element.hasAttribute('group');

        if (element.hasAttribute('stretch')) element.classList.add('ui-stretch');
    }

    chartDataChanged(newValue) {
        if (_.isEmpty(newValue)) return;
        this.__buildChart();
    }

    __options: AmCharts.AmPieChart = <AmCharts.AmPieChart>{};
    __buildChart() {
        this.__options.type = "pie";
        //this.__options.theme = this.theme;
        switch (this.theme) {
            case 'red': this.__options.colors = UIChartStatic.CHART_RED; break;
            case 'pink': this.__options.colors = UIChartStatic.CHART_PINK; break;
            case 'blue': this.__options.colors = UIChartStatic.CHART_BLUE; break;
            case 'green': this.__options.colors = UIChartStatic.CHART_GREEN; break;
            case 'orange': this.__options.colors = UIChartStatic.CHART_ORANGE; break;
            case 'violet': this.__options.colors = UIChartStatic.CHART_VIOLET; break;
            case 'spectrum': this.__options.colors = UIChartStatic.CHART_SPECTRUM; break;
            default: this.__options.colors = UIChartStatic.CHART_PIE; break;
        }
        this.__options.addClassNames = true;
        this.__options.precision = 2;
        this.__options.groupPercent = this.groupExtras ? 10 : 0;
        this.__options.radius = "40%";
        this.__options.startRadius = "90%";
        this.__options.startEffect = "easeOutSine";
        this.__options.labelsEnabled = false;
        this.__options.gradientRatio = [0, 0.2];
        this.__options.startDuration = .5;
        this.__options.usePrefixes = true;
        this.__options.balloonText = "[[title]]:<br/><b>[[value]]</b>";
        this.__options.innerRadius = this.donut || '30%';
        this.__options.export = <AmCharts.ExportSettings>{
            enabled: this.canExport,
            libs: { autoLoad: false },
            menu: [{
                'class': "export-main",
                'menu': ["PNG", "JPG", "CSV", "JSON"]
            }]
        };
        // this.__options.valueAxes = [{
        // 	stackType: "regular",
        // 	axisAlpha: 0.3,
        // 	gridAlpha: 0
        // }];
        if (this.colorProperty) this.__options.colorField = this.colorProperty;
        this.__options.balloon = <AmCharts.AmBalloon>{
            fillAlpha: .95
        };
        this.__options.legend = <AmCharts.AmLegend>{
            horizontalGap: 10,
            valueText: '[[percents]]%',
            maxColumns: this.legend == 'bottom' ? 10 : 1,
            position: this.legend || 'right',
            // useGraphSettings: true,
            markerSize: 10
        };
        this.__options.valueField = this.valueProperty;
        this.__options.titleField = this.titleProperty;
        this.__options.dataProvider = _.cloneDeep(this.chartData);

        this.__chart = AmCharts.makeChart(this.__canvas, this.__options);
        this.__chart.write(this.__canvas);
    }
}
