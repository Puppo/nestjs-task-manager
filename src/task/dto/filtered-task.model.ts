import { IsIn, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum, TaskStatusType } from '../enum/status.model';

export class FilteredTaskDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsOptional()
  @IsIn(TaskStatusEnum.values)
  status: TaskStatusType;
}
