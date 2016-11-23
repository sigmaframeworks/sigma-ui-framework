// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject} from "aurelia-framework";
import {UIApplication, UIEvent} from "../resources/index";
import * as _ from "lodash";

@autoinject()
export class CompDatagrid {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }
  data = [];
  data2 = [];

  crumbs = ['Root'];
  ctries = _.mapKeys(window.countries, 'iso2');

  constructor(public app: UIApplication) {
    for (var i = 0; i < 8; i++)
      this.data2.push({ id: i + 1, name: 'Name', dob: '2010-01-01', gender: 'M', address: 'Address', city: 'City', country: 'AE' })


    let names = [
      'Alfred Grant',
      'John Cagney',
      'Henry Stewart',
      'James Cooper',
      'Cary Douglas',
      'Olivia MacLaine',
      'Lauren Carwford',
      'Vivian Garland',
      'Deborah Kelly',
      'Jane Garner'
    ]
    for (var i = 0; i < names.length; i++)
      this.data.push({
        id: i + 1,
        name: names[i],
        dob: (1940 + Math.round(Math.random() * 60)) + '-0' + (1 + Math.round(Math.random() * 9)) + '-' + (1 + Math.round(Math.random() * 30)),
        gender: i < 5 ? 'M' : 'F',
        country: window.countries[Math.round(Math.random() * 200)].iso2
      });
  }

  genderDisplay(v, r) {
    return v == 'M' ? 'Male' : 'Female';
  }
  countryDisplay(v, r) {
    return '<div class="ui-row ui-nowrap"><span class="ui-flag ' + v + '"></span> ' + (this.ctries[v] || { name: '' }).name + '</div>';
  }

  changeTab($event) {
    let d = _.clone(this.data);
    this.data = [];
    this.crumbs.splice($event.detail + 1);
    UIEvent.queueTask(() => this.data = d);
  }

  drillDown($event) {
    let d = _.clone(this.data);
    this.data = [];
    this.crumbs.push($event.detail.value);
    UIEvent.queueTask(() => this.data = d);
  }
  isDisabled() {
    return this.crumbs.length == 5;
  }
}