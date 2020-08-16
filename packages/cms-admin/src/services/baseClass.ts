export class AuthData {
  /** bio */
  bio = '';

  /** createdAt */
  createdAt = '';

  /** email */
  email = '';

  /** id */
  id = undefined;

  /** image */
  image = '';

  /** token */
  token = '';

  /** updatedAt */
  updatedAt = '';

  /** username */
  username = '';
}

export class AuthRO {
  /** user */
  user = new AuthData();
}

export class LoginDto {
  /** email */
  email = '';

  /** password */
  password = '';
}

export class RegisterDto {
  /** email */
  email = '';

  /** password */
  password = '';

  /** username */
  username = '';
}
