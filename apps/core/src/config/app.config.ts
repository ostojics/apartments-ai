import {registerAs} from '@nestjs/config';

export interface AppConfig {
  url: string;
  port: number;
  jwtSecret: string;
  jwtExpiry: string;
  environment: string;
  openaiApiKey: string;
  resendApiKey: string;
  webAppUrl: string;
  cookieDomain: string | null;
  logLevel: string;
  appDomain: string;
  apiKey: string;
  enableApiKeyGuard: boolean;
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
    webAppUrl: process.env.WEB_APP_URL || '',
    cookieDomain: process.env.COOKIE_DOMAIN || null,
    logLevel: process.env.LOG_LEVEL || 'info',
    // APP_DOMAIN: Main domain for subdomain matching (e.g., "apartments.ai")
    // Supports wildcard subdomain matching (*.apartments.ai)
    appDomain: process.env.APP_DOMAIN || '',
    apiKey: process.env.API_KEY || '',
    enableApiKeyGuard: process.env.ENABLE_API_KEY_GUARD === 'true',
  };
}

export const appConfig = registerAs<AppConfig>(AppConfigName, () => {
  return getConfig();
});
