import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {FeedbackCreatedEvent} from './events/feedback-created.event';

export class FeedbackEntity extends BaseEntity {
  #tenantId: string;
  #content: string;
  #metadata: Record<string, unknown>;

  private constructor(
    id: string | undefined,
    tenantId: string,
    content: string,
    metadata: Record<string, unknown>,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#tenantId = tenantId;
    this.#content = content;
    this.#metadata = metadata;
  }

  public static create(data: {
    id?: string;
    tenantId: string;
    content: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
  }): FeedbackEntity {
    const metadata = {...(data.metadata ?? {})};
    const feedback = new FeedbackEntity(data.id, data.tenantId, data.content, metadata, data.createdAt, data.updatedAt);

    if (!data.id) {
      feedback.addEvent(new FeedbackCreatedEvent(feedback.id, feedback.content, {...metadata}));
    }

    return feedback;
  }

  public get content(): string {
    return this.#content;
  }

  public get tenantId(): string {
    return this.#tenantId;
  }

  public get metadata(): Record<string, unknown> {
    return {...this.#metadata};
  }
}
