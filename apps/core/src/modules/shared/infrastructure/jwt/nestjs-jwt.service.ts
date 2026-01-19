import {Injectable, Inject} from '@nestjs/common';
import {JwtService, JwtSignOptions, JwtVerifyOptions} from '@nestjs/jwt';
import {IJwtService} from '../../application/jwt/jwt.interface';
import {ConfigService} from '@nestjs/config';
import {AppConfig, AppConfigName} from 'src/config/app.config';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {IAnalyticsService} from '../../application/analytics/analytics.interface';
import {ANALYTICS_SERVICE} from '../../application/analytics/di-tokens';

@Injectable()
export class NestJsJwtService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
    private readonly configService: ConfigService,
    @Inject(ANALYTICS_SERVICE) private readonly analyticsService: IAnalyticsService,
  ) {}

  async signAsync(payload: object | Buffer<ArrayBufferLike>, options?: JwtSignOptions): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, options);
    } catch (error) {
      this.logger.error('Failed to sign JWT token', error);
      this.analyticsService.captureException(error as Error, 'system', {context: 'JWT Signing'});
      throw error;
    }
  }

  async verifyAsync<T extends object>(token: string, options?: JwtVerifyOptions): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, options);
    } catch (error) {
      this.logger.error('Failed to verify JWT token', error);
      this.analyticsService.captureException(error as Error, 'system', {context: 'JWT Verification'});
      throw error;
    }
  }

  async craftJwt(userId: string, userEmail: string): Promise<string> {
    const appConfig = this.configService.getOrThrow<AppConfig>(AppConfigName);
    const payload = {
      sub: userId,
      email: userEmail,
      iss: appConfig.url,
    };

    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
