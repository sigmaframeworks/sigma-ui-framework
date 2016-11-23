// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, useView} from "aurelia-framework";
import {UIDialogService} from "../resources/utils/ui-dialog";
import {UIUtils} from "../resources/utils/ui-utils";
import {UIApplication} from "../resources/utils/ui-application";
import {mydlg} from "./mydlg";

@autoinject()
export class CompDialog {
  constructor(public app: UIApplication, public dialogService: UIDialogService) { }

  dlgModel = {
    icon: '',
    title: 'Dialog Title',
    modal: false,
    drag: false,
    resize: false,
    maximize: false
  }

  alert = {
    message: 'This is an alert message',
    type: 'info',
    yesLabel: 'OK',
    noLabel: 'Cancel'
  }

  toast = {
    icon: '',
    autoHide: 5000,
    message: 'This is a toast message',
    theme: 'normal'
  }


  openDialog() {
    mydlg.show(this.dlgModel);
    // this.dialogService.show(mydlg, this.dlgModel);
  }

  openToast() {
    this.app.toast(this.toast);
  }

  openAlert() {
    this.app.alert(this.alert);
  }

  openConfirm() {
    this.app.confirm(this.alert)
      .then((b) => UIUtils.showToast({ theme: b ? 'success' : 'danger', message: b ? 'You clicked yes :)' : 'You clicked no :(' }));
  }
}