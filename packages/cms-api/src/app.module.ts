import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'src/app.controller'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
})
export class AppModule {}
