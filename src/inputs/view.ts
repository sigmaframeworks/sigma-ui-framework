// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {inject, NewInstance} from "aurelia-framework";
import {ValidationController, ValidationRules} from "aurelia-validation";
import * as moment from "moment";

@inject(NewInstance.of(ValidationController))
export class Inputs {
  constructor(public controller: ValidationController) {
    ValidationRules
      .ensure((m: any) => m.text)
      .required()
      .maxLength(20)
      .ensure(m => m.password)
      .required()
      .maxLength(20)
      .ensure(m => m.email)
      .required()
      .email()
      .minLength(8)
      .ensure(m => m.number)
      .required()
      .satisfiesRule('integer', 1, 99)
      .ensure(m => m.decimal)
      .required()
      .satisfiesRule('decimal', 1, 99)
      .ensure(m => m.phone)
      .required()
      .satisfiesRule('phone')
      .ensure(m => m.dateStart)
      .required()
      .ensure(m => m.dateEnd)
      .required()
      .then()
      .satisfies((v, o) => moment(v).isSameOrAfter(o.dateStart))
      .withMessage('${$displayName} must be after ${$object.dateStartDisplay()}')
      .on(this.model);
  }
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }

  submit() {
    this.controller.validate().then(e => console.log(e));
  }

  model = {
    text: '',
    password: '',
    email: '',
    url: '',
    number: 0,
    decimal: 0,
    phone: '',
    dateStart: '',
    dateStartDisplay: () => moment(this.model.dateStart).format('DD MMM YYYY')
  }
}