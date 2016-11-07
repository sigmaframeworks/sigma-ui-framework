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
}