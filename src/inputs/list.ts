// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {_} from "../resources/index";

export class InputList {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }

  ctry = 'UAE';
  ctries = 'AE,GB,AU';
  icns = 'bell,calendar,test';

  countries = _.chain(window.countries).sortBy(['continent', 'name']).groupBy('continent').value();

  options = [
    { id: 'bell', text: 'Bell' },
    { id: 'calendar', text: 'Calendar' },
    { id: 'desktop', text: 'Desktop' },
    { id: 'image', text: 'Image' },
    { id: 'search', text: 'Search' }
  ];

}