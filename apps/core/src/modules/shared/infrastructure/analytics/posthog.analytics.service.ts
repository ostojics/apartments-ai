import {Injectable, Inject} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PostHog} from 'posthog-node';
import {IAnalyticsService} from '../../application/analytics/analytics.interface';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {LOGGER} from 'src/libs/application/ports/di-tokens';

@Injectable()
export class PostHogAnalyticsService implements IAnalyticsService {
  private client: PostHog | null = null;

  constructor(
    private readonly configService: ConfigService,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {
    const apiKey = this.configService.get<string>('POSTHOG_API_KEY');
    const host = this.configService.get<string>('POSTHOG_HOST');

    if (!apiKey) {
      this.logger.error('PostHog API key is missing. Analytics will be disabled.');
      return;
    }

    this.client = new PostHog(apiKey, {host});
    this.logger.info('PostHog analytics client initialized');
  }

  captureEvent(params: {distinctId: string; event: string; properties?: Record<string, any>}): void {
    if (!this.client) {
      return;
    }

    try {
      this.client.capture({
        distinctId: params.distinctId,
        event: params.event,
        properties: {...params.properties, timestamp: new Date().toISOString()},
      });
    } catch (error) {
      this.logger.error('Failed to capture analytics event', error);
    }
  }

  captureException(error: Error, distinctId: string, metadata?: Record<string, any>): void {
    if (!this.client) {
      return;
    }

    try {
      this.client.captureException(error, distinctId, {
        properties: {
          exception_message: error.message,
          exception_type: error.name,
          exception_stack: error.stack,
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      this.logger.error('Failed to capture analytics exception', err);
    }
  }

  async shutdown(): Promise<void> {
    if (this.client) {
      this.logger.debug('Shutting down PostHog analytics client...');
      await this.client.shutdown();
      this.logger.debug('PostHog analytics client shut down successfully');
    }
  }
}
