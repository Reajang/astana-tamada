import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Tost} from "../../../models/tosts/tost.model";
import {Store} from "@ngrx/store";
import * as TostActions from "../../../store/tosts/tosts.actions";
import {createTost} from "../../../store/tosts/tosts.actions";
import {selectTostsList} from "../../../store/tosts/tost.selectors";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tost-edit',
  templateUrl: './tost-edit.component.html',
  styleUrls: ['./tost-edit.component.scss']
})
export class TostEditComponent implements OnInit {

  tostList$: Observable<Tost[]>;
  addForm: FormGroup;
  showAddForm = false;

  fakeUserId = '7028315f-6b52-46cd-abd9-fc76f0a1bbf3';

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      text: new FormControl(null),
    })
    this.store.dispatch(TostActions.loadTosts({userId: this.fakeUserId}))
    this.tostList$ = this.store.select(selectTostsList);
  }

  saveTost() {
    this.store.dispatch(
      createTost({
        userId: this.fakeUserId,
        text: this.addForm.controls['text'].value
      })
    );
  }

}
