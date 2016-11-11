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
export * from "./utils/ui-application";
export * from "./utils/ui-constants";
export * from "./utils/ui-http-service";
export * from "./utils/ui-dialog";
export * from "./utils/ui-model";
export * from "./utils/ui-tree-model";
export interface UIConfig {
    title(t: string): UIConfig;
    version(t: string): UIConfig;
    appKey(t: string): UIConfig;
    apiUrl(t: string): UIConfig;
    apiHeaders(t: any): UIConfig;
    addAuthHeader(t: boolean): UIConfig;
    languages(l: Array<any>): UIConfig;
}
export declare function configure(config: FrameworkConfiguration, configCallback: any): void;
