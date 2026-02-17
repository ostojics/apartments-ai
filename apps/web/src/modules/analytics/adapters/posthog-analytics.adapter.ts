import posthog from 'posthog-js';
import {IAnalyticsInterface} from '../analytics.interface';

export const posthogAnalyticsAdapter: IAnalyticsInterface = {
  trackEvent(eventName: string, properties?: Record<string, unknown>): void {
    posthog.capture(eventName, {...properties, timestamp: new Date().toISOString()});
  },
  trackException(error: Error, properties?: Record<string, unknown>): void {
    posthog.capture('exception', {
      error_message: error.message,
      stack_trace: error.stack,
      ...properties,
      timestamp: new Date().toISOString(),
    });
  },
};
