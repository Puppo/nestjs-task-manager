import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTaskDto } from './dto/create-task.model';
import { TaskDto } from './dto/task.model';
import { UpdateTaskDto } from './dto/update-task.model';
import { TaskStatusEnum, TaskStatusType } from './enum/status.model';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  list(pagination: PaginationQueryDto | null): Promise<TaskDto[]> {
    const { offset, limit } = pagination || {
      offset: 0,
      limit: this.tasks.length,
    };
    const result = this.tasks.slice(offset, offset + limit);
    return Promise.resolve(result);
  }

  getById(id: number): Promise<TaskDto> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException();
    return Promise.resolve(task);
  }

  insert(createTask: CreateTaskDto): Promise<TaskDto> {
    const newTask = {
      id: this.tasks.length + 1,
      name: createTask.name,
      note: createTask.note,
      status: TaskStatusEnum.IN_PROGRESS.value,
    };
    this.tasks.push(newTask);
    return Promise.resolve(newTask);
  }

  update(id: number, updateTask: UpdateTaskDto): Promise<TaskDto> {
    const taskIdx = this.tasks.findIndex((t) => t.id === id);
    if (taskIdx === -1) throw new NotFoundException();
    const task = this.tasks[taskIdx];
    const newUpdateTask: TaskDto = {
      ...task,
      ...updateTask,
    };
    this.tasks.splice(taskIdx, 1, newUpdateTask);
    return Promise.resolve(newUpdateTask);
  }

  updateStatus(id: number, status: TaskStatusType): Promise<TaskDto> {
    const taskIdx = this.tasks.findIndex((t) => t.id === id);
    if (taskIdx === -1) throw new NotFoundException();
    const task = this.tasks[taskIdx];
    const newUpdateTask: TaskDto = {
      ...task,
      status,
    };
    this.tasks.splice(taskIdx, 1, newUpdateTask);
    return Promise.resolve(newUpdateTask);
  }
}
