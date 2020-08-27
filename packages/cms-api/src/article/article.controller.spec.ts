import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleController } from 'src/article/article.controller'
import { ArticleEntity } from 'src/article/article.entity'
import { ArticleService } from 'src/article/article.service'
import { AuthModule } from 'src/auth/auth.module'
import { UserEntity } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

describe('Post Controller', () => {
  let controller: ArticleController
  let userService: UserService
  let articleService: ArticleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        UserService,
        ArticleService,
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(ArticleEntity), useValue: {} },
      ],
    }).compile()

    controller = module.get<ArticleController>(ArticleController)
    userService = module.get(UserService)
    articleService = module.get(ArticleService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('article', () => {
    it('should got article ro when create article given a valid article form and logged user', async () => {
      jest.spyOn(userService, 'findUser')
        .mockResolvedValue({ id: 1, username: 'mutoe', email: 'mutoe@foxmail.com' } as any)
      jest.spyOn(articleService, 'createArticle')
        .mockResolvedValue({ id: 1, content: 'bar', title: 'foo', user: { id: 1 } } as any)

      const articleRo = await controller.createArticle({
        user: {
          userId: 1,
          email: 'mutoe@foxmail.com',
        },
      }, { title: 'foo', content: 'bar' })

      expect(articleRo).toEqual({
        id: 1,
        title: 'foo',
        content: 'bar',
        user: { id: 1 },
      })
    })
  })
})
