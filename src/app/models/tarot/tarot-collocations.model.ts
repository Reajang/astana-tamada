import {Language} from "../common/language.model";

export interface TarotCollocations {
  questionPlaceholder: string;
  askButtonTitle: string;
  resetButtonTitle: string;
}

export const TarotCollocationsEN: TarotCollocations = {
  questionPlaceholder: "Write here your question",
  askButtonTitle: "Get a prediction",
  resetButtonTitle: "Reset",
}

export const TarotCollocationsRU: TarotCollocations = {
  questionPlaceholder: "Введите свой вопрос",
  askButtonTitle: "Получить предсказание",
  resetButtonTitle: "Попробовать заново",
}

export const TarotCollocationsMap: Map<Language, TarotCollocations> = new Map<Language, TarotCollocations>([
  [Language.EN, TarotCollocationsEN],
  [Language.RU, TarotCollocationsRU],
]);
