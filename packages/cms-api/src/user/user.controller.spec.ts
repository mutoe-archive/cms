import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { UserController } from './user.controller'

describe('User Controller', () => {
  let controller: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('profile', () => {
    it('should get user info given a jwt token', async () => {
      jest.spyOn(userService, 'findUser').mockResolvedValue({ id: 1, username: 'admin' } as any)
      const user = await controller.profile({ user: { userId: 1, email: 'foo@bar.com' } })

      expect(user).toHaveProperty('id', 1)
      expect(user).not.toHaveProperty('password')
    })
  })
})
