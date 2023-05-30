import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as JobActions from "../job/job.actions";
import {catchError, map, switchMap} from "rxjs";
import {JobService} from "../../../services/system/job.service";
import {Job, JobStatus, JobType} from "../../../models/system/job.model";
import {JobHandler} from "../../../services/system/job-handler.service";
import {ModalService} from "../../../services/system/modal.service";

@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private service: JobService,
    private jobHandler: JobHandler,
    private modalService: ModalService,
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

  setJobFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setJobFailed),
      switchMap(({jobId}) => {
        return this.service.get(jobId);
      }),
      map((job) => {
        let potentialFailedJob: Job = Object.assign({}, job);
        potentialFailedJob.status = JobStatus.ERROR;
        this.processWellKnownSucceedJob(potentialFailedJob);
        return JobActions.setJob({job: potentialFailedJob});
      }),
      catchError((error, caught) => {
        return caught;
      })
    )
  });

  private processWellKnownSucceedJob(job: Job): void {
    if (job.status === JobStatus.ERROR) {
      this.processJobOnError(job);
    }

    if (job.status !== JobStatus.COMPLETE) {
      return;
    }

    if (job.type === JobType.TAROT_FUTURE_TELL) {
      this.jobHandler.processSuccessTarotAsyncResponse(job);
    }
  }

  private processJobOnError(job: Job): void {
    this.processError(job);
  }

  private processError(error: any): void {
    console.log(error);
    this.modalService.showInfoPopup(
      "Что-то пошло не так",
      "Сервер не ответил во время или ответил ошибкой. Попробуйте снова.",
      false,
      'Колхоз'
    );
  }

}
