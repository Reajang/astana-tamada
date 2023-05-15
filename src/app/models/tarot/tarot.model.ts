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
  question: string;
}

export interface TarotResponse {
  cards: TarotCard[];
  response: string;
}
