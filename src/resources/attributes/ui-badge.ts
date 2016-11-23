// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customAttribute, inlineView, noView} from "aurelia-framework";

class UIBadgeBase {
  constructor(element: Element, bg: string) {
    this.__el = document.createElement('div');
    this.__el.classList.add('ui-badge');
    this.__el.classList.add('ui-hidden');
    this.__el.classList.add(bg);
    if (element.nodeType == Node.ELEMENT_NODE)
      element.appendChild(this.__el);
    if (element.nodeType == Node.COMMENT_NODE)
      element.previousSibling.appendChild(this.__el);
  }

  __el;

  valueChanged(newValue) {
    this.__el.classList[newValue ? 'remove' : 'add']('ui-hidden');
    this.__el.innerHTML = newValue;
  }
}

@autoinject()
@customAttribute('badge')
export class UIBadge extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-dark')
  }
}

@autoinject()
@customAttribute('badge-primary')
export class UIBadgePrimary extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-primary')
  }
}

@autoinject()
@customAttribute('badge-secondary')
export class UIBadgeSecondary extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-secondary')
  }
}

@autoinject()
@customAttribute('badge-info')
export class UIBadgeInfo extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-info')
  }
}

@autoinject()
@customAttribute('badge-danger')
export class UIBadgeDanger extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-danger')
  }
}

@autoinject()
@customAttribute('badge-success')
export class UIBadgeSuccess extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-success')
  }
}

@autoinject()
@customAttribute('badge-warning')
export class UIBadgeWarning extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-warning')
  }
}