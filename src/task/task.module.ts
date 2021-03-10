import { Module } from '@nestjs/common';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskStatusPipe],
})
export class TaskModule {}
