import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Job, JobResult} from "../../models/system/job.model";
import {TarotResponse} from "../../models/tarot/tarot.model";
import * as TarotActions from "../../store/tarot/tarot.actions";
import * as HttpRequestsActions from "../../store/system/httprequeststatus/http-request-status.action";
import {LoadingStatus, HttpRequestType} from "../../store/system/httprequeststatus/http-request-status.reducer";

@Injectable({
  providedIn: 'root'
})
export class JobHandler {


  constructor(
    private store: Store,
  ) {
  }

  public processSuccessTarotAsyncResponse(job: Job) {
    // @ts-ignore
    const jobResult: JobResult = job.results[0];
    const iAlmostSureThisIsTarotResponse: TarotResponse = JSON.parse(jobResult.data)
    this.store.dispatch(TarotActions.setResponse({response: iAlmostSureThisIsTarotResponse}));
    this.store.dispatch(HttpRequestsActions.setStatus({
      updateRequest: {
        type: HttpRequestType.TAROT_REQUEST_ASYNC,
        status: LoadingStatus.SUCCESS
      }
    }))
  }

}
