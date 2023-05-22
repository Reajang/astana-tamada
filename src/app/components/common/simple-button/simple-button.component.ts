import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingStatus} from "../../../store/system/httprequeststatus/http-request-status.reducer";


@Component({
  selector: 'app-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss'],
})
export class SimpleButtonComponent {

  @Input() buttonTitle = "Button";
  @Input() loadingStatus: LoadingStatus | null = LoadingStatus.INITIAL;
  @Input() disabled = false;
  @Input() hidden = false;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();


  LOADING_STATUSES = LoadingStatus;

}
