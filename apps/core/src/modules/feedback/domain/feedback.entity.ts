import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {FeedbackCreatedEvent} from './events/feedback-created.event';

export class FeedbackEntity extends BaseEntity {
  #content: string;
  #metadata: Record<string, unknown>;

  private constructor(
    id: string | undefined,
    content: string,
    metadata: Record<string, unknown>,
    createdAt?: string,
    updatedAt?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#content = content;
    this.#metadata = metadata;
  }

  public static create(data: {
    id?: string;
    content: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
  }): FeedbackEntity {
    const feedback = new FeedbackEntity(data.id, data.content, data.metadata ?? {}, data.createdAt, data.updatedAt);

    feedback.addEvent(new FeedbackCreatedEvent(feedback.id, feedback.content, feedback.metadata));

    return feedback;
  }

  public get content(): string {
    return this.#content;
  }

  public get metadata(): Record<string, unknown> {
    return this.#metadata;
  }
}
