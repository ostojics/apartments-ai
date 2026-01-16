import {UserEntity} from 'src/modules/users/domain/user.entity';

export const HOUSEHOLD_USER_REPOSITORY_PORT = Symbol('HOUSEHOLD_USER_REPOSITORY_PORT');

interface CreateAuthorUserData {
  email: string;
  username: string;
  password: string;
  householdId: string;
}

export interface IHouseholdUserRepositoryPort {
  createAuthorUser(data: CreateAuthorUserData): Promise<UserEntity>;
}
