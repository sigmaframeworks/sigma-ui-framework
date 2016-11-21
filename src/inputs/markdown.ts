// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {inject, NewInstance} from "aurelia-framework";
import {ValidationController, ValidationRules} from "aurelia-validation";
import {UIEvent} from "../resources/index";

@inject(NewInstance.of(ValidationController))
export class InputMarkdown {
  md = `# Hello World


##### I _Love_ ~~HTML~~ __Markdown__!

---

I can be __BOLD__, I can also be _ITALIC_, or you can ~~DELETE~~ me too!

Look at me I'm a list

-	Item
-	Item
-	Item

And I'm numbered

1.	Item
2.	Item
3.	Item

I can also be a link [Click Me](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) or show the whole url http://google.com

![Image](images/heart.png) Dont you just love images!
`;


  langList;
  langDir = 'ltr';
  langModel = null;
  langModels = {
    ar: new LangModel('### هل تتحدث العربية؟'),
    en: new LangModel('### Do you speak English?'),
    es: new LangModel('### ¿Hablas español?'),
    fr: new LangModel('### Parlez-vous français?'),
    de: new LangModel('### Sprechen sie deutsch?')
  }

  constructor(public controller: ValidationController) { }

  attached() {
    UIEvent.queueTask(() => {
      ValidationRules
        .ensure((m: InputMarkdown) => m.langModels)
        .satisfiesRule('language', this.controller, this.langList)
        .on(this);
    });
  }

  submit() {
    this.controller.validate();
  }

  changeLang($event) {
    this.langModel = this.langModels[$event.detail.id] || {};
    this.langDir = $event.detail.rtl ? 'rtl' : 'ltr';
  }

  addLang($event) {
    this.langModels[$event.detail.id] = new LangModel();
  }

  removeLang($event) {
    delete this.langModels[$event.detail.id];
  }
}

export class LangModel {
  summary: string = '';

  constructor(su?, de?) {
    this.summary = su;

    ValidationRules
      .ensure((m: LangModel) => m.summary)
      .required()
      .on(this);
  }
}