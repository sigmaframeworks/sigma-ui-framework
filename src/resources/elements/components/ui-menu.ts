// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";
import * as Tether from "tether";

// Menubar
@autoinject()
@customElement('ui-menubar')
@inlineView(`
<template class="ui-menubar">
  <div class="ui-menubar-wrapper" ref="__wrapper"><slot></slot></div>
  <div class="ui-menubar-overflow" ref="__overflowToggle" show.bind="__isOverflow" click.trigger="showOverflow($event)"><span class="fi-ui-overflow"></span></div>
  <div class="ui-hidden"><div class="ui-menu ui-floating" ref="__overflow"></div></div>
</template>`)
export class UIMenubar {
  constructor(public element: Element) { UIEvent.subscribe('appready', () => this.arrange()); }

  __wrapper: Element;
  __overflow: Element;
  __overflowToggle: Element;
  __isOverflow = false;
  __tether;

  __obResize;
  __obClick;

  attached() {
    this.__obResize = UIEvent.subscribe('windowresize', () => this.arrange());
    this.__obClick = UIEvent.subscribe('mouseclick', () => this.__overflow.classList.add('ui-hidden'));
    window.setTimeout(() => this.arrange(), 500);
    this.__tether = new Tether({
      element: this.__overflow,
      target: this.element,
      attachment: 'top right',
      targetAttachment: 'bottom right',
      offset: '0 10px',
      constraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ],
      optimizations: {
        moveElement: false
      }
    });
  }

  detached() {
    this.__tether.destroy();
    this.__obClick.dispose();
    this.__obResize.dispose();
    DOM.removeNode(this.__overflow);
  }

  arrange() {
    this.__overflow.classList.add('ui-hidden');
    for (let i = 0, c = this.__overflow['children']; i < c.length; i++) {
      this.__wrapper.appendChild(c[i]);
    }
    if (this.__isOverflow = (this.__wrapper.lastElementChild.offsetLeft + this.__wrapper.lastElementChild.offsetWidth > this.__wrapper.offsetWidth)) {
      for (let c = this.__wrapper['children'], i = c.length - 1; i >= 0; i--) {
        if (c[i].offsetLeft + c[i].offsetWidth > this.__wrapper.offsetWidth) {
          if (this.__overflow.hasChildNodes) this.__overflow.insertBefore(c[i], this.__overflow.childNodes[0]); else this.__overflow.appendChild(c[i]);
        }
      }
    }
  }
  showOverflow(evt) {
    if (evt.button != 0) return true;
    if (this.__overflow.classList.contains('ui-hidden')) {
      this.__overflow.classList.remove('ui-hidden');
      this.__tether.position();
    }
    else
      this.__overflow.classList.add('ui-hidden');
  }
}

// Menubar
@autoinject()
@customElement('ui-menu')
@inlineView('<template class="ui-menu"><slot></slot></template>')
export class UIMenu {
  constructor(public element: Element) { }
}

@autoinject()
@customElement('ui-menu-group')
@inlineView('<template class="ui-menu-section"><div class="ui-menu-section-title" innerhtml.bind="label"></div><slot></slot></template>')
export class UIMenuGroup {
  constructor(public element: Element) { }

  @bindable() label = '';
}

@autoinject()
@customElement('ui-menu-section')
@inlineView('<template class="ui-menu-section-title"><slot></slot></template>')
export class UIMenuSection {
  constructor(public element: Element) { }
}

@autoinject()
@customElement('ui-menu-divider')
@inlineView('<template class="ui-menu-divider"></template>')
export class UIMenuDivider {
  constructor(public element: Element) { }
}

@autoinject()
@containerless()
@customElement('ui-menu-item')
@inlineView(`<template><a class="ui-menu-item \${active?'ui-active':''} \${disabled?'ui-disabled':''}" href.bind="href" click.trigger="click($event)">
    <span if.bind="icon" class="ui-menu-icon fi-ui \${icon}"></span><span class="ui-menu-label"><slot></slot></span></a></template>`)
export class UIMenuLink {
  constructor(public element: Element) { }

  bind() {
    this.active = isTrue(this.active);
    this.disabled = isTrue(this.disabled);
  }

  @bindable() icon = '';
  @bindable() active = false;
  @bindable() disabled = false;
  @bindable() href = 'javascript:void(0)';

  click(evt) {
    if (evt.button != 0) return true;
    evt.cancelBubble = true;
    evt.stopPropagation();
    return UIEvent.fireEvent('click', this.element);
  }
}
