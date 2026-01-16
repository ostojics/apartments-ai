import {Injectable} from '@nestjs/common';
import {InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bullmq';
import {IUserEmailQueuePort} from '../../application/ports/user.email.queue.port';
import {Queues} from 'src/common/enums/queues.enum';
import {EmailJobs} from 'src/common/enums/jobs.enum';

export interface SendPasswordResetEmailPayload {
  email: string;
  userId: string;
}

export interface SendEmailChangeConfirmationPayload {
  userId: string;
  newEmail: string;
  token: string;
}

@Injectable()
export class BullMQEmailQueueAdapter implements IUserEmailQueuePort {
  constructor(@InjectQueue(Queues.EMAILS) private readonly emailQueue: Queue) {}

  async enqueuePasswordResetEmail(data: {email: string; userId: string}): Promise<void> {
    const payload: SendPasswordResetEmailPayload = {
      email: data.email,
      userId: data.userId,
    };

    await this.emailQueue.add(EmailJobs.SEND_PASSWORD_RESET_EMAIL, payload, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  async enqueueEmailChangeConfirmation(data: {userId: string; newEmail: string; token: string}): Promise<void> {
    const payload: SendEmailChangeConfirmationPayload = {
      userId: data.userId,
      newEmail: data.newEmail,
      token: data.token,
    };

    await this.emailQueue.add(EmailJobs.SEND_EMAIL_CHANGE_CONFIRMATION, payload, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }
}
