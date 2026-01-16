import {DomainException} from 'src/libs/domain/exceptions/exception.base';

export enum HouseholdErrorCode {
  ALREADY_EXISTS = 'HOUSEHOLD_ALREADY_EXISTS',
  NOT_FOUND = 'HOUSEHOLD_NOT_FOUND',
  ACCESS_DENIED = 'HOUSEHOLD_ACCESS_DENIED',
  INVALID_CURRENCY_CODE = 'INVALID_CURRENCY_CODE',
  INVALID_MONTHLY_BUDGET = 'INVALID_MONTHLY_BUDGET',
}

export class HouseholdAlreadyExistsError extends DomainException {
  constructor(identifier: string) {
    super(`Household with identifier "${identifier}" already exists.`, HouseholdErrorCode.ALREADY_EXISTS);
  }
}

export class HouseholdNotFoundError extends DomainException {
  constructor(identifier: string) {
    super(`Household with identifier "${identifier}" not found.`, HouseholdErrorCode.NOT_FOUND);
  }
}

export class HouseholdAccessDeniedError extends DomainException {
  constructor(householdId: string, userId: string) {
    super(`User "${userId}" does not have access to household "${householdId}".`, HouseholdErrorCode.ACCESS_DENIED);
  }
}

export class InvalidCurrencyCodeError extends DomainException {
  constructor(currencyCode: string) {
    super(
      `Invalid currency code "${currencyCode}". Must be a 3-letter ISO code.`,
      HouseholdErrorCode.INVALID_CURRENCY_CODE,
      {currencyCode},
    );
  }
}

export class InvalidMonthlyBudgetError extends DomainException {
  constructor(budget: number) {
    super(`Invalid monthly budget "${budget}". Must be a positive number.`, HouseholdErrorCode.INVALID_MONTHLY_BUDGET);
  }
}
