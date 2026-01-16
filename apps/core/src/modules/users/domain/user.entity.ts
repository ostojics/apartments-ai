import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {UserCreatedEvent} from './events/user-created.event';
import {EmailTakenError, UsernameTakenError} from './user.errors';
import {UserPasswordChangedEvent} from './events/user-password-changed.event';
import {UserEmailChangedEvent} from './events/user-email-changed.event';

export class UserEntity extends BaseEntity {
  #householdId: string;
  #username: string;
  #email: string;
  #passwordHash: string;
  #isHouseholdAuthor: boolean;

  private constructor(
    id: string | undefined,
    householdId: string,
    username: string,
    email: string,
    passwordHash: string,
    isHouseholdAuthor: boolean,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#householdId = householdId;
    this.#username = username;
    this.#email = email;
    this.#passwordHash = passwordHash;
    this.#isHouseholdAuthor = isHouseholdAuthor;
  }

  public static create(data: {
    id?: string;
    householdId: string;
    username: string;
    email: string;
    passwordHash: string;
    isHouseholdAuthor: boolean;
    createdAt?: string;
    updatedAt?: string;
  }): UserEntity {
    const user = new UserEntity(
      data.id,
      data.householdId,
      data.username,
      data.email,
      data.passwordHash,
      data.isHouseholdAuthor,
      data.createdAt,
      data.updatedAt,
    );

    user.addEvent(new UserCreatedEvent(user.id, user.email));

    return user;
  }

  get householdId(): string {
    return this.#householdId;
  }

  get username(): string {
    return this.#username;
  }

  get email(): string {
    return this.#email;
  }

  get passwordHash(): string {
    return this.#passwordHash;
  }

  get isHouseholdAuthor(): boolean {
    return this.#isHouseholdAuthor;
  }

  public changeEmail(newEmail: string): void {
    if (newEmail === this.#email) {
      throw new EmailTakenError(newEmail);
    }

    this.#email = newEmail;
    this.markUpdated();
  }

  public changeUsername(newUsername: string): void {
    if (newUsername === this.#username) {
      throw new UsernameTakenError(newUsername);
    }

    this.#username = newUsername;
    this.markUpdated();
    this.addEvent(new UserEmailChangedEvent(this.id, this.email));
  }

  public setAsAuthor(): void {
    this.#isHouseholdAuthor = true;
    this.markUpdated();
  }

  public changePasswordHash(newPasswordHash: string): void {
    this.#passwordHash = newPasswordHash;
    this.markUpdated();
    this.addEvent(new UserPasswordChangedEvent(this.id, this.email));
  }
}
