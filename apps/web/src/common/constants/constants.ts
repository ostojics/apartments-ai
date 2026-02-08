export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000') as string;
export const MSW_ENABLED = import.meta.env.VITE_ENABLE_MSW === 'true';

export const TENANT_SLUG = (import.meta.env.VITE_TENANT_SLUG ?? null) as string | null;
