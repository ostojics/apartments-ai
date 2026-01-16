import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {LicenseCreatedEvent} from './events/license-created.event';
import {LicenseUsedEvent} from './events/license-used.event';

export class LicenseEntity extends BaseEntity {
  #key: string;
  #expiresAt: Date;
  #usedAt: Date | null;
  #note: string | null;

  private constructor(
    id: string | undefined,
    key: string,
    expiresAt: Date,
    usedAt: Date | null,
    note: string | null,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#key = key;
    this.#expiresAt = expiresAt;
    this.#usedAt = usedAt;
    this.#note = note;
  }

  public static create(data: {
    id?: string;
    key: string;
    expiresAt: Date;
    usedAt?: Date | null;
    note?: string | null;

    createdAt?: string;
    updatedAt?: string;
  }): LicenseEntity {
    const license = new LicenseEntity(
      data.id,
      data.key,
      data.expiresAt,
      data.usedAt ?? null,
      data.note ?? null,

      data.createdAt,
      data.updatedAt,
    );

    license.addEvent(new LicenseCreatedEvent(license.id, data.key, data.expiresAt));

    return license;
  }

  public get key(): string {
    return this.#key;
  }

  public get expiresAt(): Date {
    return this.#expiresAt;
  }

  public get usedAt(): Date | null {
    return this.#usedAt;
  }

  public get note(): string | null {
    return this.#note;
  }

  public get isUsed(): boolean {
    return this.#usedAt !== null;
  }

  public get isExpired(): boolean {
    return new Date() > this.#expiresAt;
  }

  public isValid(): boolean {
    return !this.isUsed && !this.isExpired;
  }

  public markAsUsed(): void {
    if (this.#usedAt) {
      throw new Error('License is already used');
    }

    if (this.isExpired) {
      throw new Error('License has expired');
    }

    this.#usedAt = new Date();
    this.markUpdated();

    this.addEvent(new LicenseUsedEvent(this.id, this.#key));
  }

  public updateNote(note: string): void {
    this.#note = note;
    this.markUpdated();
  }

  public extendExpiration(newExpirationDate: Date): void {
    if (newExpirationDate <= this.#expiresAt) {
      throw new Error('New expiration date must be later than current expiration date');
    }

    this.#expiresAt = newExpirationDate;
    this.markUpdated();
  }
}
