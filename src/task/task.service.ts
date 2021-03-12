import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
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

  private tasks: TaskDto[] = [];

  async list(
    filter: FilteredTaskDto,
    pagination: PaginationQueryDto,
  ): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.getFilteredTask(filter, pagination);
    return tasks.map(this.mapEntityToDto);
  }

  async getById(id: number): Promise<TaskDto> {
    return this.mapEntityToDto(await this.taskRepository.getById(id));
  }

  async insert(createTask: CreateTaskDto): Promise<TaskDto> {
    return this.mapEntityToDto(
      await this.taskRepository.createTask(createTask),
    );
  }

  async update(id: number, updateTask: UpdateTaskDto): Promise<TaskDto> {
    return this.mapEntityToDto(
      await this.taskRepository.updateTask(id, updateTask),
    );
  }

  async updateStatus(id: number, status: TaskStatusType): Promise<TaskDto> {
    return this.mapEntityToDto(
      await this.taskRepository.updateStatus(id, status),
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
