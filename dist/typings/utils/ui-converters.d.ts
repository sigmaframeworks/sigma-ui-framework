export declare class MarkdownValueConverter {
    toView(value: string): string;
}
export declare class DateValueConverter {
    toView(value: string, format?: string): any;
}
export declare class DatetimeValueConverter {
    toView(value: string, format?: string): any;
}
export declare class FromNowValueConverter {
    toView(value: string): string;
}
export declare class NumberValueConverter {
    toView(value: string, format?: string): string;
}
export declare class CurrencyValueConverter {
    toView(value: string, symbol?: string, format?: string): string;
}
export declare class PercentValueConverter {
    toView(value: string): string;
}
export declare class KeysValueConverter {
    toView(object: any): string[];
}
export declare class GroupValueConverter {
    toView(object: any, property: any): any;
}
export declare class SortValueConverter {
    toView(value: any, property: any): {}[];
}
export declare class JsonValueConverter {
    toView(value: any): string;
}
export declare class IsStringValueConverter {
    toView(value: any): boolean;
}
export declare class IsArrayValueConverter {
    toView(value: any): boolean;
}
export declare class IsObjectValueConverter {
    toView(value: any): boolean;
}
export declare class IsEmptyValueConverter {
    toView(value: any): boolean;
}
export declare class IsTrueValueConverter {
    toView(value: any): boolean;
}
export declare class IsFalseValueConverter {
    toView(value: any): boolean;
}
