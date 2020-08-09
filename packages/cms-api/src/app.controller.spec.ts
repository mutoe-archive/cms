import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AppController } from 'src/app.controller'
import { AuthService } from 'src/auth/auth.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile()

    appController = app.get(AppController)
  })

  describe('Hello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBe('Hello world!')
    })
  })
})
