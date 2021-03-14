import { NotFoundException } from '@nestjs/common';
import { User } from '../../auth/decorator/user.decorator';
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
    user: User,
    filter: FilteredTaskDto,
    pagination: PaginationQueryDto,
  ): Promise<TaskEntity[]> {
    const queryBuilder = this.createQueryBuilder('task');
    queryBuilder.where('task.userId = :userId', { userId: user.getUser().id });

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

    return await queryBuilder.getMany();
  }

  async getById(user: User, id: number): Promise<TaskEntity> {
    const task = await this.findOne({ id, user: user.getUser() });
    if (!task) throw new NotFoundException();
    return task;
  }

  async createTask(user: User, createTask: CreateTaskDto) {
    const newTask = new TaskEntity();
    newTask.name = createTask.name;
    newTask.note = createTask.note || null;
    newTask.status = TaskStatusEnum.IN_PROGRESS.value;
    newTask.user = user.getUser();
    return await newTask.save();
  }

  async updateTask(
    user: User,
    id: number,
    updateTask: UpdateTaskDto,
  ): Promise<TaskEntity> {
    const task = await this.getById(user, id);
    task.name = updateTask.name;
    task.note = updateTask.note || null;
    return await task.save();
  }

  async updateStatus(
    user: User,
    id: number,
    status: TaskStatusType,
  ): Promise<TaskEntity> {
    const task = await this.getById(user, id);
    task.status = status;
    return await task.save();
  }
}
