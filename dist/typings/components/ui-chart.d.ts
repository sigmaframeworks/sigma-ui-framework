export declare class UIChart {
    __canvas: any;
    __chart: any;
}
export declare class UIChartBase extends UIChart {
    /**
       * @property    chart-title
       * @type        string
       */
    chartTitle: string;
    /**
       * @property    chart-data
       * @type        Array
       */
    chartData: Array<any>;
    /**
       * @property    chart-options
       * @type        Array
       */
    chartOptions: AmCharts.AmChart;
    /**
       * @property    width
       * @type        number
       */
    width: number;
    /**
       * @property    height
       * @type        number
       */
    height: number;
    build: any;
    constructor(element: Element);
    chartDataChanged(newValue: any): void;
    __buildChart(): void;
}
export declare class UIBar extends UIChart {
    /**
       * @property    chart-title
       * @type        string
       */
    chartTitle: string;
    /**
       * @property    chart-data
       * @type        Array
       */
    chartData: Array<any>;
    /**
       * @property    chart-options
       * @type        Array
       */
    chartOptions: UIBarOptions;
    /**
         * @property    width
         * @type        number
         */
    width: number;
    /**
         * @property    height
         * @type        number
         */
    height: number;
    legend: string;
    private isColumn;
    private canExport;
    private showLegend;
    private __graphs;
    private __options;
    constructor(element: Element);
    chartDataChanged(newValue: any): void;
    bind(): void;
    __buildChart(): void;
}
export declare class UIPie extends UIChart {
    /**
       * @property    chart-title
       * @type        string
       */
    chartTitle: string;
    /**
       * @property    chart-data
       * @type        Array
       */
    chartData: Array<any>;
    /**
         * @property    width
         * @type        number
         */
    width: number;
    /**
         * @property    height
         * @type        number
         */
    height: number;
    /**
         * @property    value-property
         * @type        string
         */
    valueProperty: string;
    /**
       * @property    title-property
       * @type        string
       */
    titleProperty: string;
    legend: string;
    donut: string;
    theme: string;
    colorProperty: string;
    private showDonut;
    private canExport;
    private groupExtras;
    constructor(element: Element);
    chartDataChanged(newValue: any): void;
    __options: AmCharts.AmPieChart;
    __buildChart(): void;
}
