import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller('app')
@ApiTags('App')
export class AppController {
  @Get('/hello')
  @ApiOperation({ summary: 'health check', operationId: 'healthCheck' })
  @ApiQuery({ name: 'name', required: false, example: 'foo' })
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }
}
