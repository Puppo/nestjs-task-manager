import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

import { DatabaseModule } from './database/database.module';
import { DbConfigService } from './database/config/db-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      inject: [DbConfigService],
      useFactory: (config: DbConfigService) => ({
        type: 'postgres', // type of our database
        host: config.host, // database host
        port: config.port, // database host
        username: config.username, // username
        password: config.password, // user password
        database: config.database, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
        synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
      }),
    }),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
