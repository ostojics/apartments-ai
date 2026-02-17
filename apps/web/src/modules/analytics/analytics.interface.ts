export interface IAnalyticsInterface {
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => void;
  trackException: (error: Error, properties?: Record<string, unknown>) => void;
}
