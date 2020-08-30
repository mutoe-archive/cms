import { Body, Controller, Post, Request } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { UseJwtGuards } from 'src/app/guards'
import { ArticleService } from 'src/article/article.service'
import { CreateArticleDto } from 'src/article/dto/createArticleDto'
import { ArticleRo } from 'src/article/ro/articleRo'
import { AuthRequest } from 'src/auth/jwt.strategy'
import { UserService } from 'src/user/user.service'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor (
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
  ) {}

  @UseJwtGuards()
  @Post('/')
  @ApiOperation({ operationId: 'createPost', summary: 'Create article' })
  @ApiCreatedResponse({ type: ArticleRo })
  @ApiUnprocessableEntityResponse()
  async createArticle (@Request() { user }: AuthRequest, @Body() createArticleDto: CreateArticleDto): Promise<ArticleRo> {
    const userEntity = await this.userService.findUser({ id: user.userId }, true)
    return await this.articleService.createArticle(userEntity, createArticleDto)
  }
}
