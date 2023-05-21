import {createAction, props} from "@ngrx/store";
import {HttpRequestStatus, HttpRequestType} from "./http-request-status.reducer";

export const setStatus = createAction(
  '[Http request status] set status',
  props<{
    updateRequest: {
      type: HttpRequestType;
      status: HttpRequestStatus;
    }
  }>(),
);
