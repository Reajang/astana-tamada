import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TostsListComponent} from "./components/tosts/tosts-list/tosts-list.component";
import {TostEditComponent} from "./components/tosts/tost-edit/tost-edit.component";

const routes: Routes = [
  {
    path: 'tosts',
    component: TostsListComponent,
  },
  {
    path: 'tosts/edit',
    component: TostEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
