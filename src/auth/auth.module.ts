import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './data-access/user.entity';
import { UserRepository } from './data-access/user.repository';
import { AuthorizationFilter } from './filters/authorization.filter';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  providers: [AuthService, AuthorizationFilter],
  controllers: [AuthController],
  exports: [AuthorizationFilter, PassportModule],
})
export class AuthModule {}
