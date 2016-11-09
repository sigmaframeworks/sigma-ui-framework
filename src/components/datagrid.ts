// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import * as _ from "lodash";

export class CompDatagrid {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }
  data = [];
  data2 = [];
  ctries = _.mapKeys(window.countries, 'iso2');
  constructor() {
    for (var i = 0; i < 25; i++)
      this.data.push({ id: i + 1, name: 'Name', dob: '2010-01-01', gender: 'M', address: 'Address', city: 'City', country: 'AE' })
    for (var i = 0; i < 8; i++)
      this.data2.push({ id: i + 1, name: 'Name', dob: '2010-01-01', gender: 'M', address: 'Address', city: 'City', country: 'AE' })
  }

  genderDisplay(v, r) {
    return v == 'M' ? 'Male' : 'Female';
  }
  countryDisplay(v, r) {
    return (this.ctries[v] || { name: '' }).name;
  }
}