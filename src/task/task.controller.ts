import {
  Body,
  Controller,
  Post,
  Param,
  Put,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTaskDto } from './dto/create-task.model';
import { TaskDto } from './dto/task.model';
import { UpdateTaskDto } from './dto/update-task.model';
import { TaskStatusType } from './enum/status.model';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(protected readonly taskService: TaskService) {}

  @Get()
  async list(@Query() pagination: PaginationQueryDto): Promise<TaskDto[]> {
    try {
      return await this.taskService.list(pagination);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    try {
      return await this.taskService.getById(id);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Post()
  async insert(@Body() createTask: CreateTaskDto): Promise<TaskDto> {
    try {
      return await this.taskService.insert(createTask);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTask: UpdateTaskDto,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.update(id, updateTask);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Put(':id/:status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status', TaskStatusPipe) status: TaskStatusType,
  ): Promise<TaskDto> {
    try {
      return await this.taskService.updateStatus(id, status);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
