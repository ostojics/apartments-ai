import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {ContactCreatedEvent} from './events/contact-created.event';

export class ContactEntity extends BaseEntity {
  #name: string;
  #email: string;
  #phoneNumber: string | null;
  #preferredLanguage: string;
  #tenantId: string;

  private constructor(
    id: string | undefined,
    name: string,
    email: string,
    phoneNumber: string | null,
    preferredLanguage: string,
    tenantId: string,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#name = name;
    this.#email = email;
    this.#phoneNumber = phoneNumber;
    this.#preferredLanguage = preferredLanguage;
    this.#tenantId = tenantId;
  }

  public static create(data: {
    id?: string;
    name: string;
    email: string;
    phoneNumber?: string | null;
    preferredLanguage: string;
    tenantId: string;
    createdAt?: string;
    updatedAt?: string;
  }): ContactEntity {
    const contact = new ContactEntity(
      data.id,
      data.name,
      data.email,
      data.phoneNumber ?? null,
      data.preferredLanguage,
      data.tenantId,
      data.createdAt,
      data.updatedAt,
    );

    if (!data.id) {
      contact.addEvent(
        new ContactCreatedEvent(
          contact.id,
          data.tenantId,
          data.name,
          data.email,
          data.phoneNumber ?? null,
          data.preferredLanguage,
        ),
      );
    }

    return contact;
  }

  public get name(): string {
    return this.#name;
  }

  public get email(): string {
    return this.#email;
  }

  public get phoneNumber(): string | null {
    return this.#phoneNumber;
  }

  public get preferredLanguage(): string {
    return this.#preferredLanguage;
  }

  public get tenantId(): string {
    return this.#tenantId;
  }
}
