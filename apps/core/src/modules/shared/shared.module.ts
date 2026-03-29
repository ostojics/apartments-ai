import {Global, Module} from '@nestjs/common';
import {ANALYTICS_SERVICE} from './application/analytics/di-tokens';
import {PostHogAnalyticsService} from './infrastructure/analytics/posthog.analytics.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {appConfig, AppConfig, AppConfigName} from 'src/config/app.config';
import {UNIT_OF_WORK} from 'src/libs/application/ports/unit-of-work.port';
import {TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';
import {TypeOrmTransactionContext} from 'src/libs/infrastructure/persistence/typeorm-transaction-context';
import {HASHING_SERVICE} from './application/hashing/hashing.interface';
import {Argon2HashingService} from './infrastructure/hashing/argon2-hashing.service';
import {GlobalConfig} from 'src/config/config.interface';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {PinoLoggerAdapter} from 'src/libs/infrastructure/logger/nestjs-logger.adapter';
import {EMAIL_SERVICE} from './application/emails/di-tokens';
import {ResendEmailService} from './infrastructure/emails/resend.email.service';
import {DOMAIN_EVENT_DISPATCHER} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {NestEventEmitterDomainEventDispatcher} from 'src/libs/infrastructure/events/nest-event-emitter.domain.event.dispatcher';
import {CqrsModule} from '@nestjs/cqrs';
import {ThrottlerModule} from '@nestjs/throttler';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BullModule} from '@nestjs/bullmq';
import {ScheduleModule} from '@nestjs/schedule';
import {LoggerModule} from 'pino-nestjs';
import {databaseConfig, DatabaseConfig, DatabaseConfigName} from 'src/config/database.config';
import {posthogConfig} from 'src/config/posthog.config';
import {throttlerConfig, throttlerFactory} from 'src/config/throttler.config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {LLM_SERVICE} from './application/llm/di-tokens';
import {HealthCheckController} from './presentation/healthcheck/healthcheck.controller';
import {TanstackOpenAILLMService} from './infrastructure/llm/tanstack.openai.llm.service';
import {OUTBOX_REPOSITORY} from './domain/outbox/outbox.repository.interface';
import {TypeOrmOutboxRepository} from './infrastructure/outbox/typeorm-outbox.repository';
import {OutboxOrmEntity} from './infrastructure/outbox/outbox.entity';
import {QUEUE_SERVICE} from './application/queue/queue.service.interface';
import {BullMqAdapter} from './infrastructure/queue/bullmq.adapter';
import {OutboxScannerService} from './infrastructure/outbox/outbox-scanner.service';
import {VoucherEmailProcessor} from './infrastructure/queue/voucher-email.processor';
import {Queues} from 'src/common/enums/queues.enum';
import {DeadLetterOrmEntity} from './infrastructure/dead-letter/dead-letter.entity';
import {DEAD_LETTER_REPOSITORY} from './domain/dead-letter/dead-letter.repository.interface';
import {TypeOrmDeadLetterRepository} from './infrastructure/dead-letter/typeorm-dead-letter.repository';
import {JWT_SERVICE} from './application/jwt/di-tokens';
import {ClerkJWTService} from './infrastructure/jwt/clerk.auth.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, throttlerConfig, databaseConfig, posthogConfig],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => {
        const config = configService.getOrThrow<AppConfig>(AppConfigName);
        return {
          pinoHttp: {
            level: config.logLevel,
          },
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: throttlerFactory(),
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => {
        const config = configService.getOrThrow<DatabaseConfig>(DatabaseConfigName);
        return {
          ...config,
          autoLoadEntities: true,
        };
      },
    }),
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([OutboxOrmEntity, DeadLetterOrmEntity]),
    BullModule.forRoot({
      connection: {
        host: process.env.VALKEY_HOST,
        port: +(process.env.VALKEY_PORT ?? 6379),
        password: process.env.VALKEY_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: Queues.EMAILS,
      defaultJobOptions: {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
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
  ],
  controllers: [HealthCheckController],
  providers: [
    {provide: JWT_SERVICE, useClass: ClerkJWTService},
    {provide: ANALYTICS_SERVICE, useClass: PostHogAnalyticsService},
    {provide: TRANSACTION_CONTEXT, useClass: TypeOrmTransactionContext},
    {provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork},
    {provide: HASHING_SERVICE, useClass: Argon2HashingService},
    {provide: LOGGER, useClass: PinoLoggerAdapter},
    {provide: EMAIL_SERVICE, useClass: ResendEmailService},
    {provide: DOMAIN_EVENT_DISPATCHER, useClass: NestEventEmitterDomainEventDispatcher},
    {provide: LLM_SERVICE, useClass: TanstackOpenAILLMService},
    {provide: OUTBOX_REPOSITORY, useClass: TypeOrmOutboxRepository},
    {provide: DEAD_LETTER_REPOSITORY, useClass: TypeOrmDeadLetterRepository},
    {provide: QUEUE_SERVICE, useClass: BullMqAdapter},
    OutboxScannerService,
    VoucherEmailProcessor,
  ],
  exports: [
    JWT_SERVICE,
    ANALYTICS_SERVICE,
    TRANSACTION_CONTEXT,
    UNIT_OF_WORK,
    HASHING_SERVICE,
    LOGGER,
    DOMAIN_EVENT_DISPATCHER,
    LLM_SERVICE,
    OUTBOX_REPOSITORY,
    DEAD_LETTER_REPOSITORY,
    QUEUE_SERVICE,
    CqrsModule,
    ConfigModule,
  ],
})
export class SharedModule {}
