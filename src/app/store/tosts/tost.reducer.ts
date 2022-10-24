import {createReducer, on} from '@ngrx/store';
import {Tost} from "../../models/tosts/tost.model";
import * as TostActions from './tosts.actions';

export const tostFeatureKey = 'tostFeatureKey';

export interface TostsState {
  list: Tost[],
}

export const initialState: TostsState = {
  list: [],
};

export const tostReduser = createReducer(
  initialState,

  on(TostActions.loadTostsSuccess, (state, {list}) => {
    return {
      ...state,
      list
    }
  })
);
