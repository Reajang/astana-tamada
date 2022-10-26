import {createAction, props} from '@ngrx/store';
import {Tost} from "../../models/tosts/tost.model";

export const loadTosts = createAction(
  '[Tosts] Load Tosts',
  props<{ userId: string }>(),
);

export const loadTostsSuccess = createAction(
  '[Tosts] Load Tostss Success',
  props<{ list: Tost[] }>(),
);

export const loadTostsFailure = createAction(
  '[Tosts] Load Tosts Failure',
  props<{ payload: any }>(),
);

export const createTost = createAction(
  '[Tosts] Create tost',
  props<{ userId: string, text: string }>(),
);


export const updateTost = createAction(
  '[Tosts] Update tost',
  props<{ userId: string, tostId: string, text: string }>(),
);
