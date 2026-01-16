import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UpdateUsernameCommand} from '../commands/update-username.command';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';
import {UserNotFoundError, UsernameTakenError} from '../../domain/user.errors';
import {
  DOMAIN_EVENT_DISPATCHER,
  IDomainEventDispatcher,
} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {IUnitOfWork, UNIT_OF_WORK} from 'src/libs/application/ports/unit-of-work.port';

@CommandHandler(UpdateUsernameCommand)
export class UpdateUsernameCommandHandler implements ICommandHandler<UpdateUsernameCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(DOMAIN_EVENT_DISPATCHER)
    private readonly eventDispatcher: IDomainEventDispatcher,
    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(command: UpdateUsernameCommand): Promise<void> {
    const {data} = command;

    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new UserNotFoundError(data.userId);
    }

    const existingUser = await this.userRepository.findByUsername(data.username);
    if (existingUser && existingUser.id !== data.userId) {
      throw new UsernameTakenError(data.username);
    }

    user.changeUsername(data.username);

    await this.unitOfWork.runInTransaction(async () => {
      await this.userRepository.update(user);
    });

    this.eventDispatcher.dispatch(user);
  }
}
