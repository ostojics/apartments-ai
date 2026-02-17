import {posthogAnalyticsAdapter} from './adapters/posthog-analytics.adapter';
import {testAnalyticsAdapter} from './adapters/test-analytics.adapter';
import {IAnalyticsInterface} from './analytics.interface';

const analyticsFactory = (): IAnalyticsInterface => {
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    return testAnalyticsAdapter;
  }

  return posthogAnalyticsAdapter;
};

export const analyticsService = analyticsFactory();
