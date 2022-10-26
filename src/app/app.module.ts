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
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TostEditComponent } from './components/tosts/tost-edit/tost-edit.component';
import { TostEditCardComponent } from './components/tosts/tost-edit/tost-edit-card/tost-edit-card.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TostsListComponent,
    TostListCardComponent,
    HeaderComponent,
    FooterComponent,
    TostEditComponent,
    TostEditCardComponent
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
        ]),
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
