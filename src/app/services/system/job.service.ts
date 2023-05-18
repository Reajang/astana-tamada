import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../../models/system/job.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {


  constructor(private http$: HttpClient) {
  }

  get = (jobId: string): Observable<Job> => {
    return this.http$.get<Job>(
      `/api/job/get/${jobId}`,
      {
        observe: 'body',
        responseType: 'json',
      }
    );
  }
}
