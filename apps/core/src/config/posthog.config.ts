import {registerAs} from '@nestjs/config';

export interface PosthogConfig {
  apiKey: string;
  host: string;
}

export const PosthogConfigName = 'posthog';

export function getConfig(): PosthogConfig {
  return {
    apiKey: process.env.POSTHOG_API_KEY || '',
    host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
  };
}

export const posthogConfig = registerAs<PosthogConfig>(PosthogConfigName, () => {
  return getConfig();
});
