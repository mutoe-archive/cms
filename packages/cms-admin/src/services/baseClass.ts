export class ArticleRo {
  /** content */
  content = ''

  /** createdAt */
  createdAt = ''

  /** id */
  id = undefined

  /** title */
  title = ''

  /** updatedAt */
  updatedAt = ''

  /** user */
  user = new UserEntity()
}

export class AuthRo {
  /** bio */
  bio = ''

  /** createdAt */
  createdAt = ''

  /** email */
  email = ''

  /** id */
  id = undefined

  /** image */
  image = ''

  /** token */
  token = ''

  /** updatedAt */
  updatedAt = ''

  /** username */
  username = ''
}

export class CreateArticleDto {
  /** content */
  content = ''

  /** title */
  title = ''
}

export class LoginDto {
  /** password */
  password = ''

  /** username */
  username = ''
}

export class ProfileRo {
  /** bio */
  bio = ''

  /** createdAt */
  createdAt = ''

  /** email */
  email = ''

  /** id */
  id = undefined

  /** image */
  image = ''

  /** updatedAt */
  updatedAt = ''

  /** username */
  username = ''
}

export class RegisterDto {
  /** email */
  email = ''

  /** password */
  password = ''

  /** username */
  username = ''
}

export class UserEntity {
  /** bio */
  bio = ''

  /** createdAt */
  createdAt = ''

  /** email */
  email = ''

  /** id */
  id = undefined

  /** image */
  image = ''

  /** updatedAt */
  updatedAt = ''

  /** username */
  username = ''
}
