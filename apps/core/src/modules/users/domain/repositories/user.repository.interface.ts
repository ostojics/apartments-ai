import {UserEntity} from '../user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  create(user: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  update(user: UserEntity): Promise<void>;
}
