import { TaskStatusType, TaskStatusEnum } from '../enum/status.model';
import { IsIn, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class TaskDto {
  @IsPositive()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  note?: string;

  @IsNotEmpty()
  @IsIn(TaskStatusEnum.values)
  status: TaskStatusType;
}
