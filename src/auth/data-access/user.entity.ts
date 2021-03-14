import { TaskEntity } from '../../task/data-access/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('USER')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'USERNAME' })
  username: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @Column({ name: 'SALT' })
  salt: string;

  @OneToMany(() => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];
}
