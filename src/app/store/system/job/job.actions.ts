import {createAction, props} from "@ngrx/store";
import {Job} from "../../../models/system/job.model";

export const getJob = createAction(
  '[Job] get Job',
  props<{ jobId: string }>(),
);

export const setJob = createAction(
  '[Job] set Job',
  props<{ job: Job }>(),
);
