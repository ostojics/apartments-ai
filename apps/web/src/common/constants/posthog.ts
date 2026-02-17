export const POSTHOG_API_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string;
export const POSTHOG_API_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string;

export const posthogConfig = {
  api_host: POSTHOG_API_HOST,
  defaults: '2026-01-30',
} as const;
