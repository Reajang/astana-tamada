import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TarotCard} from "../../../../models/tarot/tarot.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-tarot-selected-card-view',
  templateUrl: './tarot-selected-card-view.component.html',
  styleUrls: ['./tarot-selected-card-view.component.scss'],
})
export class TarotSelectedCardViewComponent implements OnInit {

  @Input() card?: TarotCard | undefined;
  @Input() reversable = true;
  @Output() onOpenClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.card = this.config.data.card;
      this.reversable = false;
    }
  }
}
