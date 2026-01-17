import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {LicenseCreatedEvent} from './events/license-created.event';
import {LicenseUsedEvent} from './events/license-used.event';

export class LicenseEntity extends BaseEntity {
  #key: string;
  #validDate: Date;
  #usedAt: Date | null;
  #allowedBuildings: number;
  #metadata: Record<string, unknown>;

  private constructor(
    id: string | undefined,
    key: string,
    validDate: Date,
    usedAt: Date | null,
    allowedBuildings: number,
    metadata: Record<string, unknown>,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#key = key;
    this.#validDate = validDate;
    this.#usedAt = usedAt;
    this.#allowedBuildings = allowedBuildings;
    this.#metadata = metadata;
  }

  public static create(data: {
    id?: string;
    key: string;
    validDate: Date;
    usedAt?: Date | null;
    allowedBuildings?: number;
    metadata?: Record<string, unknown>;

    createdAt?: string;
    updatedAt?: string;
  }): LicenseEntity {
    const allowedBuildings = data.allowedBuildings ?? 1;
    const metadata = data.metadata ?? {};
    const license = new LicenseEntity(
      data.id,
      data.key,
      data.validDate,
      data.usedAt ?? null,
      allowedBuildings,
      metadata,

      data.createdAt,
      data.updatedAt,
    );

    license.addEvent(new LicenseCreatedEvent(license.id, data.key, data.validDate));

    return license;
  }

  public get key(): string {
    return this.#key;
  }

  public get validDate(): Date {
    return this.#validDate;
  }

  public get usedAt(): Date | null {
    return this.#usedAt;
  }

  public get allowedBuildings(): number {
    return this.#allowedBuildings;
  }

  public get metadata(): Record<string, unknown> {
    return this.#metadata;
  }

  public get isUsed(): boolean {
    return this.#usedAt !== null;
  }

  public get isExpired(): boolean {
    return new Date() > this.#validDate;
  }

  public isValid(): boolean {
    return !this.isUsed && !this.isExpired;
  }

  public markAsUsed(): void {
    if (this.#usedAt) {
      throw new Error('License is already used');
    }

    if (this.isExpired) {
      throw new Error('License is no longer valid');
    }

    this.#usedAt = new Date();
    this.markUpdated();

    this.addEvent(new LicenseUsedEvent(this.id, this.#key));
  }
}
