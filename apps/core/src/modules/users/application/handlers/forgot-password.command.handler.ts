import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {ForgotPasswordCommand} from '../commands/forgot-password.command';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';
import {USER_EMAIL_SERVICE_PORT, IUserEmailQueuePort} from '../ports/user.email.queue.port';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler implements ICommandHandler<ForgotPasswordCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(USER_EMAIL_SERVICE_PORT)
    private readonly emailQueue: IUserEmailQueuePort,
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const {data} = command;

    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      await this.emailQueue.enqueuePasswordResetEmail({
        email: user.email,
        userId: user.id,
      });
    }
  }
}
