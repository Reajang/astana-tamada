import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";

import * as fromTarotStore from './store/tarot/tarot.reducer';
import * as fromJobStore from './store/system/job/job.reducer';
import * as fromHttpResponseStatusStore from './store/system/httprequeststatus/http-request-status.reducer';
import * as fromLanguageStore from './store/system/language/language.reducer';
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TarotFutureTellingComponent} from './components/tarot/tarot-future-telling/tarot-future-telling.component';
import {TarotEffects} from "./store/tarot/tarot.effects";
import {
  TarotSelectedCardViewComponent
} from './components/tarot/tarot-future-telling/tarot-selected-card-view/tarot-selected-card-view.component';
import {TarotResponseViewComponent} from './components/tarot/tarot-future-telling/tarot-response-view/tarot-response-view.component';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RadioButtonModule} from "primeng/radiobutton";
import {JobEffects} from "./store/system/job/job.effects";
import {PreloaderSpinnerComponent} from './components/common/preloader-spinner/preloader-spinner.component';
import {SimpleButtonComponent} from './components/common/simple-button/simple-button.component';
import {SystemLanguageSelectorComponent} from './components/common/system-language-selector/system-language-selector.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {DropdownModule} from "primeng/dropdown";
import {ListboxModule} from "primeng/listbox";
import {CommonModalComponent} from './components/common/common-modal/common-modal.component';
import {FullPagePreloaderComponent} from './components/common/full-page-preloader/full-page-preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TarotFutureTellingComponent,
    TarotSelectedCardViewComponent,
    TarotResponseViewComponent,
    PreloaderSpinnerComponent,
    SimpleButtonComponent,
    SystemLanguageSelectorComponent,
    CommonModalComponent,
    FullPagePreloaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
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
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig
  ],
  exports: [
    TarotSelectedCardViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
