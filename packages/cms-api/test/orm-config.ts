import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cms_test',
  entities: [UserEntity],
  dropSchema: true,
  synchronize: true,
}

export default ormConfig
