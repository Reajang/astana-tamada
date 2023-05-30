import {Language} from "../common/language.model";

export interface TarotCollocations {
  questionPlaceholder: string;
  askButtonTitle: string;
  resetButtonTitle: string;
  responseAlreadyGot: string;
  disclaimerText: string;
  disclaimerRef: string;
}

export const TarotCollocationsEN: TarotCollocations = {
  questionPlaceholder: "Write here your question",
  askButtonTitle: "Get a prediction",
  resetButtonTitle: "Reset",
  responseAlreadyGot: "For this scenario, the answer has already been received. Try a different combination of cards",
  disclaimerText: "The descriptions of the cards are taken from the website ",
  disclaimerRef: "https://www.tarot.com/tarot/cards",
}

export const TarotCollocationsRU: TarotCollocations = {
  questionPlaceholder: "Введите свой вопрос",
  askButtonTitle: "Получить предсказание",
  resetButtonTitle: "Попробовать заново",
  responseAlreadyGot: "Для этого расклада ответ уже был получен. Попробуйте другую комбинацию карт",
  disclaimerText: "Описания карт взяты с сайта",
  disclaimerRef: "https://www.tarot.com/tarot/cards",
}

export const TarotCollocationsMap: Map<Language, TarotCollocations> = new Map<Language, TarotCollocations>([
  [Language.EN, TarotCollocationsEN],
  [Language.RU, TarotCollocationsRU],
]);
