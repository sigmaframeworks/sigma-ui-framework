import { UIInputGroup } from "./ui-input-group";
import { UIApplication } from "../utils/ui-application";
export declare class UILanguage extends UIInputGroup {
    __list: any;
    __focus: any;
    __options: any;
    __languages: any;
    __available: any;
    static LANGUAGES: ({
        id: string;
        name: string;
        rtl: boolean;
    } | {
        id: string;
        name: string;
    })[];
    constructor(element: Element, app: UIApplication);
    /**
     * @property    value
     * @type        string
     */
    language: string;
    /**
     * @property    languages
     * @type        array | map
     */
    languages: any;
    /**
     * @property    disabled
     * @type        boolean
     */
    disabled: boolean;
    attached(): void;
    languageChanged(newValue: any): string;
    languagesChanged(newValue: any): void;
    formatter(): any;
    __add(lang: any): void;
    __select(lang: any): void;
    __remove(lang: any): void;
}
