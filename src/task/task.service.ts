import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/decorator/user.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TaskEntity } from './data-access/task.entity';
import { TaskRepository } from './data-access/task.repository';
import { CreateTaskDto } from './dto/create-task.model';
import { FilteredTaskDto } from './dto/filtered-task.model';
import { TaskDto } from './dto/task.model';
import { UpdateTaskDto } from './dto/update-task.model';
import { TaskStatusType } from './enum/status.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async list(
    user: User,
    filter: FilteredTaskDto,
    pagination: PaginationQueryDto,
  ): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.getFilteredTask(
      user,
      filter,
      pagination,
    );
    return tasks.map(this.mapEntityToDto);
  }

  async getById(user: User, id: number): Promise<TaskDto> {
    return this.mapEntityToDto(await this.taskRepository.getById(user, id));
  }

  async insert(user: User, createTask: CreateTaskDto): Promise<TaskDto> {
    return this.mapEntityToDto(
      await this.taskRepository.createTask(user, createTask),
    );
  }

  async update(
    user: User,
    id: number,
    updateTask: UpdateTaskDto,
  ): Promise<TaskDto> {
    return this.mapEntityToDto(
      await this.taskRepository.updateTask(user, id, updateTask),
    );
  }

  async updateStatus(
    user: User,
    id: number,
    status: TaskStatusType,
  ): Promise<TaskDto> {
    return this.mapEntityToDto(
      await this.taskRepository.updateStatus(user, id, status),
    );
  }

  private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
    return {
      id: taskEntity.id,
      name: taskEntity.name,
      note: taskEntity.note,
      status: taskEntity.status,
    };
  }
}
