import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import {Job} from "../../models/system/job.model";
import {WebSocketServiceService} from "./web-socket-service.service";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http$: HttpClient,
    private wsService: WebSocketServiceService,
  ) {
  }

  get = (jobId: string): Observable<Job> => {
    return this.http$.get<Job>(
      `/api/job/get/${jobId}`,
    );
  }

  connect(): Subject<Job> {
    return <Subject<Job>>(this.wsService.connect()
        .pipe(
          map((response: MessageEvent): Job => {
            return JSON.parse(response.data);
          })
        )
    );
  }

  disconnect() {
    this.wsService.disconnect();
  }
}
