import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { DB_CONFIG } from './database/db-config';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres', // type of our database
        host: DB_CONFIG.host, // database host
        port: DB_CONFIG.port, // database host
        username: DB_CONFIG.username, // username
        password: DB_CONFIG.password, // user password
        database: DB_CONFIG.database, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
        synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
      }),
    }),
    LoggerModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
