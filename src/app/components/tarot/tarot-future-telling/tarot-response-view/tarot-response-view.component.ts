import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TarotResponse} from "../../../../models/tarot/tarot.model";

@Component({
  selector: 'app-tarot-response-view',
  templateUrl: './tarot-response-view.component.html',
  styleUrls: ['./tarot-response-view.component.scss']
})
export class TarotResponseViewComponent implements OnInit {

  response: TarotResponse;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.response = this.config.data.response;
      console.log(this.response.text)
    }
  }

}
