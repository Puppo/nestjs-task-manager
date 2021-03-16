import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthConfigService } from '../config/auth-config.service';
import { UserRepository } from '../data-access/user.repository';
import { JwtPayload } from '../model/jwt-payload.model';

@Injectable()
export class AuthorizationFilter extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    authConfigService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfigService.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = this.userRepository.getUserByUsername(payload.username);

      if (!user) throw new UnauthorizedException();

      return user;
    } catch (ex) {
      console.error(ex);
    }
  }
}
