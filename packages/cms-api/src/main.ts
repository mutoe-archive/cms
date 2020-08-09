import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from 'src/app.module'

function createSwagger (app: INestApplication) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const version = require('../package.json').version || ''

  const options = new DocumentBuilder()
    .setTitle('CMS')
    .setVersion(version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)
}

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (process.env.SWAGGER_ENABLE && process.env.SWAGGER_ENABLE === 'true') {
    createSwagger(app)
  }

  await app.listen(3000)
}

bootstrap().catch(err => console.error(err))
