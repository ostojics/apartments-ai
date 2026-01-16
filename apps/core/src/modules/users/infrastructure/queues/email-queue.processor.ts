import {Processor, WorkerHost} from '@nestjs/bullmq';
import {Job} from 'bullmq';
import {Inject} from '@nestjs/common';
import {Queues} from 'src/common/enums/queues.enum';
import {EmailJobs} from 'src/common/enums/jobs.enum';
import {SendPasswordResetEmailPayload, SendEmailChangeConfirmationPayload} from './bullmq-email-queue.adapter';
import {LoggerPort} from 'src/libs/application/ports/logger.port';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {EMAIL_SERVICE} from 'src/modules/shared/application/emails/di-tokens';
import {IEmailService} from 'src/modules/shared/application/emails/email.service.interface';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';
import {IJwtService} from 'src/modules/shared/application/jwt/jwt.interface';
import {ConfigService} from '@nestjs/config';
import {AppConfig, AppConfigName} from 'src/config/app.config';

@Processor(Queues.EMAILS)
export class EmailQueueProcessor extends WorkerHost {
  constructor(
    @Inject(LOGGER)
    private readonly logger: LoggerPort,
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    this.logger.debug('Processing email job', {jobId: job.id, jobName: job.name});

    switch (job.name as EmailJobs) {
      case EmailJobs.SEND_PASSWORD_RESET_EMAIL:
        await this.processPasswordResetEmail(job.data as SendPasswordResetEmailPayload);
        break;
      case EmailJobs.SEND_EMAIL_CHANGE_CONFIRMATION:
        await this.processEmailChangeConfirmation(job.data as SendEmailChangeConfirmationPayload);
        break;
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }

    this.logger.debug('Email job processed successfully', {jobId: job.id});
  }

  private async processPasswordResetEmail(payload: SendPasswordResetEmailPayload): Promise<void> {
    this.logger.info('Processing password reset email', {userId: payload.userId, email: payload.email});
    const appConfig = this.configService.getOrThrow<AppConfig>(AppConfigName);
    const jwtPayload = {
      sub: payload.userId,
      email: payload.email,
      iss: appConfig.url,
      purpose: 'password-reset',
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '15m',
    });

    const params = new URLSearchParams({token});
    const queryParams = params.toString();

    await this.emailService.sendEmail({
      to: payload.email,
      subject: `[NestWise] Resetovanje lozinke`,
      html: `
      <p>Zatražili ste resetovanje lozinke za svoj NestWise nalog.</p>
      <p>Molimo kliknite na link ispod da resetujete lozinku. Ovaj link ističe za 15 minuta:</p>
      <a href="${appConfig.webAppUrl}/reset-password?${queryParams}">Resetuj lozinku</a>
      <p>Ukoliko niste tražili resetovanje lozinke, slobodno ignorišite ovaj email.</p>
      `,
    });
  }

  private async processEmailChangeConfirmation(payload: SendEmailChangeConfirmationPayload): Promise<void> {
    this.logger.info('Processing email change confirmation', {
      userId: payload.userId,
      newEmail: payload.newEmail,
    });

    const appConfig = this.configService.getOrThrow<AppConfig>(AppConfigName);
    const params = new URLSearchParams({token: payload.token});
    const queryParams = params.toString();

    await this.emailService.sendEmail({
      to: payload.newEmail,
      subject: `[NestWise] Potvrda promene e‑pošte`,
      html: `
      <p>Zatražili ste promenu e‑pošte za svoj NestWise nalog.</p>
      <p>Molimo kliknite na link ispod da potvrdite novu e‑poštu. Ovaj link ističe za 15 minuta:</p>
      <a href="${appConfig.webAppUrl}/email-change?${queryParams}">Potvrdi promenu e‑pošte</a>
      <p>Ukoliko niste tražili promenu e‑pošte, slobodno ignorišite ovaj email.</p>
      `,
    });
  }
}
