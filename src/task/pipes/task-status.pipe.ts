import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatusEnum, TaskStatusType } from '../enum/status.model';

@Injectable()
export class TaskStatusPipe implements PipeTransform {
  transform(value: unknown): TaskStatusType {
    if (TaskStatusEnum.ensureEnum(value)) {
      return value;
    }
    throw new BadRequestException(`Task Status ${value} is not correct`);
  }
}
