import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { ENTITY_ERRORS } from 'src/common/db/entity-errors';
import { UserRepository } from './data-access/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { JwtPayload } from './model/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    try {
      await this.userRepository.saveUser(authCredentials);
    } catch (ex) {
      console.error(ex);
      if (ex.code === ENTITY_ERRORS.DUPLICATE_ENTITY)
        throw new ConflictException(`User already exist`);

      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<AuthTokenDto> {
    const userEntity = await this.userRepository.validateUser(authCredentials);

    const payload: JwtPayload = {
      username: userEntity.username,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
