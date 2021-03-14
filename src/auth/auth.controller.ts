import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserEntity } from './data-access/user.entity';
import { GetUser } from './decorator/user.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthTokenDto } from './dto/auth-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    try {
      await this.authService.signUp(authCredentials);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Post('signin')
  async signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<AuthTokenDto> {
    try {
      return this.authService.signIn(authCredentials);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: UserEntity) {
    console.log(user);
  }
}
