export interface AuthData {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  bio?: string;
  image?: string;
  token: string;
  // password?: never;
}

export interface AuthRO {
  user: AuthData;
}
