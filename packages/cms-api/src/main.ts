import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from 'src/app.module'
import { NEST_PORT, SWAGGER_ENABLE } from 'src/config'
import { FormException } from 'src/exception'
import { version } from '../package.json'

function createSwagger (app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('CMS')
    .setVersion(version)
    .addBearerAuth()
    .addTag('App', 'Application')
    .addTag('Auth', 'Authorization')
    .addTag('User', 'User')
    .addTag('Article', 'Article')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)
}

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory: errors => {
      const errorEntries = errors.map(error => [error.property, Object.keys(error.constraints)])
      return new FormException(Object.fromEntries(errorEntries))
    },
    transform: true,
  }))
  app.setGlobalPrefix('/api')

  if (SWAGGER_ENABLE) {
    createSwagger(app)
  }

  await app.listen(NEST_PORT)
}

bootstrap().catch(err => console.error(err))
