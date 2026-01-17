import {DomainEvent} from 'src/libs/domain/events/domain.event.base';

export class FeedbackCreatedEvent extends DomainEvent {
  constructor(
    public readonly feedbackId: string,
    public readonly content: string,
    public readonly metadata: Record<string, unknown>,
  ) {
    super(feedbackId);
  }
}
