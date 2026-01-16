import {DomainException} from './exception.base';

export enum ValueObjectErrorCode {
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  INVALID_TRANSACTION_TYPE = 'INVALID_TRANSACTION_TYPE',
  INVALID_DESCRIPTION = 'INVALID_DESCRIPTION',
}

export class InvalidAmountError extends DomainException {
  constructor(amount: number) {
    super(`Invalid amount "${amount}". Amount must be greater than 0`, ValueObjectErrorCode.INVALID_AMOUNT);
  }
}

export class InvalidTransactionTypeError extends DomainException {
  constructor(type: string) {
    super(
      `Invalid transaction type "${type}". Must be "income" or "expense"`,
      ValueObjectErrorCode.INVALID_TRANSACTION_TYPE,
    );
  }
}

export class InvalidDescriptionError extends DomainException {
  constructor(description: string) {
    super(
      `Invalid description "${description}". Description cannot be empty`,
      ValueObjectErrorCode.INVALID_DESCRIPTION,
    );
  }
}
