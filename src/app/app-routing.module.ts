import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TarotFutureTellingComponent} from "./components/tarot/tarot-future-telling/tarot-future-telling.component";

const routes: Routes = [
  {
    path: '',
    component: TarotFutureTellingComponent,
  },
  {
    path: 'tarot',
    component: TarotFutureTellingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
