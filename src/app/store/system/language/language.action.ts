import {createAction, props} from "@ngrx/store";
import {Language} from "../../../models/common/language.model";

export const setLanguage = createAction(
  '[Language] set language',
  props<{ language: Language }>(),
);
