import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TarotFutureTellingComponent} from "./components/tarot/tarot-future-telling/tarot-future-telling.component";
import {JobListComponent} from "./components/jobs/job-list/job-list.component";

const routes: Routes = [
  {
    path: '',
    component: TarotFutureTellingComponent,
  },
  {
    path: 'tarot',
    component: TarotFutureTellingComponent,
  },
  {
    path: 'jobs',
    component: JobListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
