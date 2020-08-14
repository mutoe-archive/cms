import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from 'src/user/user.entity'

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async profile (@Request() req: {user: UserEntity}): Promise<UserEntity> {
    return req.user
  }
}
