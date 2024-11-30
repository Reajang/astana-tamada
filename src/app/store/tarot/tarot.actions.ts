import {createAction, props} from "@ngrx/store";
import {TarotCard, TarotRequest, TarotResponse} from "../../models/tarot/tarot.model";

export const getDeck = createAction(
  '[Tarot] get getDeck',
  props<{ deckType?: string }>(),
);

export const setDeck = createAction(
  '[Tarot] set deck',
  props<{ deck: TarotCard[] }>(),
);

export const askQuestion = createAction(
  '[Tarot] ask question',
  props<{ request: TarotRequest }>(),
);


export const setResponse = createAction(
  '[Tarot] set response',
  props<{ response: TarotResponse }>(),
);

