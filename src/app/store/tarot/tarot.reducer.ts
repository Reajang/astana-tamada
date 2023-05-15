import {createReducer, on} from "@ngrx/store";
import * as TarotActions from "../tarot/tarot.actions";
import {TarotCard, TarotRequest, TarotResponse} from "../../models/tarot/tarot.model";

export const tarotFeatureKey = 'tarotFeatureKey';

export interface TarotState {
  deck: TarotCard[],
  request?: TarotRequest,
  response?: TarotResponse | null,
  randomlyPulledCards: TarotCard[],
}

export const initialState: TarotState = {
  deck: [],
  randomlyPulledCards: [],
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

  on(TarotActions.getResponse, (state, {response}) => {
    return {
      ...state,
      response
    }
  }),

  on(TarotActions.getPulledCard, (state, {card}) => {
    return {
      ...state,
      randomlyPulledCards: [...state.randomlyPulledCards, card],
    }
  }),
);
