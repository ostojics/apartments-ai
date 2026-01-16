import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {RequestEmailChangeCommand} from '../commands/request-email-change.command';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';
import {UserNotFoundError, EmailTakenError} from '../../domain/user.errors';
import {USER_EMAIL_SERVICE_PORT, IUserEmailQueuePort} from '../ports/user.email.queue.port';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';
import {IJwtService} from 'src/modules/shared/application/jwt/jwt.interface';

@CommandHandler(RequestEmailChangeCommand)
export class RequestEmailChangeCommandHandler implements ICommandHandler<RequestEmailChangeCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(USER_EMAIL_SERVICE_PORT)
    private readonly emailQueue: IUserEmailQueuePort,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: RequestEmailChangeCommand): Promise<void> {
    const {data} = command;

    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new UserNotFoundError(data.userId);
    }

    const existingUser = await this.userRepository.findByEmail(data.newEmail);
    if (existingUser) {
      throw new EmailTakenError(data.newEmail);
    }

    const payload = {
      sub: data.userId,
      email: data.currentEmail,
      newEmail: data.newEmail,
      purpose: 'email-change',
    };

    const token = await this.jwtService.signAsync(payload, {expiresIn: '15m'});

    await this.emailQueue.enqueueEmailChangeConfirmation({
      userId: data.userId,
      newEmail: data.newEmail,
      token,
    });
  }
}
