import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TostService} from "../../services/tosts/tost.service";
import * as TostActions from './tosts.actions';
import {catchError, map, of, switchMap} from "rxjs";
import {Store} from "@ngrx/store";

@Injectable()
export class TostEffects {

  constructor(
    private actions$: Actions,
    private tostService: TostService,
    private store: Store,
  ) {
  }


  loadTosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TostActions.loadTosts),
      switchMap(({userId}) => {
        return this.tostService.getList(userId);
      }),
      map((list) => {
        return TostActions.loadTostsSuccess({list});
      }),
      catchError((error, caught) => {
        this.store.dispatch(TostActions.loadTostsFailure({payload: error}));
        return caught;
      })
    )
  });


  createTost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TostActions.createTost),
      switchMap(({userId, text}) => {
        return this.tostService.create(userId, text);
      }),
      map((createdTost) => {
        return TostActions.loadTosts({userId: createdTost.userId});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });


  updateTost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TostActions.updateTost),
      switchMap(({userId, tostId, text}) => {
        return of(userId);
      }),
      map((userId) => {
        return TostActions.loadTosts({userId});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });
}
