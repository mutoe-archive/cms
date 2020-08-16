import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthRO } from 'src/auth/ro/auth.ro'
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
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register', operationId: 'register' })
  @ApiCreatedResponse({ type: AuthRO })
  @ApiBadRequestResponse()
  async register (@Body() registerDto: RegisterDto): Promise<AuthRO> {
    const userProfile = await this.authService.register(registerDto)
    return {
      user: userProfile,
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login', operationId: 'login' })
  @ApiOkResponse({ type: AuthRO })
  @ApiBadRequestResponse()
  async login (@Body() loginDto: LoginDto): Promise<AuthRO> {
    const userProfile = await this.authService.login(loginDto)
    return {
      user: userProfile,
    }
  }
}
