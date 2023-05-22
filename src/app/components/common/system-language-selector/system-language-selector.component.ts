import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectableValue} from "../../../models/common/selectable-value.model";
import {Language} from "../../../models/common/language.model";
import {Store} from "@ngrx/store";
import {setLanguage} from "../../../store/system/language/language.action";

@Component({
  selector: 'app-system-language-selector',
  templateUrl: './system-language-selector.component.html',
  styleUrls: ['./system-language-selector.component.scss']
})
export class SystemLanguageSelectorComponent {

  @Input() changeLangInStoreOnSelect = true;

  @Output() onLanguageChange: EventEmitter<Language> = new EventEmitter<Language>();

  selectedLanguage: Language;
  languages: SelectableValue[] = [
    {
      title: "English",
      value: Language.EN,
    },
    {
      title: "Русский",
      value: Language.RU,
    }
  ];


  constructor(
    private store: Store,
  ) {
  }

  onLanguageSelect() {
    this.onLanguageChange.emit(this.selectedLanguage);

    if (this.changeLangInStoreOnSelect) {
      this.store.dispatch(setLanguage({language: this.selectedLanguage}));
    }
  }
}
