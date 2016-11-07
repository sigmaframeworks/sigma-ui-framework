// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
export class CompDatagrid {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }


  crumbs = ['Personal Info', 'Shipping Info', 'Payment Info', 'Agreement'];
  activeTab = 0;
  next() {
    if (this.activeTab + 1 < this.crumbs.length)
      this.activeTab++;
  }
  prev() {
    this.activeTab--;
  }

  changeTab(evt) {
    this.activeTab = evt.detail;
  }
}