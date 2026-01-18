import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {BuildingCreatedEvent} from './events/building-created.event';
import {BuildingUpdatedEvent} from './events/building-updated.event';

export class BuildingEntity extends BaseEntity {
  #name: string;
  #slug: string;
  #tenantId: string;
  #imageUrl: string | null;
  #address: string | null;

  private constructor(
    id: string | undefined,
    name: string,
    slug: string,
    tenantId: string,
    imageUrl: string | null,
    address: string | null,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#name = name;
    this.#slug = slug;
    this.#tenantId = tenantId;
    this.#imageUrl = imageUrl;
    this.#address = address;
  }

  public static create(data: {
    id?: string;
    name: string;
    slug: string;
    tenantId: string;
    imageUrl?: string | null;
    address?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }): BuildingEntity {
    const building = new BuildingEntity(
      data.id,
      data.name,
      data.slug,
      data.tenantId,
      data.imageUrl ?? null,
      data.address ?? null,
      data.createdAt,
      data.updatedAt,
    );

    building.addEvent(new BuildingCreatedEvent(building.id, data.name, data.slug, data.tenantId));

    return building;
  }

  public get name(): string {
    return this.#name;
  }

  public get slug(): string {
    return this.#slug;
  }

  public get tenantId(): string {
    return this.#tenantId;
  }

  public get imageUrl(): string | null {
    return this.#imageUrl;
  }

  public get address(): string | null {
    return this.#address;
  }

  public updateName(newName: string): void {
    this.update({name: newName});
  }

  public updateSlug(newSlug: string): void {
    this.update({slug: newSlug});
  }

  public updateImageUrl(newImageUrl: string | null): void {
    this.update({imageUrl: newImageUrl});
  }

  public updateAddress(newAddress: string | null): void {
    this.update({address: newAddress});
  }

  public update(data: {name?: string; slug?: string; imageUrl?: string | null; address?: string | null}): void {
    const updatedFields: {
      name?: string;
      slug?: string;
      imageUrl?: string | null;
      address?: string | null;
    } = {};

    if (data.name !== undefined && data.name !== this.#name) {
      this.#name = data.name;
      updatedFields.name = data.name;
    }

    if (data.slug !== undefined && data.slug !== this.#slug) {
      this.#slug = data.slug;
      updatedFields.slug = data.slug;
    }

    if (data.imageUrl !== undefined && data.imageUrl !== this.#imageUrl) {
      this.#imageUrl = data.imageUrl;
      updatedFields.imageUrl = data.imageUrl;
    }

    if (data.address !== undefined && data.address !== this.#address) {
      this.#address = data.address;
      updatedFields.address = data.address;
    }

    if (Object.keys(updatedFields).length === 0) {
      return;
    }

    this.addEvent(new BuildingUpdatedEvent(this.id, updatedFields));

    this.markUpdated();
  }
}
