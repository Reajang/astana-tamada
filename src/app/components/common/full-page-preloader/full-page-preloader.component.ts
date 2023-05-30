import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-full-page-preloader',
  templateUrl: './full-page-preloader.component.html',
  styleUrls: ['./full-page-preloader.component.scss']
})
export class FullPagePreloaderComponent implements OnInit, OnDestroy {

  @Input() isLoading = false;

  closeEventEmitter: EventEmitter<any>;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    // Если запускается в модалке
    if (this.config.data) {
      this.isLoading = true;
      this.closeEventEmitter = this.config.data?.closeRequest;
      this.subscribeOnCloseEvent();
    }

  }

  private subscribeOnCloseEvent() {
    if (this.closeEventEmitter) {
      this.closeEventEmitter.pipe(
        takeUntil(this.unsubscribe$),
      )
        .subscribe(closeEvent => {
          this.isLoading = false;
          this.ref.close();
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
