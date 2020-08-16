import { ApiProperty } from '@nestjs/swagger'

export class AuthData {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'foo@example.com' })
  email: string

  @ApiProperty({ example: 'foo' })
  username: string

  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  createdAt: string

  @ApiProperty({ example: '2020-08-16T00:04:59.343Z' })
  updatedAt: string

  @ApiProperty({ example: null })
  bio?: string

  @ApiProperty({ example: 'https://picsum.photos/200' })
  image?: string

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiZm9vQGV4YW1wbGUuY29tIiwiaWF0IjoxNTk3NTY1MDk5fQ.qRFuw88Zw7l5KY3TSuyr8hpan0fzH9HcDtkKYrLvQRQ' })
  token: string
}

export class AuthRO {
  @ApiProperty()
  user: AuthData
}
