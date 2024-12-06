import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Job, JobResult, JobStatus, JobType} from "../../../models/system/job.model";
import {JobService} from "../../../services/system/job.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit, OnDestroy {

  jobs: Job[] = [];

  wsJobChannel: Subject<Job>

  private unsubscribe$ = new Subject<void>();


  constructor(
    private jobService: JobService,
  ) {
  }

  ngOnInit(): void {
    this.wsJobChannel = this.jobService.connect();

    this.wsJobChannel
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(job => {
        this.jobs.push(job)
      })
  }

  ngOnDestroy(): void {
    this.jobService.disconnect()
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createNewJob() {
    let newJob: Job = {
      id: '8f4487ec-9825-44fb-91cc-902612398561',
      type: JobType.TEST,
      status: JobStatus.IDLE,
      results: [
        {
          data: "test"
        }
      ]
    }
    this.wsJobChannel.next(newJob)
  }
}
