// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
export class Home {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 1000);
    });
  }

  core = [
    { label: 'Responsive Grid', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Page Layouts', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 }
  ]

  inputs = [
    { label: 'Textual', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'List', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Option', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Button', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 }
  ]

  comps = [
    { label: 'Menus', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Panels', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Drawers', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Tab Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Tree Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 }
  ]
}