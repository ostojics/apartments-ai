import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {KnowledgeBaseCreatedEvent} from './events/knowledge-base-created.event';
import {KnowledgeBaseUpdatedEvent} from './events/knowledge-base-updated.event';

export class KnowledgeBaseEntity extends BaseEntity {
  #buildingId: string;
  #tenantId: string;
  #knowledge: string;
  #information: string;
  #metadata: Record<string, unknown>;

  private constructor(
    id: string | undefined,
    buildingId: string,
    tenantId: string,
    knowledge: string,
    information: string,
    metadata: Record<string, unknown>,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#buildingId = buildingId;
    this.#tenantId = tenantId;
    this.#knowledge = knowledge;
    this.#information = information;
    this.#metadata = metadata;
  }

  public static create(data: {
    id?: string;
    buildingId: string;
    tenantId: string;
    knowledge: string;
    information: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
  }): KnowledgeBaseEntity {
    const knowledgeBase = new KnowledgeBaseEntity(
      data.id,
      data.buildingId,
      data.tenantId,
      data.knowledge,
      data.information,
      data.metadata ?? {},
      data.createdAt,
      data.updatedAt,
    );

    knowledgeBase.addEvent(new KnowledgeBaseCreatedEvent(knowledgeBase.id, data.buildingId, data.tenantId));

    return knowledgeBase;
  }

  public get buildingId(): string {
    return this.#buildingId;
  }

  public get tenantId(): string {
    return this.#tenantId;
  }

  public get knowledge(): string {
    return this.#knowledge;
  }

  public get information(): string {
    return this.#information;
  }

  public get metadata(): Record<string, unknown> {
    return this.#metadata;
  }

  public update(data: {knowledge?: string; information?: string; metadata?: Record<string, unknown>}): void {
    if (data.knowledge !== undefined) {
      this.#knowledge = data.knowledge;
    }

    if (data.information !== undefined) {
      this.#information = data.information;
    }

    if (data.metadata !== undefined) {
      this.#metadata = data.metadata;
    }

    this.addEvent(
      new KnowledgeBaseUpdatedEvent(this.id, {
        knowledge: data.knowledge,
        information: data.information,
        metadata: data.metadata,
      }),
    );

    this.markUpdated();
  }
}
