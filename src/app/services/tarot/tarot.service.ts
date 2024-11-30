import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TarotCard, TarotRequest, TarotResponse} from "../../models/tarot/tarot.model";

@Injectable({
  providedIn: 'root'
})
export class TarotService {


  constructor(
    private http$: HttpClient,
  ) {
  }

  /**
   * Пока только один тип колоды
   * @param deckType
   */
  getDeck = (deckType?: string): Observable<TarotCard[]> => {
    return this.http$.get<TarotCard[]>(
      `/api/tarot/cards`,
    );
  }

  ask = (request: TarotRequest): Observable<TarotResponse> => {
    return this.http$.post<TarotResponse>(
      `/api/tarot/question`,
      request,
    );
  }
}
