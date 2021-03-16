import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './data-access/user.entity';
import { UserRepository } from './data-access/user.repository';
import { AuthorizationFilter } from './filters/authorization.filter';
import { AuthConfigService } from './config/auth-config.service';
import { AuthConfig, authConfigLoader } from './config/auth-config.loader';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(authConfigLoader),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const authConfig = config.get<AuthConfig>('authConfig');
        return {
          secret: authConfig.jwtSecret,
          signOptions: {
            expiresIn: authConfig.jwtExpiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  providers: [AuthConfigService, AuthService, AuthorizationFilter],
  controllers: [AuthController],
  exports: [AuthorizationFilter, PassportModule],
})
export class AuthModule {}
