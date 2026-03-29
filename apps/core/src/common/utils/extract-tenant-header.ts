import {IncomingHttpHeaders} from 'http';
import {CustomHeaders} from '../enums/custom-headers';

export const extractTenantSlug = (headers: IncomingHttpHeaders): string | null => {
  const customHeaderSlug = headers[CustomHeaders.TenantSlug];

  if (customHeaderSlug) {
    return String(customHeaderSlug);
  }

  if (headers.origin) {
    return slugFromUrl(headers.origin);
  }

  return null;
};

const slugFromUrl = (rawUrl: string): string | null => {
  try {
    // Add protocol if missing so URL class doesn't throw
    const normalized = rawUrl.includes('://') ? rawUrl : `http://${rawUrl}`;
    const url = new URL(normalized);
    const parts = url.hostname.split('.');
    return parts.length >= 2 ? parts[0] : null;
  } catch {
    return null;
  }
};
