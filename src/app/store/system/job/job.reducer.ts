import {createReducer, on} from "@ngrx/store";
import * as JobActions from "../job/job.actions";
import {Job} from "../../../models/system/job.model";

export const jobFeatureKey = 'jobFeatureKey';

export interface JobState {
  trackedJobs: Map<string, Job>,
}

export const initialState: JobState = {
  trackedJobs: new Map(),
};

export const jobReducer = createReducer(
  initialState,

  on(JobActions.setJob, (state, {job}) => {
    const trackedJobs: Map<string, Job> = state.trackedJobs;
    trackedJobs.set(job.id, job);
    return {
      ...state,
      trackedJobs,
    }
  }),
);
