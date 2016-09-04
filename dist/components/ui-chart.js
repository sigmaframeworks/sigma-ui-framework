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
define(["require", "exports", "aurelia-framework", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_utils_1) {
    "use strict";
    var UIChart = (function () {
        function UIChart() {
        }
        return UIChart;
    }());
    exports.UIChart = UIChart;
    var UIChartBase = (function (_super) {
        __extends(UIChartBase, _super);
        function UIChartBase(element) {
            _super.call(this);
            this.chartTitle = '';
            this.chartData = [];
            this.chartOptions = {};
            this.width = 600;
            this.height = 400;
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-stretch');
        }
        UIChartBase.prototype.chartDataChanged = function (newValue) {
            if (ui_utils_1._.isEmpty(newValue))
                return;
            this.__buildChart();
        };
        UIChartBase.prototype.__buildChart = function () {
            if (isFunction(this.build)) {
                this.build(this.__canvas, this.chartData);
            }
            else {
                if (!AmCharts)
                    throw new Error('amCharts not loaded');
                this.chartOptions.dataProvider = ui_utils_1._.cloneDeep(this.chartData);
                this.__chart = AmCharts.makeChart(this.__canvas, ui_utils_1._.cloneDeep(this.chartOptions));
                this.__chart.write(this.__canvas);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIChartBase.prototype, "chartTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], UIChartBase.prototype, "chartData", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', AmCharts.AmChart)
        ], UIChartBase.prototype, "chartOptions", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Number)
        ], UIChartBase.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Number)
        ], UIChartBase.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIChartBase.prototype, "build", void 0);
        UIChartBase = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-chart'), 
            __metadata('design:paramtypes', [Element])
        ], UIChartBase);
        return UIChartBase;
    }(UIChart));
    exports.UIChartBase = UIChartBase;
    var UIBar = (function (_super) {
        __extends(UIBar, _super);
        function UIBar(element) {
            _super.call(this);
            this.chartTitle = '';
            this.chartData = [];
            this.chartOptions = {};
            this.width = 600;
            this.height = 400;
            this.legend = 'right';
            this.isColumn = false;
            this.canExport = false;
            this.showLegend = false;
            this.__graphs = [];
            this.__options = {};
            this.isColumn = element.hasAttribute('column');
            this.canExport = element.hasAttribute('export');
            this.showLegend = element.hasAttribute('legend');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-stretch');
        }
        UIBar.prototype.chartDataChanged = function (newValue) {
            if (ui_utils_1._.isEmpty(newValue))
                return;
            this.__buildChart();
        };
        UIBar.prototype.bind = function () {
            var _this = this;
            this.chartTitle = this.chartOptions.chartTitle || this.chartTitle;
            this.__options.type = "serial";
            this.__options.theme = this.chartOptions.theme || 'default';
            this.__options.precision = 2;
            this.__options.usePrefixes = true;
            this.__options.marginRight = this.canExport ? 70 : 30;
            this.__options.startDuration = 1;
            this.__options.rotate = !this.isColumn;
            this.__options.chartCursor = {
                cursorPosition: "middle"
            };
            this.__options.export = {
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
            this.__options.balloon = {
                fillAlpha: .95
            };
            if (this.showLegend) {
                this.__options.legend = {
                    horizontalGap: 10,
                    maxColumns: this.legend == 'bottom' ? 10 : 1,
                    position: this.legend || 'right',
                    useGraphSettings: true,
                    markerSize: 10
                };
            }
            this.__options.categoryField = this.chartOptions.categoryField;
            this.__options.categoryAxis = {
                labelRotation: -30,
                title: this.chartOptions.categoryAxisTitle || ''
            };
            this.__graphs = [];
            ui_utils_1._.forEach(this.chartOptions.series, function (v) {
                _this.__graphs.push(Object.assign({}, {
                    type: "column",
                    balloonText: "<div style=\"font-size: 120%;\">[[title]]:</div><div style=\"font-size: 150%;\">" + (v['unitPrefix'] || '') + "[[value]]</div>",
                    columnWidth: .85,
                    fillAlphas: 0.8,
                    lineAlpha: 0.2,
                    fillColorsField: 'color'
                }, v));
            });
        };
        UIBar.prototype.__buildChart = function () {
            this.__options.graphs = ui_utils_1._.cloneDeep(this.__graphs);
            this.__options.dataProvider = ui_utils_1._.cloneDeep(this.chartData);
            this.__chart = AmCharts.makeChart(this.__canvas, this.__options);
            this.__chart.write(this.__canvas);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIBar.prototype, "chartTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], UIBar.prototype, "chartData", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIBar.prototype, "chartOptions", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Number)
        ], UIBar.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Number)
        ], UIBar.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIBar.prototype, "legend", void 0);
        UIBar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-bar'),
            aurelia_framework_1.useView('./ui-chart.html'), 
            __metadata('design:paramtypes', [Element])
        ], UIBar);
        return UIBar;
    }(UIChart));
    exports.UIBar = UIBar;
    var UIPie = (function (_super) {
        __extends(UIPie, _super);
        function UIPie(element) {
            _super.call(this);
            this.chartTitle = '';
            this.chartData = [];
            this.width = 600;
            this.height = 400;
            this.valueProperty = '';
            this.titleProperty = '';
            this.legend = 'right';
            this.donut = '0%';
            this.theme = 'pie';
            this.colorProperty = '';
            this.showDonut = false;
            this.canExport = false;
            this.groupExtras = false;
            this.__options = {};
            this.showDonut = element.hasAttribute('donut');
            this.canExport = element.hasAttribute('export');
            this.groupExtras = element.hasAttribute('group');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-stretch');
        }
        UIPie.prototype.chartDataChanged = function (newValue) {
            if (ui_utils_1._.isEmpty(newValue))
                return;
            this.__buildChart();
        };
        UIPie.prototype.__buildChart = function () {
            this.__options.type = "pie";
            this.__options.theme = this.theme;
            switch (this.theme) {
                case 'pie':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_PIE;
                    break;
                case 'red':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_RED;
                    break;
                case 'pink':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_PINK;
                    break;
                case 'blue':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_BLUE;
                    break;
                case 'green':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_GREEN;
                    break;
                case 'orange':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_ORANGE;
                    break;
                case 'violet':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_VIOLET;
                    break;
                case 'spectrum':
                    this.__options.colors = ui_utils_1.UIChartStatic.CHART_SPECTRUM;
                    break;
                default:
                    this.__options.theme = this.theme;
                    break;
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
            this.__options.export = {
                enabled: this.canExport,
                libs: { autoLoad: false },
                menu: [{
                        'class': "export-main",
                        'menu': ["PNG", "JPG", "CSV", "JSON"]
                    }]
            };
            if (this.colorProperty)
                this.__options.colorField = this.colorProperty;
            this.__options.balloon = {
                fillAlpha: .95
            };
            this.__options.legend = {
                horizontalGap: 10,
                valueText: '[[percents]]%',
                maxColumns: this.legend == 'bottom' ? 10 : 1,
                position: this.legend || 'right',
                markerSize: 10
            };
            this.__options.valueField = this.valueProperty;
            this.__options.titleField = this.titleProperty;
            this.__options.dataProvider = ui_utils_1._.cloneDeep(this.chartData);
            this.__chart = AmCharts.makeChart(this.__canvas, this.__options);
            this.__chart.write(this.__canvas);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "chartTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], UIPie.prototype, "chartData", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Number)
        ], UIPie.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Number)
        ], UIPie.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "titleProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "legend", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "donut", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], UIPie.prototype, "colorProperty", void 0);
        UIPie = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-pie'),
            aurelia_framework_1.useView('./ui-chart.html'), 
            __metadata('design:paramtypes', [Element])
        ], UIPie);
        return UIPie;
    }(UIChart));
    exports.UIPie = UIPie;
});
