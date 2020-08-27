import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app.controller'
import { ArticleModule } from 'src/article/article.module'
import { CreateArticleDto } from 'src/article/dto/createArticleDto'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'
import * as request from 'supertest'
import { getToken } from 'test/testUtils'
import ormConfig from './orm-config'

describe('Post Module Integration', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormConfig),
        ArticleModule,
        AuthModule,
        UserModule,
      ],
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    token = await getToken(app)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/article (POST)', () => {
    const RealDate = Date

    const mockDate = (date: Date | string) => {
      (global.Date as any) = class extends RealDate {
        constructor () {
          super()
          return new RealDate(date)
        }
      }
    }

    afterEach(() => {
      (global.Date as any).Date = RealDate
    })

    it('should return 201 when create article given an valid form', async () => {
      mockDate('2017-11-25T12:34:56Z')
      const requestBody: CreateArticleDto = {
        title: 'title',
        content: '<p>I am content</p>',
      }
      const response = await request(app.getHttpServer())
        .post('/article')
        .set('Authorization', `Bearer ${token}`)
        .send(requestBody)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: 1,
        author: 'admin',
        title: 'title',
        content: '<p>I am content</p>',
        createdBy: '2017-11-25T12:34:56Z',
        updatedBy: '2017-11-25T12:34:56Z',
      })
    })
  })
})
