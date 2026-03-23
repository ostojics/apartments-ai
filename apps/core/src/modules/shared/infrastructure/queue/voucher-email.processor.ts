import {Inject, Injectable} from '@nestjs/common';
import {OnWorkerEvent, Processor, WorkerHost} from '@nestjs/bullmq';
import {Job} from 'bullmq';
import {EmailJobs} from 'src/common/enums/jobs.enum';
import {Queues} from 'src/common/enums/queues.enum';
import {EMAIL_SERVICE} from '../../application/emails/di-tokens';
import {IEmailService} from '../../application/emails/email.service.interface';
import {IOutboxRepository, OUTBOX_REPOSITORY} from '../../domain/outbox/outbox.repository.interface';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {format} from 'date-fns';

interface SendVoucherEmailPayload {
  outboxId: string;
}

@Injectable()
@Processor(Queues.EMAILS)
export class VoucherEmailProcessor extends WorkerHost {
  constructor(
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepository: IOutboxRepository,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {
    super();
  }

  async process(job: Job<SendVoucherEmailPayload>): Promise<void> {
    if (job.name !== String(EmailJobs.SEND_VOUCHER_EMAIL)) {
      return;
    }

    const outbox = await this.outboxRepository.findById(job.data.outboxId);
    if (!outbox) {
      return;
    }

    const payload = outbox.payload;
    const to = 'hostelite021@gmail.com'; // String(payload.email); --- IGNORE ---
    const voucherCode = String(payload.voucherCode);
    const discountPercent = Number(payload.discountPercent);
    const expiresAt = String(payload.expiresAt);
    const formattedExpiresAt = format(new Date(expiresAt), 'MMMM d, yyyy');

    await this.emailService.sendEmail({
      to,
      subject: 'Your voucher code',
      html: `<p>Your voucher is <strong>${voucherCode}</strong> (${discountPercent}% off), valid until ${formattedExpiresAt}.</p>`,
    });

    outbox.markSent({jobId: job.id, provider: 'resend'});
    await this.outboxRepository.save(outbox);
    this.logger.info('email.sent', {outboxId: outbox.id, to});
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job<SendVoucherEmailPayload>, error: Error): Promise<void> {
    if (job.name !== String(EmailJobs.SEND_VOUCHER_EMAIL)) {
      return;
    }

    const outbox = await this.outboxRepository.findById(job.data.outboxId);
    if (!outbox) {
      return;
    }

    outbox.markFailed({error: error.message});
    await this.outboxRepository.save(outbox);

    this.logger.error('Voucher email job failed', error, {outboxId: outbox.id, attemptsMade: job.attemptsMade});
  }
}
