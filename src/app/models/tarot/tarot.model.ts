import {Language} from "../common/language.model";

export interface TarotCard {
  id?: string;
  cardType?: TarotCardType;
  name: string;
  description?: string;
  reversedDescription?: string;
  advice?: string;
  reversed?: boolean;
  imageId?: string;
}

export interface TarotCardType {
  id: string;
  name: string;
  description: string;
}


export interface TarotRequest {
  cards: TarotCard[];
  text: string;
  from?: Language;
  to?: Language;
}

export interface TarotResponse {
  cards: TarotCard[];
  text: string;
  from?: Language;
  to?: Language;
}
