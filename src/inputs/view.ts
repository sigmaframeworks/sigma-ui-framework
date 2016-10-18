// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
export class Inputs {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 1000);
    });
  }
}