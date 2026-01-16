import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetMeQuery, GetMeQueryResult} from '../queries/get-me.query';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';
import {UserNotFoundError} from '../../domain/user.errors';

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery, GetMeQueryResult> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetMeQuery): Promise<GetMeQueryResult> {
    const user = await this.userRepository.findById(query.userId);

    if (!user) {
      throw new UserNotFoundError(query.userId);
    }

    return {
      id: user.id,
      householdId: user.householdId,
      username: user.username,
      email: user.email,
      isHouseholdAuthor: user.isHouseholdAuthor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
