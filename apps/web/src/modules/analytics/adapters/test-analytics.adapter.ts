/* eslint-disable no-console */
import {IAnalyticsInterface} from '../analytics.interface';

export const testAnalyticsAdapter: IAnalyticsInterface = {
  trackEvent(eventName: string, properties?: Record<string, unknown>): void {
    console.log(`TestAnalyticsAdapter - Event Tracked: ${eventName}`, properties);
  },
  trackException(error: Error, properties?: Record<string, unknown>): void {
    console.error(`TestAnalyticsAdapter - Exception Tracked: ${error.message}`, {
      stack: error.stack,
      ...properties,
    });
  },
};
