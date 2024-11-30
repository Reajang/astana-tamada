import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as TarotActions from "../tarot/tarot.actions";
import * as HttpRequestStatusesActions from "../system/httprequeststatus/http-request-status.action";
import {catchError, map, switchMap} from "rxjs";
import {TarotService} from "../../services/tarot/tarot.service";
import {Store} from "@ngrx/store";
import {HttpRequestType, LoadingStatus} from "../system/httprequeststatus/http-request-status.reducer";

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
        this.store.dispatch(HttpRequestStatusesActions.setStatus({
          updateRequest: {
            type: HttpRequestType.TAROT_REQUEST,
            status: LoadingStatus.LOADING
          }
        }));
        return this.service.ask(request);
      }),
      map((response) => {
        this.store.dispatch(HttpRequestStatusesActions.setStatus({
          updateRequest: {
            type: HttpRequestType.TAROT_REQUEST,
            status: LoadingStatus.SUCCESS
          }
        }));
        return TarotActions.setResponse({response});
      }),
      catchError((error, caught) => {
        this.store.dispatch(HttpRequestStatusesActions.setStatus({
          updateRequest: {
            type: HttpRequestType.TAROT_REQUEST,
            status: LoadingStatus.FAILED
          }
        }));
        return caught;
      })
    )
  });
}
