import {
  Body,
  Controller,
  Post,
  Param,
  Put,
  Get,
  ParseIntPipe,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser, User } from '../auth/decorator/user.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateTaskDto } from './dto/create-task.model';
import { FilteredTaskDto } from './dto/filtered-task.model';
import { TaskDto } from './dto/task.model';
import { UpdateTaskDto } from './dto/update-task.model';
import { TaskStatusType } from './enum/status.model';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(protected readonly taskService: TaskService) {}

  @Get()
  async list(
    @GetUser() user: User,
    @Query() filter: FilteredTaskDto,
    @Query() pagination: PaginationQueryDto,
  ): Promise<TaskDto[]> {
    try {
      return await this.taskService.list(user, filter, pagination);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get(':id')
  async getById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.getById(user, id);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Post()
  async insert(
    @GetUser() user: User,
    @Body()
    createTask: CreateTaskDto,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.insert(user, createTask);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Put(':id')
  async update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTask: UpdateTaskDto,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.update(user, id, updateTask);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Patch(':id/:status')
  async updateStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Param('status', TaskStatusPipe) status: TaskStatusType,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.updateStatus(user, id, status);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
