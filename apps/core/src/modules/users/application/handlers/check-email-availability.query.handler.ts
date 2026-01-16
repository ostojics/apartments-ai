import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {
  CheckEmailAvailabilityQuery,
  CheckEmailAvailabilityQueryResult,
} from '../queries/check-email-availability.query';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';

@QueryHandler(CheckEmailAvailabilityQuery)
export class CheckEmailAvailabilityQueryHandler implements IQueryHandler<
  CheckEmailAvailabilityQuery,
  CheckEmailAvailabilityQueryResult
> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: CheckEmailAvailabilityQuery): Promise<CheckEmailAvailabilityQueryResult> {
    const user = await this.userRepository.findByEmail(query.email);

    return {
      available: !user,
    };
  }
}
