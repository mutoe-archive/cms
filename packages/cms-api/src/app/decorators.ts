import { ApiOkResponse, ApiQuery, ApiResponseMetadata } from '@nestjs/swagger'

export function ApiListResponse (type: ApiResponseMetadata['type']): MethodDecorator {
  const pageQueryDecorator = ApiQuery({ name: 'page', example: 1, required: false })
  const limitQueryDecorator = ApiQuery({ name: 'limit', example: 10, required: false })
  const okResponseDecorator = ApiOkResponse({ type })
  return (...args) => {
    pageQueryDecorator(...args)
    limitQueryDecorator(...args)
    okResponseDecorator(...args)
  }
}
