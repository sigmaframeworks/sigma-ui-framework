// UI Tabbed Panel
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {autoinject, customElement, bindable, bindingMode, inlineView, children} from "aurelia-framework";
import {_} from "../utils/ui-utils";

@autoinject()
@customElement('ui-tab-panel')
export class UITabPanel {
    private __tabs;
    private __tabButtons;
    private __selectedTab;

    @children('.ui-tab-body ui-tab')
    tabs = [];

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    activeTab = 0;

    constructor(public element: Element) {
    }

    bind() {
    }

    tabsChanged() {
        this.activeTabChanged(this.activeTab)
    }

    activeTabChanged(newValue) {
        if (this.__selectedTab) this.__selectedTab.isSelected = false;
        if (this.tabs[newValue]) {
            (this.__selectedTab = this.tabs[newValue]).isSelected = true;
        }
    }
}

@autoinject()
@inlineView('<template class="ui-tab-content ${isSelected?\'ui-active\':\'\'}"><slot></slot></template>')
@customElement('ui-tab')
export class UITab {
    @bindable
    label: string = '';
    @bindable
    icon: string = '';

    isSelected = false;

    constructor(public element: Element) {
        if (this.element.hasAttribute('scroll')) this.element.classList.add('ui-scroll');
        if (this.element.hasAttribute('padded')) this.element.classList.add('ui-pad-all');
        if (this.element.hasAttribute('flex')) this.element.classList.add('ui-column-row');
    }
}

}
