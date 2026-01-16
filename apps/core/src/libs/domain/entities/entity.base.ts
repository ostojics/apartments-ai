import {randomUUID} from 'crypto';
import {DomainEvent} from '../events/domain.event.base';

export abstract class BaseEntity {
  readonly #id: string;
  readonly #createdAt: string;
  #updatedAt: string;
  private domainEvents: DomainEvent[];

  constructor(id?: string, createdAt?: string, updatedAt?: string) {
    const now = new Date().toISOString();
    this.#id = id ?? randomUUID();
    this.#createdAt = createdAt ?? now;
    this.#updatedAt = updatedAt ?? now;
    this.domainEvents = [];
  }

  get id(): string {
    return this.#id;
  }

  get createdAt(): string {
    return this.#createdAt;
  }

  get updatedAt(): string {
    return this.#updatedAt;
  }

  /**
   * Internal method to update the timestamp when
   * a child entity's state changes.
   */
  protected markUpdated(): void {
    this.#updatedAt = new Date().toISOString();
  }

  public addEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public clearEvents() {
    this.domainEvents = [];
  }

  public getEvents(): DomainEvent[] {
    return this.domainEvents;
  }
}
