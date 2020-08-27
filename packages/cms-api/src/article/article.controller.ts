import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
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

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @ApiOperation({ operationId: 'createPost', summary: 'Create article' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ArticleRo })
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  async createArticle (@Request() { user }: AuthRequest, @Body() createArticleDto: CreateArticleDto): Promise<ArticleRo> {
    const userEntity = await this.userService.findUser({ id: user.userId }, true)
    return await this.articleService.createArticle(userEntity, createArticleDto)
  }
}
