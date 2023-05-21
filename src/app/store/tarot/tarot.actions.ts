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

export const pullRandomCard = createAction(
  '[Tarot] pull card',
);

export const getPulledCard = createAction(
  '[Tarot] pull card',
  props<{ card: TarotCard }>(),
);

export const askQuestionAsync = createAction(
  '[Tarot] ask question async',
  props<{ request: TarotRequest }>(),
);

export const setAskAsyncJobId = createAction(
  '[Tarot] set ask async job id',
  props<{ jodId: string }>(),
);
