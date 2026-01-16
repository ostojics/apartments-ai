export abstract class DomainEvent {
  public readonly occurredOn: string;
  public readonly aggregateId: string;

  constructor(aggregateId: string) {
    this.occurredOn = new Date().toISOString();
    this.aggregateId = aggregateId;
  }
}
