// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, useView} from "aurelia-framework";
import {UIDialogService} from "../resources/utils/ui-dialog";
import {mydlg} from "./mydlg";

@autoinject()
export class CompDialog {
  constructor(public dialogService: UIDialogService) { }

  showDlg(modal) {
    this.dialogService.show(mydlg, ({ modal }));
  }
}