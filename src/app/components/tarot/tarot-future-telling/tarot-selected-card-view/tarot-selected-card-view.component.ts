import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TarotCard} from "../../../../models/tarot/tarot.model";

@Component({
  selector: 'app-tarot-selected-card-view',
  templateUrl: './tarot-selected-card-view.component.html',
  styleUrls: ['./tarot-selected-card-view.component.scss']
})
export class TarotSelectedCardViewComponent implements OnInit {

  @Input() card?: TarotCard | undefined;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
