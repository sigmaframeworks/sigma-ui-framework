// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT

import {customAttribute, bindable, inlineView, autoinject, TaskQueue} from "aurelia-framework";
import * as kramed from "kramed";

@autoinject()
@customAttribute('markdown')
export class UIMarkdownView {
  constructor(public element: Element, public taskQueue: TaskQueue) { }
  attached() {
    this.taskQueue.queueMicroTask(() => {
      this.element.parentElement.classList.add('ui-markdown');
      let code = this.element.textContent;
      let len = code.match(/^[ \t]*/)[0].length;
      code = code.replace(new RegExp(`^[ \\t]{${len},${len}}`, 'gm'), '');
      this.element.parentElement.innerHTML = kramed(code, kramed.defaults);
    });
  }
}
