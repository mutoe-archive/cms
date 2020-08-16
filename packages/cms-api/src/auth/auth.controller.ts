import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthRO } from 'src/auth/auth.interface'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'register', operationId: 'register' })
  async register (@Body() registerDto: RegisterDto): Promise<AuthRO> {
    const userProfile = await this.authService.register(registerDto)
    return {
      user: userProfile,
    }
  }

  @Post('/login')
  @ApiOperation({ summary: 'login', operationId: 'login' })
  @HttpCode(HttpStatus.OK)
  async login (@Body() loginDto: LoginDto): Promise<AuthRO> {
    const userProfile = await this.authService.login(loginDto)
    return {
      user: userProfile,
    }
  }
}
