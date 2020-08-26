import { cryptoPassword } from 'src/utils'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

const nullable = true

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 80 })
  email: string

  @Column({ length: 20 })
  username: string

  @Column({ length: 64, select: false })
  password: string

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword (): void {
    this.password = cryptoPassword(this.password)
  }

  @Column({ nullable, type: 'text' })
  bio?: string

  @Column({ nullable, type: 'text' })
  image?: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}

export type UserSafeEntity = Omit<UserEntity, 'password'> & { password?: never }
