import {JwtSignOptions, JwtVerifyOptions} from '@nestjs/jwt';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SignOptions extends JwtSignOptions {}

export interface JwtPayload {
  sub: string;
  email: string;
  iss: string;
  purpose?: string;
  iat: number;
  exp: number;
}

export interface IJwtService {
  /**
   * Signs a payload and returns a JWT token
   * @param payload - The data to encode in the token
   * @param options - Optional signing options (e.g., expiresIn)
   * @returns A promise that resolves to the signed JWT token
   */
  signAsync(payload: object | Buffer<ArrayBufferLike>, options?: SignOptions): Promise<string>;

  /**
   * Verifies a JWT token and returns the decoded payload
   * @param token - The JWT token to verify
   * @param options - Optional verification options
   * @returns A promise that resolves to the decoded payload
   * @throws Error if the token is invalid or expired
   */
  verifyAsync<T extends object>(token: string, options?: JwtVerifyOptions): Promise<T>;

  /**
   *
   * @param userId
   * @param userEmail
   * @returns JWT token as string
   */
  craftJwt(userId: string, userEmail: string): Promise<string>;
}
