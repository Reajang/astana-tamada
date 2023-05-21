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
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      TostEffects,
      TarotEffects,
      JobEffects
    ]),
    ReactiveFormsModule,
    RadioButtonModule,
    FormsModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
