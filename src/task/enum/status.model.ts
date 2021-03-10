import { EnumType, EnumBuilder } from 'src/common/enum-utils';

const TASK_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export type TaskStatusType = EnumType<typeof TASK_STATUS>;
export const TaskStatusEnum = EnumBuilder(TASK_STATUS);
