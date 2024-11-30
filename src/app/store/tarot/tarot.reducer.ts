import {createReducer, on} from "@ngrx/store";
import * as TarotActions from "../tarot/tarot.actions";
import {TarotCard, TarotRequest, TarotResponse} from "../../models/tarot/tarot.model";

export const tarotFeatureKey = 'tarotFeatureKey';

export interface TarotState {
  deck: TarotCard[],
  request?: TarotRequest,
  response?: TarotResponse | null,
}

export const initialState: TarotState = {
  deck: [],
};

export const tarotReduser = createReducer(
  initialState,

  on(TarotActions.setDeck, (state, {deck}) => {
    return {
      ...state,
      deck
    }
  }),

  on(TarotActions.askQuestion, (state, {request}) => {
    return {
      ...state,
      request
    }
  }),

  on(TarotActions.setResponse, (state, {response}) => {
    return {
      ...state,
      response
    }
  }),
);
