import {createReducer, on} from "@ngrx/store";
import * as LanguageActions from "../language/language.action";
import {Language} from "../../../models/common/language.model";

export const languageFeatureKey = 'languageFeatureKey';

export type LanguageState = {
  selectedLanguage: Language;
};

export const initialState: LanguageState = {
  selectedLanguage: Language.EN,
};

export const languageReducer = createReducer(
  initialState,

  on(LanguageActions.setLanguage, (state, {language}) => {
    return {
      ...state,
      selectedLanguage: language,
    }
  }),
);
