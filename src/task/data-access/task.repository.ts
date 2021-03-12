import { NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.model';
import { FilteredTaskDto } from '../dto/filtered-task.model';
import { UpdateTaskDto } from '../dto/update-task.model';
import { TaskStatusEnum, TaskStatusType } from '../enum/status.model';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getFilteredTask(
    filter: FilteredTaskDto,
    pagination: PaginationQueryDto,
  ): Promise<TaskEntity[]> {
    const queryBuilder = this.createQueryBuilder('task');

    if (filter) {
      const { status, search } = filter;
      if (status) {
        queryBuilder.andWhere('task.STATUS = :status', { status });
      }
      if (search) {
        queryBuilder.andWhere(
          '(task.NAME LIKE :search OR task.NOTE LIKE :search)',
          { search: `%${search}%` },
        );
      }
    }

    if (pagination) {
      const { offset, limit } = pagination;
      if (offset) {
        queryBuilder.skip(offset);
      }
      if (limit) {
        queryBuilder.take(limit);
      }
    }

    return await queryBuilder.execute();
  }

  async getById(id: number): Promise<TaskEntity> {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  async createTask(createTask: CreateTaskDto) {
    const newTask = new TaskEntity();
    newTask.name = createTask.name;
    newTask.note = createTask.note || null;
    newTask.status = TaskStatusEnum.IN_PROGRESS.value;
    return await newTask.save();
  }

  async updateTask(id: number, updateTask: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.getById(id);
    task.name = updateTask.name;
    task.note = updateTask.note || null;
    return await task.save();
  }

  async updateStatus(id: number, status: TaskStatusType): Promise<TaskEntity> {
    const task = await this.getById(id);
    task.status = status;
    return await task.save();
  }
}
