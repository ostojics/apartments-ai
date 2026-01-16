import {Inject, Injectable} from '@nestjs/common';
import {IEmailSendOptions, IEmailService} from '../../application/emails/email.service.interface';
import {ConfigService} from '@nestjs/config';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {LoggerPort} from 'src/libs/application/ports/logger.port';
import {Resend} from 'resend';
import {AppConfig, AppConfigName} from 'src/config/app.config';
import {ANALYTICS_SERVICE} from '../../application/analytics/di-tokens';
import {IAnalyticsService} from '../../application/analytics/analytics.interface';

@Injectable()
export class ResendEmailService implements IEmailService {
  private readonly resendClient: Resend;
  private readonly fromEmail: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(LOGGER) private readonly logger: LoggerPort,
    @Inject(ANALYTICS_SERVICE) private readonly analyticsService: IAnalyticsService,
  ) {
    const config = this.configService.getOrThrow<AppConfig>(AppConfigName);
    this.resendClient = new Resend(config.resendApiKey);
    this.fromEmail = 'info@no-reply.nestwise.finance';
  }

  async sendEmail(options: IEmailSendOptions): Promise<void> {
    const {error} = await this.resendClient.emails.send({...options, from: this.fromEmail});

    if (error) {
      this.analyticsService.captureException(new Error(error.message), 'system', {context: 'Email Sending', options});
      this.logger.error('Error sending invite email', error);
      throw new Error(error.message);
    }
  }
}
