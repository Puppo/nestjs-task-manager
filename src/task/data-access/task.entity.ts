import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusType } from '../enum/status.model';

@Entity({
  name: 'TASKS',
})
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'NOTE', nullable: true })
  note: string;

  @Column({ name: 'STATUS' })
  status: TaskStatusType;
}
