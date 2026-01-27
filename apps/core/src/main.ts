import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from 'pino-nestjs';
import {VERSION_NEUTRAL, VersioningType} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ConfigService} from '@nestjs/config';
import {GlobalConfig} from './config/config.interface';
import {AppConfig, AppConfigName} from './config/app.config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import setupSwagger from './libs/swagger/setup.swagger';
import {GlobalExceptionFilter} from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {bufferLogs: true});
  const configService = app.get(ConfigService<GlobalConfig>);
  const appConfig = configService.getOrThrow<AppConfig>(AppConfigName);

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useBodyParser('json', {limit: '10mb'});
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter());
  setupSwagger(app);

  // Configure CORS with domain-based origin validation
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      const {corsAllowedOrigins, appDomain, environment} = appConfig;

      // In development, allow all origins if no specific config is set
      if (environment === 'development' && corsAllowedOrigins.length === 0 && !appDomain) {
        return callback(null, true);
      }

      // Check if origin is in the explicitly allowed list
      if (corsAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Check if origin matches the app domain or any subdomain
      if (appDomain) {
        try {
          const originUrl = new URL(origin);
          const originHost = originUrl.hostname;

          // Exact match
          if (originHost === appDomain) {
            return callback(null, true);
          }

          // Subdomain match (e.g., *.apartments.ai)
          if (originHost.endsWith(`.${appDomain}`)) {
            return callback(null, true);
          }
        } catch {
          // Invalid origin URL
          return callback(new Error('Invalid origin'), false);
        }
      }

      // Origin not allowed
      callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
  });

  const {port} = appConfig;
  await app.listen(port);
}

void bootstrap();
