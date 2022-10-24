import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TostsListComponent} from './components/tosts/tosts-list/tosts-list.component';
import {TostListCardComponent} from './components/tosts/tosts-list/tost-list-card/tost-list-card.component';
import {StoreModule} from "@ngrx/store";

import * as fromTostStore from './store/tosts/tost.reducer';
import {EffectsModule} from "@ngrx/effects";
import {TostEffects} from "./store/tosts/tost.effects";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    TostsListComponent,
    TostListCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(
      fromTostStore.tostFeatureKey,
      fromTostStore.tostReduser,
    ),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      TostEffects,
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
