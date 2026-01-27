import {ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';
import {AppConfig, AppConfigName} from 'src/config/app.config';
import {GlobalConfig} from 'src/config/config.interface';
import {ApiKeyGuard} from './api-key.guard';

const createConfigService = (enableGuard: boolean, apiKey: string) => {
  const service = {
    getOrThrow: jest.fn(),
  } as unknown as ConfigService<GlobalConfig>;

  (service.getOrThrow as jest.Mock).mockImplementation((key: string) => {
    if (key === AppConfigName) {
      return {
        enableApiKeyGuard: enableGuard,
        apiKey,
      } as AppConfig;
    }
    throw new Error(`Unknown config key: ${key}`);
  });

  return service;
};

const buildContext = (headers: Record<string, string | string[]>): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({headers}) as Request,
    }),
  }) as ExecutionContext;

describe('ApiKeyGuard', () => {
  describe('when guard is disabled', () => {
    it('allows request without api key', () => {
      const configService = createConfigService(false, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({});

      expect(guard.canActivate(context)).toBe(true);
    });

    it('allows request with incorrect api key', () => {
      const configService = createConfigService(false, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({'x-api-key': 'wrong-key'});

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('when guard is enabled', () => {
    it('allows request with correct api key', () => {
      const configService = createConfigService(true, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({'x-api-key': 'secret-key'});

      expect(guard.canActivate(context)).toBe(true);
    });

    it('throws UnauthorizedException when api key is missing', () => {
      const configService = createConfigService(true, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({});

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow('API key is required');
    });

    it('throws UnauthorizedException when api key is incorrect', () => {
      const configService = createConfigService(true, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({'x-api-key': 'wrong-key'});

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow('Invalid API key');
    });

    it('handles api key as array (multiple headers with same name)', () => {
      const configService = createConfigService(true, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({'x-api-key': ['secret-key', 'other-value']});

      expect(guard.canActivate(context)).toBe(true);
    });

    it('rejects when first api key in array is incorrect', () => {
      const configService = createConfigService(true, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({'x-api-key': ['wrong-key', 'secret-key']});

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });
  });

  describe('config service integration', () => {
    it('calls getOrThrow with correct config name', () => {
      const configService = createConfigService(true, 'secret-key');
      const guard = new ApiKeyGuard(configService);
      const context = buildContext({'x-api-key': 'secret-key'});

      guard.canActivate(context);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(configService.getOrThrow).toHaveBeenCalledWith(AppConfigName);
    });
  });
});
