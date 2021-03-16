import { Inject, Injectable } from '@nestjs/common';

import { AUTH_CONFIG_KEY, AuthConfig } from './auth-config.loader';

@Injectable()
export class AuthConfigService {
  constructor(
    @Inject(AUTH_CONFIG_KEY) public readonly authConfig: AuthConfig,
  ) {}

  get jwtSecret(): string {
    return this.authConfig.jwtSecret;
  }

  get jwtExpiresIn(): string | number {
    return this.authConfig.jwtExpiresIn;
  }
}
