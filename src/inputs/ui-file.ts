// UI File Input
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, autoinject, bindable} from "aurelia-framework";

@autoinject
@customElement('ui-file')
export class UIFileInput {
	static FILE_IMAGES = 'png,jpg,jpeg,tiff';
	static FILE_DOCS = 'doc,docx,xls,xlsx,ppt,pptx,csv,rtf,txt,pdf';

	@bindable()
	fileTypes = '';

	constructor(public element: Element) {
		if (this.element.hasAttribute('auto-width')) this.element.classList.add('ui-auto');
		if (this.element.hasAttribute('label-top')) this.element.classList.add('ui-label-top');
		if (this.element.hasAttribute('label-hide')) this.element.classList.add('ui-label-hide');
	}

	attached() {
		this.__input.draggedFiles = this.__files;
	}

	__input;
	__files = [];
	__dragging = false;
	__dragEnter($event) {
		this.__dragging = true;
		$event.preventDefault();
		return false;
	}

	__dragExit($event) {
		this.__dragging = false;
	}

	__drop($event) {
		this.__dragging = false;
		$event.preventDefault();

		var dt = $event.dataTransfer;
		var files = dt.files;
		for (var i = 0; i < files.length; i++) {
			var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.filetypes[files[i].type] || 'txt' }
			this.__files.push(f);
		}
	}

	__fileChoose() {
		var files = this.__input.files;
		for (var i = 0; i < files.length; i++) {
			var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.filetypes[files[i].type] || 'txt' }
			this.__files.push(f);
		}
	}

	__remove(index) {
		this.__files.splice(index, 1);
	}

}
