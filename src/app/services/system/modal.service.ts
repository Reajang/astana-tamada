import {Injectable} from "@angular/core";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CommonModalComponent} from "../../components/common/common-modal/common-modal.component";
import {FullPagePreloaderComponent} from "../../components/common/full-page-preloader/full-page-preloader.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: DialogService) {
  }

  showInfoPopup(
    caption: string,
    message: string,
    dialogMode = false,
    okButtonLabel = 'Ok',
    cancelButtonLabel = 'Cancel'): DynamicDialogRef {
    return this.showCommonPopup({
      caption,
      message,
      dialogMode,
      okButtonLabel,
      cancelButtonLabel,
    });
  }

  showCommonPopup(data: any): DynamicDialogRef {
    return this.dialog.open(CommonModalComponent, {
      showHeader: false,
      data
    });
  }

  showModal(component: any, data: any, config: DynamicDialogConfig = {}): DynamicDialogRef {
    return this.dialog.open(component, {
      data,
      ...config
    });
  }

  showFullPagePreloaderPopup(data?: any): DynamicDialogRef {
    return this.dialog.open(FullPagePreloaderComponent, {
      showHeader: false,
      data
    });
  }

}
