export interface JwtPayload {
  sub: string;
  email: string;
  iss: string;
  purpose?: string;
  iat: number;
  exp: number;
}

export interface IJWTService {
  verifyJwtToken<T>(token: string): Promise<T>;
}
