import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { omit } from 'lodash'
import { AuthPayload } from 'src/auth/jwt.strategy'
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
  async profile (@Request() req: {user: AuthPayload}): Promise<ProfileRo> {
    const { user } = req
    const profile = await this.userService.findUser({ email: user.email })
    return omit(profile, 'password')
  }
}
