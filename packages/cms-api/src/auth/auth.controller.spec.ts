import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { AuthController } from './auth.controller'

describe('Auth Controller', () => {
  let controller: AuthController
  let authService: AuthService

  const mockUserProfile = {
    id: 1,
    email: 'foo@bar.com',
    createdAt: '',
    updatedAt: '',
    username: 'foo',
    bio: null,
    image: null,
    token: 'token',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get(AuthController)
    authService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('register', () => {
    it('should call register service when call register controller', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(mockUserProfile)

      const registerDto: RegisterDto = { email: 'foo@bar.com', username: 'foo', password: 'bar' }
      const user = await controller.register(registerDto)

      expect(user).not.toHaveProperty('password')
      expect(user).toEqual(mockUserProfile)
    })
  })

  describe('login', () => {
    it('should call login service when call login controller', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(mockUserProfile)

      const user = await controller.login({ username: 'admin', password: '123456' })

      expect(user).not.toHaveProperty('password')
      expect(user).toEqual(mockUserProfile)
    })
  })
})
