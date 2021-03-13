import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { generateSalt, hashPassword } from '../utils/user.utils';
import { UnauthorizedException } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ username });
  }

  async saveUser(authCredentials: AuthCredentialsDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.username = authCredentials.username;
    newUser.salt = await generateSalt();
    newUser.password = await hashPassword(
      authCredentials.password,
      newUser.salt,
    );
    return await newUser.save();
  }

  async validateUser(authCredentials: AuthCredentialsDto): Promise<UserEntity> {
    const user = await this.getUserByUsername(authCredentials.username);
    if (
      !user ||
      user.password !==
        (await hashPassword(authCredentials.password, user.salt))
    )
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
