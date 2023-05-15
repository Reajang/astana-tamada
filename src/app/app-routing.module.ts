import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TostsListComponent} from "./components/tosts/tosts-list/tosts-list.component";
import {TostEditComponent} from "./components/tosts/tost-edit/tost-edit.component";
import {TarotFutureTellingComponent} from "./components/tarot/tarot-future-telling/tarot-future-telling.component";

const routes: Routes = [
  {
    path: '',
    component: TostsListComponent,
  },
  {
    path: 'tosts',
    component: TostsListComponent,
  },
  {
    path: 'tosts/edit',
    component: TostEditComponent,
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
