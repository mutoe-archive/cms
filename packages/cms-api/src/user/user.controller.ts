import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { ProfileRo } from 'src/user/ro/profile.ro'
import { UserService } from 'src/user/user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @ApiOperation({ operationId: 'profile' })
  @ApiOkResponse({ type: ProfileRo })
  @ApiUnauthorizedResponse()
  async profile (@Request() { user }: AuthRequest): Promise<ProfileRo> {
    return await this.userService.findUser({ id: user.userId })
  }
}
