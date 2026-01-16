export interface IAnalyticsService {
  /**
   * Captures an analytics event
   * @param params - Event parameters including distinctId, event name, and optional properties
   */
  captureEvent(params: {distinctId: string; event: string; properties?: Record<string, any>}): void;

  /**
   * Captures an exception for analytics tracking
   * @param error - The error that occurred
   * @param distinctId - Unique identifier for the user/session
   * @param metadata - Additional metadata about the exception
   */
  captureException(error: Error, distinctId: string, metadata?: Record<string, any>): void;

  /**
   * Shuts down the analytics client gracefully
   */
  shutdown(): Promise<void>;
}
