import {registerAs} from '@nestjs/config';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {InitExtensionAndTypes1758655322744} from 'src/migrations/1758655322744-InitExtensionAndTypes';
import {CreateLicenses1758657000000} from 'src/migrations/1758657000000-CreateLicenses';
import {CreateTenants1758657000100} from 'src/migrations/1758657000100-CreateTenants';
import {CreateFeedback1758657000200} from 'src/migrations/1758657000200-CreateFeedback';
import {CreateBuildings1758657000300} from 'src/migrations/1758657000300-CreateBuildings';
import {CreateKnowledgeBases1758657000400} from 'src/migrations/1758657000400-CreateKnowledgeBases';
import {CreateContacts1758657000500} from 'src/migrations/1758657000500-CreateContacts';

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
    migrations: [
      InitExtensionAndTypes1758655322744,
      CreateLicenses1758657000000,
      CreateTenants1758657000100,
      CreateFeedback1758657000200,
      CreateBuildings1758657000300,
      CreateKnowledgeBases1758657000400,
      CreateContacts1758657000500,
    ],
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
