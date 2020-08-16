import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { UserEntity } from 'src/user/user.entity'

@Controller('user')
@ApiTags('User')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @ApiOperation({ operationId: 'profile' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async profile (@Request() req): Promise<UserEntity> {
    return req.user
  }
}
