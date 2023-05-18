export interface Job {
  id: string;
  createDate: Date;
  updateDate: Date;
  type: JobType | string;
  status: JobStatus | string;
}

export enum JobType {
  TAROT_FUTURE_TELL
}

export enum JobStatus {
  IDLE,
  RUNNING,
  COMPLETE,
  ERROR,
}
