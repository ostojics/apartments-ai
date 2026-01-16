import {registerAs} from '@nestjs/config';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {InitExtensionAndTypes1758655322744} from 'src/migrations/1758655322744-InitExtensionAndTypes';

export const DatabaseConfigName = 'database';

export interface DatabaseConfig extends PostgresConnectionOptions {}

export function getConfig(): DatabaseConfig {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ?? 'nestwise_dev',
    ssl: process.env.DB_USE_SSL === 'true',
    entities: [
      // User,
      // Household,
      // Account,
      // Category,
      // Transaction,
      // CategoryBudget,
      // PrivateTransaction,
      // License,
      // ScheduledTransactionRule,
      // ScheduledTransactionExecution,
    ],
    useUTC: true,
    migrations: [InitExtensionAndTypes1758655322744],
    migrationsRun: true,
    extra: {
      max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX, 10) : 15,
      min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN, 10) : 2,
      idleTimeoutMillis: 20000,
      connectionTimeoutMillis: 10000,
    },
    logging: ['warn', 'error'],
  };
}

export const databaseConfig = registerAs<DatabaseConfig>(DatabaseConfigName, () => {
  return getConfig();
});
