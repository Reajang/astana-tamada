import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromTostReduser from './tost.reducer'

export const selectTostState =
  createFeatureSelector<fromTostReduser.TostsState>(
    fromTostReduser.tostFeatureKey
  );

export const selectTostsList = createSelector(
  selectTostState,
  state => state.list,
);
