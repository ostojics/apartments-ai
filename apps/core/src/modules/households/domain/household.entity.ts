import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {HouseholdCreatedEvent} from './events/household-created.event';
import {HouseholdUpdatedEvent} from './events/household-updated.event';
import {CurrencyCode} from './value-objects/currency-code.value-object';
import {InvalidMonthlyBudgetError} from './household.errors';

export class HouseholdEntity extends BaseEntity {
  #name: string;
  #currencyCode: CurrencyCode;
  #monthlyBudget: number;

  private constructor(
    id: string | undefined,
    name: string,
    currencyCode: CurrencyCode,
    monthlyBudget: number,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#name = name;
    this.#currencyCode = currencyCode;
    this.#monthlyBudget = monthlyBudget;
  }

  public static create(data: {
    id?: string;
    name: string;
    currencyCode: string;
    monthlyBudget: number;
    createdAt?: string;
    updatedAt?: string;
  }): HouseholdEntity {
    if (data.monthlyBudget < 0) {
      throw new InvalidMonthlyBudgetError(data.monthlyBudget);
    }

    const household = new HouseholdEntity(
      data.id,
      data.name,
      CurrencyCode.create(data.currencyCode),
      data.monthlyBudget,
      data.createdAt,
      data.updatedAt,
    );

    household.addEvent(new HouseholdCreatedEvent(household.id, data.name));

    return household;
  }

  public get name(): string {
    return this.#name;
  }

  public get currencyCode(): string {
    return this.#currencyCode.value;
  }

  public get monthlyBudget(): number {
    return this.#monthlyBudget;
  }

  public updateName(newName: string): void {
    this.#name = newName;
    this.markUpdated();
  }

  public updateCurrencyCode(newCurrencyCode: string): void {
    this.#currencyCode = CurrencyCode.create(newCurrencyCode);
    this.markUpdated();
  }

  public updateMonthlyBudget(newMonthlyBudget: number): void {
    this.#monthlyBudget = newMonthlyBudget;
    this.markUpdated();
  }

  public update(data: {name?: string; currencyCode?: string; monthlyBudget?: number}): void {
    if (data.name !== undefined) {
      this.#name = data.name;
    }

    if (data.currencyCode !== undefined) {
      this.#currencyCode = CurrencyCode.create(data.currencyCode);
    }

    if (data.monthlyBudget !== undefined) {
      this.#monthlyBudget = data.monthlyBudget;
    }

    this.addEvent(
      new HouseholdUpdatedEvent(this.id, {
        name: data.name,
        currencyCode: data.currencyCode,
        monthlyBudget: data.monthlyBudget,
      }),
    );

    this.markUpdated();
  }
}
