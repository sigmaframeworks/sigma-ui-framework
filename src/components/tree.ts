// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {UITreeOptions, UIEvent} from "../resources/index";

export class CompTree {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 1000);
    });
  }

  __tree;
  checked;
  treeModel;
  treeSelected = 'UAE';
  treeChecked = 'UAE,IND';
  treeOpts = new UITreeOptions({
    showCheckbox: false,
    selectionLevel: 1
  });
  treeOpts2 = new UITreeOptions({
    showCheckbox: true,
    selectionLevel: 0
  });

  countries = _.mapKeys(window.countries, 'iso3');

  constructor() {
    var ct = [];
    _.forEach(_.chain(window.countries).sortBy('continent').groupBy('continent').value(), (v: any, k: string) => {
      let c = {
        id: _.camelCase(k),
        text: k,
        expanded: k == 'Asia',
        children: []
      }
      _.forEach(_.sortBy(v, 'name'), (o: any) => {
        c.children.push({
          id: o.iso3,
          text: o.name,
          leaf: true,
          icon: `ui-flag ${o.iso3}`
        })
      });
      ct.push(c);
    });
    this.treeModel = ct;
  }

  attached() {
    // UIEvent.queueTask(() => {
    //   this.__tree.check('UAE', 1, true);
    //   this.__tree.check('IND', 1, true);
    //   this.checked = this.__tree.getChecked();
    // });
  }
}