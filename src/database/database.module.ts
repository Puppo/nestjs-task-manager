import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectionOptions, createConnection } from 'typeorm';
import dbConfigLoader from './config/db-config.loader';
import { DbConfigService } from './config/db-config.service';

@Module({
  imports: [ConfigModule.forFeature(dbConfigLoader)],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}
