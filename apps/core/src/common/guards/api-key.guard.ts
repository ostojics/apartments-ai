import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';
import {AppConfig, AppConfigName} from 'src/config/app.config';
import {GlobalConfig} from 'src/config/config.interface';

/**
 * API Key Guard
 *
 * Validates the x-api-key header against the configured API_KEY from environment.
 * Can be enabled/disabled via ENABLE_API_KEY_GUARD environment variable.
 *
 * Usage:
 * - Apply to controllers: @UseGuards(ApiKeyGuard)
 * - Apply to specific routes: @UseGuards(ApiKeyGuard) above route handler
 *
 * Environment Variables:
 * - API_KEY: The secret key to validate against
 * - ENABLE_API_KEY_GUARD: Set to "true" to enable guard, defaults to false
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<GlobalConfig>) {}

  canActivate(context: ExecutionContext): boolean {
    const appConfig = this.configService.getOrThrow<AppConfig>(AppConfigName);

    // If guard is disabled, allow all requests
    if (!appConfig.enableApiKeyGuard) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.headers['x-api-key'];

    // API key must be present
    if (!apiKeyHeader) {
      throw new UnauthorizedException('API key is required');
    }

    const providedKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

    // Validate against configured API key
    if (providedKey !== appConfig.apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
