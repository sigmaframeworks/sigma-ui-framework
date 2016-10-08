declare class UIBadgeBase {
  constructor(element: Element, bg: string);
  __el: any;
  valueChanged(newValue: any): void;
}
export declare class UIBadge extends UIBadgeBase {
  element: Element;
  constructor(element: Element);
}
export declare class UIBadgePrimary extends UIBadgeBase {
  element: Element;
  constructor(element: Element);
}
export declare class UIBadgeInfo extends UIBadgeBase {
  element: Element;
  constructor(element: Element);
}
export declare class UIBadgeDanger extends UIBadgeBase {
  element: Element;
  constructor(element: Element);
}
export declare class UIBadgeSuccess extends UIBadgeBase {
  element: Element;
  constructor(element: Element);
}
export declare class UIBadgeWarning extends UIBadgeBase {
  element: Element;
  constructor(element: Element);
}
