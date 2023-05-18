import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as JobActions from "../job/job.actions";
import {catchError, map, switchMap} from "rxjs";
import {JobService} from "../../../services/system/job.service";

@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private service: JobService,
  ) {
  }


  getJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.getJob),
      switchMap(({jobId}) => {
        return this.service.get(jobId);
      }),
      map((job) => {
        return JobActions.setJob({job});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });
}
