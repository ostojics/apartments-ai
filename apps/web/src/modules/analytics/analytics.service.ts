import {testAnalyticsAdapter} from './adapters/test-analytics.adapter';
import {IAnalyticsInterface} from './analytics.interface';

// TODO: Since PostHog is removed because of the bundle size, implement a different analytics solution
const analyticsFactory = (): IAnalyticsInterface => {
  // if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
  //   return testAnalyticsAdapter;
  // }

  return testAnalyticsAdapter;
};

export const analyticsService = analyticsFactory();
