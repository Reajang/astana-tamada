import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as JobActions from "../job/job.actions";
import {catchError, map, switchMap} from "rxjs";
import {JobService} from "../../../services/system/job.service";
import {Job, JobStatus, JobType} from "../../../models/system/job.model";
import {JobHandler} from "../../../services/system/job-handler.service";

@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private service: JobService,
    private jobHandler: JobHandler,
  ) {
  }


  getJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.getJob),
      switchMap(({jobId}) => {
        return this.service.get(jobId);
      }),
      map((job) => {
        this.processWellKnownSucceedJob(job);
        return JobActions.setJob({job});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });

  private processWellKnownSucceedJob(job: Job) {
    if (job.status !== JobStatus.COMPLETE) {
      return;
    }

    if (job.type === JobType.TAROT_FUTURE_TELL) {
      this.jobHandler.processSuccessTarotAsyncResponse(job);
    }
  }

}
