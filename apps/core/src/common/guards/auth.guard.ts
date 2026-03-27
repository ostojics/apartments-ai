import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {IJWTService, JwtPayload} from 'src/modules/shared/application/jwt/jwt.service.interface';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    @Inject(JWT_SERVICE) private readonly jwtService: IJWTService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/dot-notation
    const token: string | undefined = request.cookies['__session'];

    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    try {
      const payload = await this.jwtService.verifyJwtToken<JwtPayload>(token);
      request.userId = payload.sub;
    } catch (error) {
      this.logger.warn('AuthGuard: JWT verification failed', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw new UnauthorizedException('Invalid authentication token');
    }

    return true;
  }
}
