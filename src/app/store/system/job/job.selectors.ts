import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromJobReducer from './job.reducer'

export const selectJobState =
  createFeatureSelector<fromJobReducer.JobState>(
    fromJobReducer.jobFeatureKey
  );

export const selectJob = (jobId: string) => {
  return createSelector(
    selectJobState,
    state => state.trackedJobs.get(jobId),
  );
}
