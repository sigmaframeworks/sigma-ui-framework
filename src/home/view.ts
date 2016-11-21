// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
export class Home {
  canActivate() {
    return new Promise(res => {
      setTimeout(() => res(), 500);
    });
  }

  core = [
    { label: 'Font Glyphs', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Responsive Grid', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Page Layouts', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 }
  ]

  inputs = [
    { label: 'Textual', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'List', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Tag', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Date', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Option', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Button', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Markdown', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 }
  ]

  comps = [
    { label: 'Menus', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Panels', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Dialogs', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Drawers', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Tab Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Datagrid', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Tree Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 }
  ]
}
