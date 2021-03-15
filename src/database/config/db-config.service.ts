import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import dbConfig from './db-config.loader';

@Injectable()
export class DbConfigService {
  constructor(
    @Inject(dbConfig.KEY) private readonly config: ConfigType<typeof dbConfig>,
  ) {}

  get host() {
    return this.config.host;
  }

  get port() {
    return this.config.port;
  }

  get database() {
    return this.config.database;
  }

  get username() {
    return this.config.username;
  }

  get password() {
    return this.config.password;
  }
}
