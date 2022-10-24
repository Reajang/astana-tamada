import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TostsListComponent} from "./components/tosts/tosts-list/tosts-list.component";

const routes: Routes = [
  {
    path: 'tosts',
    component: TostsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
