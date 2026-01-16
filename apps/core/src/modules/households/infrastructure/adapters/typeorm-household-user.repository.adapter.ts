import {Injectable, Inject} from '@nestjs/common';
import {IHouseholdUserRepositoryPort} from '../../application/ports/household.user.repository.port';
import {UserEntity} from 'src/modules/users/domain/user.entity';
import {IUserRepository, USER_REPOSITORY} from 'src/modules/users/domain/repositories/user.repository.interface';

interface CreateAuthorUserData {
  email: string;
  username: string;
  password: string;
  householdId: string;
}

@Injectable()
export class TypeOrmHouseholdUserRepositoryAdapter implements IHouseholdUserRepositoryPort {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async createAuthorUser(data: CreateAuthorUserData): Promise<UserEntity> {
    const user = UserEntity.create({
      email: data.email,
      username: data.username,
      passwordHash: data.password,
      householdId: data.householdId,
      isHouseholdAuthor: true,
    });

    await this.userRepository.update(user);
    return user;
  }
}
