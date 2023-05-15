import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromTarotReduser from './tarot.reducer'

export const selectTarotState =
  createFeatureSelector<fromTarotReduser.TarotState>(
    fromTarotReduser.tarotFeatureKey
  );

export const selectTarotDesk = createSelector(
  selectTarotState,
  state => state.deck,
);

export const selectTarotRequest = createSelector(
  selectTarotState,
  state => state.request,
);

export const selectTarotResponse = createSelector(
  selectTarotState,
  state => state.response,
);

export const selectTarotPulledCards = createSelector(
  selectTarotState,
  state => state.randomlyPulledCards,
);
