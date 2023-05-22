import {createReducer, on} from "@ngrx/store";
import * as RequestStatusesActions from "../httprequeststatus/http-request-status.action";

export enum HttpRequestType {
  TAROT_REQUEST = 'TAROT_REQUEST',
  TAROT_REQUEST_ASYNC = 'TAROT_REQUEST_ASYNC',
}

export enum LoadingStatus {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export const httpRequestStatusFeatureKey = 'httpRequestStatusFeatureKey';

export type HttpRequestStatusState = {
  [key in HttpRequestType]?: LoadingStatus;
};

export const initialState: HttpRequestStatusState = {
  TAROT_REQUEST: LoadingStatus.INITIAL,
  TAROT_REQUEST_ASYNC: LoadingStatus.INITIAL,
};

export const httpResponseStatusReducer = createReducer(
  initialState,

  on(RequestStatusesActions.setStatus, (state, {updateRequest}) => {
    return {
      ...state,
      [updateRequest.type]: updateRequest.status,
    }
  }),
);
