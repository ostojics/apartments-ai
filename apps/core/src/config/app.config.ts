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
  // CORS configuration
  appDomain: string;
  corsAllowedOrigins: string[];
  // API Key Guard configuration
  apiKey: string;
  enableApiKeyGuard: boolean;
}

export const AppConfigName = 'app';

export function getConfig(): AppConfig {
  const port = parseInt(process.env.PORT ?? '8080', 10);

  // Parse CORS allowed origins from comma-separated list
  const corsOriginsEnv = process.env.CORS_ALLOWED_ORIGINS || '';
  const corsAllowedOrigins = corsOriginsEnv
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

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
    // CORS configuration
    // APP_DOMAIN: Main domain for subdomain matching (e.g., "apartments.ai")
    // Supports wildcard subdomain matching (*.apartments.ai)
    appDomain: process.env.APP_DOMAIN || '',
    // CORS_ALLOWED_ORIGINS: Comma-separated list of allowed origins
    // Example: "http://localhost:5173,http://localhost:3000"
    corsAllowedOrigins,
    // API Key Guard configuration
    // API_KEY: Secret key for API authentication via x-api-key header
    apiKey: process.env.API_KEY || '',
    // ENABLE_API_KEY_GUARD: Toggle to enable/disable API key validation
    // Set to "true" to enable, any other value disables
    enableApiKeyGuard: process.env.ENABLE_API_KEY_GUARD === 'true',
  };
}

export const appConfig = registerAs<AppConfig>(AppConfigName, () => {
  return getConfig();
});
