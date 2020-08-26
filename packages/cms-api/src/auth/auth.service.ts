import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { omit } from 'lodash'
import { LoginDto } from 'src/auth/dto/login.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { AuthRo } from 'src/auth/ro/auth.ro'
import { FormException } from 'src/exception'
import { UserSafeEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { cryptoPassword } from 'src/utils'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register (registerDto: RegisterDto): Promise<AuthRo> {
    let user: UserSafeEntity
    user = await this.userService.findUser({ username: registerDto.username })
    if (user?.id) {
      throw new FormException({ username: 'username is exist' })
    }
    user = await this.userService.findUser({ email: registerDto.email })
    if (user?.id) {
      throw new FormException({ email: 'email is exist' })
    }
    const profile = await this.userService.createUser(registerDto)
    const token = this.generateToken(profile.id, profile.email)
    return { ...profile, token }
  }

  async login (loginDto: LoginDto): Promise<AuthRo> {
    const profile = await this.validateUser(loginDto.username, loginDto.password)
    const token = this.generateToken(profile.id, profile.email)
    return { ...profile, token }
  }

  async validateUser (username: string, password: string): Promise<UserSafeEntity> {
    const user = await this.userService.findUser({ username }, true)
    if (!user) {
      throw new FormException({ username: 'user is not exist' })
    }
    if (user.password !== cryptoPassword(password)) {
      throw new FormException({ password: 'password is invalid' })
    }
    return omit(user, 'password')
  }

  generateToken (userId: number, email: string): string {
    return this.jwtService.sign({ userId, email })
  }
}
