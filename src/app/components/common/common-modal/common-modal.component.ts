import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {
  dialogMode = false;
  caption = 'Сообщение';
  message = 'Информация успешно сохранена';
  okButtonLabel = 'Да';
  cancelButtonLabel = 'Нет';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    this.applyParameters(this.config.data);
  }

  applyParameters(data: any) {
    if (!data) {
      return;
    }
    for (const prop of Object.keys(data)) {
      if (data[prop] !== undefined) {
        // @ts-ignore
        this[prop] = data[prop];
      }
    }
  }

  callback = () => {
    if (this.config.data.okCallback) {
      this.config.data.okCallback();
    }
    this.ref.close();
  }

  close = () => {
    if (this.config.data.closeCallback) {
      this.config.data.closeCallback();
    }
    this.ref.close();
  }

  cancel = () => {
    if (this.config.data.cancelCallback) {
      this.config.data.cancelCallback();
    }
    this.ref.close();
  }
}
