import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from 'src/user/user.entity'

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async profile (@Request() req): Promise<UserEntity> {
    return req.user
  }
}
