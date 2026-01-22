import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GlobalConfig} from './config/config.interface';
import {CqrsModule} from '@nestjs/cqrs';
import {databaseConfig, DatabaseConfig, DatabaseConfigName} from './config/database.config';
import {LoggerModule} from 'pino-nestjs';
import {appConfig, AppConfig, AppConfigName} from './config/app.config';
import {posthogConfig} from './config/posthog.config';
import {queuesConfig} from './config/queues.config';
import {throttlerConfig, throttlerFactory} from './config/throttler.config';
import {ThrottlerModule} from '@nestjs/throttler';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {SharedModule} from './modules/shared/shared.module';
import {TenantsModule} from './modules/tenants/tenants.module';
import {BuildingsModule} from './modules/buildings/buildings.module';
import {ContactsModule} from './modules/contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, throttlerConfig, databaseConfig, queuesConfig, posthogConfig],
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
    CqrsModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: throttlerFactory(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => {
        const config = configService.getOrThrow<DatabaseConfig>(DatabaseConfigName);
        return {
          ...config,
        };
      },
    }),
    EventEmitterModule.forRoot(),
    SharedModule,
    TenantsModule,
    BuildingsModule,
    ContactsModule,
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService<GlobalConfig>) => {
    //     const config = configService.getOrThrow<QueuesConfig>(QueuesConfigName);
    //     return {
    //       connection: {
    //         host: config.redisHost,
    //         port: config.redisPort,
    //         password: config.redisPassword ?? undefined,
    //       },
    //       defaultJobOptions: {
    //         removeOnComplete: {age: 3600, count: 1000}, // Keep last 1000 or 1 hour
    //         removeOnFail: {age: 172800}, // Keep failed jobs for 48 hours (172800 seconds)
    //       },
    //     };
    //   },
    // }),
    // ScheduleModule.forRoot(),
    // PosthogModule,
    // ShutdownModule,
    // AuthModule,
    // AccountsModule,
    // CategoriesModule,
    // TransactionsModule,
    // EmailsModule,
    // PoliciesModule,
    // CategoryBudgetsModule,
    // PrivateTransactionsModule,
    // InvitesModule,
    // LicensesModule,
    // ScheduledTransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
