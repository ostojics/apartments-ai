import {DomainException} from 'src/libs/domain/exceptions/exception.base';

export enum UserErrorCode {
  ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  EMAIL_TAKEN = 'EMAIL_TAKEN',
}

export class UserAlreadyExistsError extends DomainException {
  constructor(identifier: string) {
    super(`User with identifier "${identifier}" already exists.`, UserErrorCode.ALREADY_EXISTS);
  }
}

export class UserNotFoundError extends DomainException {
  constructor(identifier: string) {
    super(`User with identifier "${identifier}" not found.`, UserErrorCode.NOT_FOUND);
  }
}

export class InvalidCredentialsError extends DomainException {
  constructor() {
    super('Invalid credentials provided.', UserErrorCode.INVALID_CREDENTIALS);
  }
}

export class InvalidTokenError extends DomainException {
  constructor() {
    super('Invalid or expired token.', UserErrorCode.INVALID_TOKEN);
  }
}

export class UsernameTakenError extends DomainException {
  constructor(username: string) {
    super(`Username "${username}" is already taken.`, UserErrorCode.USERNAME_TAKEN);
  }
}

export class EmailTakenError extends DomainException {
  constructor(email: string) {
    super(`Email "${email}" is already taken.`, UserErrorCode.EMAIL_TAKEN);
  }
}
