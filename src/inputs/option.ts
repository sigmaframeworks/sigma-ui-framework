// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
export class InputSwitch {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }

  val = 0;
}