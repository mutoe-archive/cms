import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { ApiListResponse } from 'src/app/decorators'
import { UseJwtGuards } from 'src/app/guards'
import { PaginationRo } from 'src/app/paginate'
import { ArticleEntity } from 'src/article/article.entity'
import { ArticleService } from 'src/article/article.service'
import { CreateArticleDto } from 'src/article/dto/createArticleDto'
import { ArticlesRo } from 'src/article/ro/articles.ro'
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
  @ApiOperation({ operationId: 'createArticle', summary: 'Create article' })
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiUnprocessableEntityResponse()
  async createArticle (@Request() { user }: AuthRequest, @Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const userEntity = await this.userService.findUser({ id: user.userId }, true)
    return await this.articleService.createArticle(userEntity, createArticleDto)
  }

  @Get('/')
  @ApiOperation({ operationId: 'retrieveArticles', summary: 'Retrieve articles' })
  @ApiListResponse(ArticlesRo)
  async retrieveArticles (
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PaginationRo<ArticleEntity>> {
    return await this.articleService.retrieveArticles({ page, limit })
  }
}
