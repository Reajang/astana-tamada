import {Component, Input, OnInit} from '@angular/core';
import {Tost} from "../../../../models/tosts/tost.model";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup} from "@angular/forms";
import {updateTost} from "../../../../store/tosts/tosts.actions";

@Component({
  selector: 'app-tost-edit-card',
  templateUrl: './tost-edit-card.component.html',
  styleUrls: ['./tost-edit-card.component.scss']
})
export class TostEditCardComponent implements OnInit {

  @Input() item: Tost;
  editForm: FormGroup;

  fakeUserId = '7028315f-6b52-46cd-abd9-fc76f0a1bbf3';

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
        text: new FormControl(this.item.text)
      }
    );
  }


  editTost(tostId: string) {
    this.store.dispatch(
      updateTost({
        userId: this.fakeUserId,
        tostId,
        text: this.editForm.controls['text'].value
      })
    );
  }
}
