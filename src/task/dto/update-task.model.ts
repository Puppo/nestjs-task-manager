import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  note?: string;
}
