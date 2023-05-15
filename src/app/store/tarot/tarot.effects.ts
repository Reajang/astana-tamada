import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import * as TarotActions from "../tarot/tarot.actions";
import {catchError, map, switchMap} from "rxjs";
import {TarotService} from "../../services/tarot/tarot.service";

@Injectable()
export class TarotEffects {

  constructor(
    private actions$: Actions,
    private service: TarotService,
    private store: Store,
  ) {
  }


  getDeck$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TarotActions.getDeck),
      switchMap(({deckType}) => {
        return this.service.getDeck(deckType);
      }),
      map((deck) => {
        return TarotActions.setDeck({deck});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });


  ask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TarotActions.askQuestion),
      switchMap(({request}) => {
        return this.service.ask(request);
      }),
      map((response) => {
        return TarotActions.getResponse({response});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });


  pullCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TarotActions.pullRandomCard),
      switchMap(() => {
        return this.service.takeATry();
      }),
      map((card) => {
        return TarotActions.getPulledCard({card});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });
}
