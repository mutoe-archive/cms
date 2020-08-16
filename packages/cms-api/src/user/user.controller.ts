import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserEntity } from 'src/user/user.entity'

@Controller('user')
@ApiTags('User')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ operationId: 'profile' })
  @Get('/')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async profile (@Request() req): Promise<UserEntity> {
    return req.user
  }
}
