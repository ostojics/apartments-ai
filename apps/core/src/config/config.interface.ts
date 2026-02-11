import {AppConfig} from './app.config';
import {DatabaseConfig} from './database.config';
import {ThrottlerConfig} from './throttler.config';
import {PosthogConfig} from './posthog.config';

export interface GlobalConfig {
  app: AppConfig;
  throttler: ThrottlerConfig;
  database: DatabaseConfig;
  posthog: PosthogConfig;
}
