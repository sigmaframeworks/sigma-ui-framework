import {UIDialog} from "../resources/utils/ui-dialog";

export class mydlg extends UIDialog {
  title = "My Dialog";

  activate(model) {
    Object.assign(this, model);
  }
}