import { PaginationRo } from 'src/app/paginate'
import { ArticleEntity } from 'src/article/article.entity'

export class ArticlesRo extends PaginationRo(ArticleEntity) {}
