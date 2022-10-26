import {Component, Input, OnInit} from '@angular/core';
import {Tost} from "../../../../models/tosts/tost.model";

@Component({
  selector: 'app-tost-list-card',
  templateUrl: './tost-list-card.component.html',
  styleUrls: ['./tost-list-card.component.scss']
})
export class TostListCardComponent implements OnInit {

  @Input() item: Tost;
  open = false;


  constructor() { }

  ngOnInit(): void {
  }

  change() {
    this.open = !this.open;
  }
}
