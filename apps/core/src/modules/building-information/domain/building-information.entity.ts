import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {BuildingInformationCreatedEvent} from './events/building-information-created.event';

export class BuildingInformationEntity extends BaseEntity {
  #knowledgeBaseId: string;
  #buildingId: string;
  #tenantId: string;
  #locale: string;
  #content: string;

  private constructor(
    id: string | undefined,
    knowledgeBaseId: string,
    buildingId: string,
    tenantId: string,
    locale: string,
    content: string,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#knowledgeBaseId = knowledgeBaseId;
    this.#buildingId = buildingId;
    this.#tenantId = tenantId;
    this.#locale = locale;
    this.#content = content;
  }

  public static create(data: {
    id?: string;
    knowledgeBaseId: string;
    buildingId: string;
    tenantId: string;
    locale: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
  }): BuildingInformationEntity {
    const information = new BuildingInformationEntity(
      data.id,
      data.knowledgeBaseId,
      data.buildingId,
      data.tenantId,
      data.locale,
      data.content,
      data.createdAt,
      data.updatedAt,
    );

    if (!data.id) {
      information.addEvent(
        new BuildingInformationCreatedEvent(
          information.id,
          data.knowledgeBaseId,
          data.buildingId,
          data.tenantId,
          data.locale,
          data.content,
        ),
      );
    }

    return information;
  }

  public get knowledgeBaseId(): string {
    return this.#knowledgeBaseId;
  }

  public get buildingId(): string {
    return this.#buildingId;
  }

  public get tenantId(): string {
    return this.#tenantId;
  }

  public get locale(): string {
    return this.#locale;
  }

  public get content(): string {
    return this.#content;
  }
}
