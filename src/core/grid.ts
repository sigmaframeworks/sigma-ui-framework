// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
export class Grid {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }
}