import {Component, Input} from '@angular/core';
import {Job} from "../../../../models/system/job.model";

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent {
  @Input() job: Job
}
