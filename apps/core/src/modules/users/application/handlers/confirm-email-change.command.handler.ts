import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {ConfirmEmailChangeCommand} from '../commands/confirm-email-change.command';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';
import {UserNotFoundError, InvalidTokenError, EmailTakenError} from '../../domain/user.errors';

import {
  DOMAIN_EVENT_DISPATCHER,
  IDomainEventDispatcher,
} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {IUnitOfWork, UNIT_OF_WORK} from 'src/libs/application/ports/unit-of-work.port';
import {IJwtService, JwtPayload} from 'src/modules/shared/application/jwt/jwt.interface';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';

@CommandHandler(ConfirmEmailChangeCommand)
export class ConfirmEmailChangeCommandHandler implements ICommandHandler<ConfirmEmailChangeCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(DOMAIN_EVENT_DISPATCHER)
    private readonly eventDispatcher: IDomainEventDispatcher,
    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(command: ConfirmEmailChangeCommand): Promise<void> {
    const {data} = command;

    const payload = await this.jwtService.verifyAsync<JwtPayload & {newEmail: string}>(data.token);
    if (payload.purpose !== 'email-change') {
      throw new InvalidTokenError();
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UserNotFoundError(payload.sub);
    }

    const existingUser = await this.userRepository.findByEmail(payload.newEmail);
    if (existingUser && existingUser.id !== payload.sub) {
      throw new EmailTakenError(payload.newEmail);
    }

    user.changeEmail(payload.newEmail);

    await this.unitOfWork.runInTransaction(async () => {
      await this.userRepository.update(user);
    });

    this.eventDispatcher.dispatch(user);
  }
}
