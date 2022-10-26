import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Tost} from "../../../models/tosts/tost.model";
import {Store} from "@ngrx/store";
import * as TostActions from '../../../store/tosts/tosts.actions';
import {selectTostsList} from "../../../store/tosts/tost.selectors";


@Component({
  selector: 'app-tosts-list',
  templateUrl: './tosts-list.component.html',
  styleUrls: ['./tosts-list.component.scss']
})
export class TostsListComponent implements OnInit {

  tostList$: Observable<Tost[]>;

  fakeUserId = '7028315f-6b52-46cd-abd9-fc76f0a1bbf3';

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(TostActions.loadTosts({userId: this.fakeUserId}))
    this.tostList$ = this.store.select(selectTostsList);
  }
}
