import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tost} from "../../models/tosts/tost.model";

@Injectable({
  providedIn: 'root'
})
export class TostService {


  constructor(private http$: HttpClient) {
  }


  getList = (userId?: string): Observable<Tost[]> => {
    return this.http$.get<Tost[]>(
      `/api/tost/${userId}`,
      {
        observe: 'body',
        responseType: 'json',
      }
    );
  }

  create = (userId: string, text: string): Observable<Tost> => {
    return this.http$.post<Tost>(
      `/api/tost/${userId}`,
      {
        params: {
          text
        },
        observe: 'body',
        responseType: 'json',
      }
    );
  }

  update = (userId: string, tostId: string, text: string): Observable<Tost[]> => {
    return this.http$.put<Tost[]>(
      `/api/tost/${userId}`,
      {
        params: {
          tostId,
          text
        },
        observe: 'body',
        responseType: 'json',
      }
    );
  }
}
