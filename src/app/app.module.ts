import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TostsListComponent} from './components/tosts/tosts-list/tosts-list.component';
import {TostListCardComponent} from './components/tosts/tosts-list/tost-list-card/tost-list-card.component';
import {StoreModule} from "@ngrx/store";

import * as fromTostStore from './store/tosts/tost.reducer';
import * as fromTarotStore from './store/tarot/tarot.reducer';
import * as fromJobStore from './store/system/job/job.reducer';
import * as fromHttpResponseStatusStore from './store/system/httprequeststatus/http-request-status.reducer';
import * as fromLanguageStore from './store/system/language/language.reducer';
import {EffectsModule} from "@ngrx/effects";
import {TostEffects} from "./store/tosts/tost.effects";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {TostEditComponent} from './components/tosts/tost-edit/tost-edit.component';
import {TostEditCardComponent} from './components/tosts/tost-edit/tost-edit-card/tost-edit-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TarotFutureTellingComponent} from './components/tarot/tarot-future-telling/tarot-future-telling.component';
import {TarotEffects} from "./store/tarot/tarot.effects";
import {
  TarotSelectedCardViewComponent
} from './components/tarot/tarot-future-telling/tarot-selected-card-view/tarot-selected-card-view.component';
import {TarotResponseViewComponent} from './components/tarot/tarot-future-telling/tarot-response-view/tarot-response-view.component';
import {DialogService} from "primeng/dynamicdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RadioButtonModule} from "primeng/radiobutton";
import {JobEffects} from "./store/system/job/job.effects";
import {PreloaderSpinnerComponent} from './components/common/preloader-spinner/preloader-spinner.component';
import {SimpleButtonComponent} from './components/common/simple-button/simple-button.component';
import {SystemLanguageSelectorComponent} from './components/common/system-language-selector/system-language-selector.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {DropdownModule} from "primeng/dropdown";
import {ListboxModule} from "primeng/listbox";

@NgModule({
  declarations: [
    AppComponent,
    TostsListComponent,
    TostListCardComponent,
    HeaderComponent,
    FooterComponent,
    TostEditComponent,
    TostEditCardComponent,
    TarotFutureTellingComponent,
    TarotSelectedCardViewComponent,
    TarotResponseViewComponent,
    PreloaderSpinnerComponent,
    SimpleButtonComponent,
    SystemLanguageSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(
      fromTostStore.tostFeatureKey,
      fromTostStore.tostReduser,
    ),
    StoreModule.forFeature(
      fromTarotStore.tarotFeatureKey,
      fromTarotStore.tarotReduser,
    ),
    StoreModule.forFeature(
      fromJobStore.jobFeatureKey,
      fromJobStore.jobReducer,
    ),
    StoreModule.forFeature(
      fromHttpResponseStatusStore.httpRequestStatusFeatureKey,
      fromHttpResponseStatusStore.httpResponseStatusReducer,
    ),
    StoreModule.forFeature(
      fromLanguageStore.languageFeatureKey,
      fromLanguageStore.languageReducer,
    ),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      TostEffects,
      TarotEffects,
      JobEffects,
    ]),
    ReactiveFormsModule,
    RadioButtonModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    ListboxModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
