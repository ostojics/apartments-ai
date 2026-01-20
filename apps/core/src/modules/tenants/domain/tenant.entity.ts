import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {TenantCreatedEvent} from './events/tenant-created.event';

export class TenantEntity extends BaseEntity {
  #name: string;
  #slug: string;
  #licenseId: string;

  private constructor(
    id: string | undefined,
    name: string,
    slug: string,
    licenseId: string,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#name = name;
    this.#slug = slug;
    this.#licenseId = licenseId;
  }

  public static create(data: {
    id?: string;
    name: string;
    slug: string;
    licenseId: string;
    createdAt?: string;
    updatedAt?: string;
  }): TenantEntity {
    const tenant = new TenantEntity(data.id, data.name, data.slug, data.licenseId, data.createdAt, data.updatedAt);

    if (!data.id) {
      tenant.addEvent(new TenantCreatedEvent(tenant.id, data.name, data.slug, data.licenseId));
    }

    return tenant;
  }

  public get name(): string {
    return this.#name;
  }

  public get slug(): string {
    return this.#slug;
  }

  public get licenseId(): string {
    return this.#licenseId;
  }
}
