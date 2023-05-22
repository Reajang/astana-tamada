import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-preloader-spinner',
  templateUrl: './preloader-spinner.component.html',
  styleUrls: ['./preloader-spinner.component.scss']
})
export class PreloaderSpinnerComponent {

  @Input() isLoading = false;

}
