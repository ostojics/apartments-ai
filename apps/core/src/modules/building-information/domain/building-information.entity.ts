import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {BuildingInformationCreatedEvent} from './events/building-information-created.event';

export class BuildingInformationEntity extends BaseEntity {
  #knowledgeBaseId: string;
  #locale: string;
  #content: string;

  private constructor(
    id: string | undefined,
    knowledgeBaseId: string,
    locale: string,
    content: string,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#knowledgeBaseId = knowledgeBaseId;
    this.#locale = locale;
    this.#content = content;
  }

  public static create(data: {
    id?: string;
    knowledgeBaseId: string;
    locale: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
  }): BuildingInformationEntity {
    const information = new BuildingInformationEntity(
      data.id,
      data.knowledgeBaseId,
      data.locale,
      data.content,
      data.createdAt,
      data.updatedAt,
    );

    if (!data.id) {
      information.addEvent(
        new BuildingInformationCreatedEvent(information.id, data.knowledgeBaseId, data.locale, data.content),
      );
    }

    return information;
  }

  public get knowledgeBaseId(): string {
    return this.#knowledgeBaseId;
  }

  public get locale(): string {
    return this.#locale;
  }

  public get content(): string {
    return this.#content;
  }
}
