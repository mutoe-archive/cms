import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleController } from 'src/article/article.controller'
import { ArticleEntity } from 'src/article/article.entity'
import { ArticleService } from 'src/article/article.service'
import { CreateArticleDto } from 'src/article/dto/createArticleDto'
import { AuthPayload } from 'src/auth/jwt.strategy'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'

describe('Article Controller', () => {
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
    const user: AuthPayload = { userId: 1, email: 'mutoe@foxmail.com' }
    const articleDto = { title: 'foo', content: 'bar' }

    it('should got article ro when create article given a valid article form and logged user', async () => {
      jest.spyOn(userService, 'findUser').mockResolvedValue(user as any)
      jest.spyOn(articleService, 'createArticle')
        .mockResolvedValue({ id: 1, ...articleDto, user } as any)

      const articleRo = await controller.createArticle({ user }, articleDto)

      expect(articleRo).toEqual({
        id: 1,
        ...articleDto,
        user,
      })
    })
  })
})
