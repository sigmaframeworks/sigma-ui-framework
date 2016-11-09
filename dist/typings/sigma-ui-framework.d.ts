import { FrameworkConfiguration } from 'aurelia-framework';
import 'lodash';
import 'moment';
import 'numeral';
import 'tether';
import * as ld from "lodash";
export declare var _: ld.LoDashStatic;
export declare var kramed: KramedStatic;
export declare var moment: moment.MomentStatic;
export declare var numeral: Numeral;
export * from "./utils/ui-event";
export * from "./utils/ui-format";
export * from "./utils/ui-tree-model";
export interface UIConfig {
}
export declare function configure(config: FrameworkConfiguration, configCallback: any): void;
