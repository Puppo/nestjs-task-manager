import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/data-access/user.entity';
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

  @ManyToOne(() => UserEntity, (task) => task.tasks, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
