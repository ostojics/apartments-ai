import {Injectable} from '@nestjs/common';
import {IJWTService, JwtPayload} from '../../application/jwt/jwt.service.interface';
import {ConfigService} from '@nestjs/config';
import {verifyToken} from '@clerk/backend';

@Injectable()
export class ClerkJWTService implements IJWTService {
  private jwtKey: string;
  private secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.getOrThrow<string>('CLERK_SECRET_KEY');
    this.jwtKey = this.configService.getOrThrow<string>('CLERK_JWT_KEY');
  }

  async verifyJwtToken<T = JwtPayload>(token: string): Promise<T> {
    const result = await verifyToken(token, {jwtKey: this.jwtKey, secretKey: this.secretKey});

    return result as T;
  }
}
