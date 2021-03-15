import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';
import { TaskEntity } from './data-access/task.entity';
import { TaskRepository } from './data-access/task.repository';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, TaskRepository]),
    LoggerModule,
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskStatusPipe, TaskService],
})
export class TaskModule {}
