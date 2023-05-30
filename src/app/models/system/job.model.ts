export interface Job {
  id: string;
  createDate?: Date;
  updateDate?: Date;
  type: JobType | string;
  status: JobStatus | string;
  results?: JobResult[];
}

export interface JobResult {
  id?: string;
  createDate?: Date;
  updateDate?: Date;
  data: any;
  type?: string;
}

export enum JobType {
  TAROT_FUTURE_TELL = 'TAROT_FUTURE_TELL',
}

export enum JobStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}
