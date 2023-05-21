import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromRequestStatusReducer from './http-request-status.reducer'
import {HttpRequestType} from './http-request-status.reducer'

export const selectHttpRequestStatusState =
  createFeatureSelector<fromRequestStatusReducer.HttpRequestStatusState>(
    fromRequestStatusReducer.httpRequestStatusFeatureKey
  );

export const selectStatus = (requestType: HttpRequestType) => {
  return createSelector(
    selectHttpRequestStatusState,
    state => state[requestType],
  );
}
