import {Global, Module} from '@nestjs/common';
import {ANALYTICS_SERVICE} from './application/analytics/di-tokens';
import {PostHogAnalyticsService} from './infrastructure/analytics/posthog.analytics.service';
import {JWT_SERVICE} from './application/jwt/di-tokens';
import {NestJsJwtService} from './infrastructure/jwt/nestjs-jwt.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {AppConfig, AppConfigName} from 'src/config/app.config';
import {UNIT_OF_WORK} from 'src/libs/application/ports/unit-of-work.port';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';
import {HASHING_SERVICE} from './application/hashing/hashing.interface';
import {Argon2HashingService} from './infrastructure/hashing/argon2-hashing.service';
import {BullModule} from '@nestjs/bullmq';
import {GlobalConfig} from 'src/config/config.interface';
import {QueuesConfig, QueuesConfigName} from 'src/config/queues.config';
import {Queues} from 'src/common/enums/queues.enum';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {PinoLoggerAdapter} from 'src/libs/infrastructure/logger/nestjs-logger.adapter';
import {EMAIL_SERVICE} from './application/emails/di-tokens';
import {ResendEmailService} from './infrastructure/emails/resend.email.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      // @ts-expect-error -- @nestjs/jwt types are incorrect
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.getOrThrow<AppConfig>(AppConfigName);

        return {
          secret: appConfig.jwtSecret,
          signOptions: {expiresIn: appConfig.jwtExpiry},
        };
      },
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => {
        const config = configService.getOrThrow<QueuesConfig>(QueuesConfigName);

        return {
          connection: {
            host: config.redisHost,
            port: config.redisPort,

            password: config.redisPassword ?? undefined,
          },
          defaultJobOptions: {
            removeOnComplete: {age: 3600, count: 1000}, // Keep last 1000 or 1 hour
            removeOnFail: {age: 172800}, // Keep failed jobs for 48 hours (172800 seconds)
          },
        };
      },
    }),
    BullModule.registerQueue(
      {name: Queues.EMAILS},
      {name: Queues.AI_TRANSACTIONS},
      {name: Queues.SCHEDULED_TRANSACTIONS},
    ),
  ],
  providers: [
    {provide: ANALYTICS_SERVICE, useClass: PostHogAnalyticsService},
    {provide: JWT_SERVICE, useClass: NestJsJwtService},
    {provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork},
    {provide: HASHING_SERVICE, useClass: Argon2HashingService},
    {provide: LOGGER, useClass: PinoLoggerAdapter},
    {provide: EMAIL_SERVICE, useClass: ResendEmailService},
  ],
  exports: [ANALYTICS_SERVICE, JWT_SERVICE, UNIT_OF_WORK, HASHING_SERVICE, LOGGER],
})
export class SharedModule {}
