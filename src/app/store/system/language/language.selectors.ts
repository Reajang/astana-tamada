import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromLanguageReducer from './language.reducer'

export const selectLanguageState =
  createFeatureSelector<fromLanguageReducer.LanguageState>(
    fromLanguageReducer.languageFeatureKey
  );

export const selectLanguage = createSelector(
  selectLanguageState,
  state => state.selectedLanguage,
);

