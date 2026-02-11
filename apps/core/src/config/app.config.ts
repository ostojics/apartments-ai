import {registerAs} from '@nestjs/config';

export interface AppConfig {
  url: string;
  port: number;
  jwtSecret: string;
  jwtExpiry: string;
  environment: string;
  openaiApiKey: string;
  resendApiKey: string;
  logLevel: string;
  appDomain: string;
}

export const AppConfigName = 'app';

export function getConfig(): AppConfig {
  const port = parseInt(process.env.PORT ?? '8080', 10);

  return {
    url: process.env.APP_URL || `http://localhost:${port}`,
    port,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiry: process.env.JWT_EXPIRY || '7d',
    environment: process.env.NODE_ENV || 'development',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    logLevel: process.env.LOG_LEVEL || 'info',
    // APP_DOMAIN: Main domain for subdomain matching (e.g., "apartments.ai")
    // Supports wildcard subdomain matching (*.apartments.ai)
    appDomain: process.env.APP_DOMAIN || '',
  };
}

export const appConfig = registerAs<AppConfig>(AppConfigName, () => {
  return getConfig();
});
