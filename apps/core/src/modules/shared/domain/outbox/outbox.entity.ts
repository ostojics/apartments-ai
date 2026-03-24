import {BaseEntity} from 'src/libs/domain/entities/entity.base';

export type OutboxStatus = 'pending' | 'queued' | 'sent' | 'failed';

export class OutboxEntity extends BaseEntity {
  #jobType: string;
  #payload: Record<string, unknown>;
  #tenantId: string;
  #status: OutboxStatus;
  #attempts: number;
  #sentAt: Date | null;
  #lastError: string | null;
  #result: Record<string, unknown> | null;

  private constructor(props: {
    id?: string;
    jobType: string;
    payload: Record<string, unknown>;
    tenantId: string;
    status?: OutboxStatus;
    attempts?: number;
    sentAt?: Date | null;
    lastError?: string | null;
    result?: Record<string, unknown> | null;
    createdAt?: string;
    updatedAt?: string;
  }) {
    super(props.id, props.createdAt, props.updatedAt);

    this.#jobType = props.jobType;
    this.#payload = {...props.payload};
    this.#tenantId = props.tenantId;
    this.#status = props.status ?? 'pending';
    this.#attempts = props.attempts ?? 0;
    this.#sentAt = props.sentAt ?? null;
    this.#lastError = props.lastError ?? null;
    this.#result = props.result ? {...props.result} : null;
  }

  static create(props: {
    id?: string;
    jobType: string;
    payload: Record<string, unknown>;
    tenantId: string;
    status?: OutboxStatus;
    attempts?: number;
    sentAt?: Date | null;
    lastError?: string | null;
    result?: Record<string, unknown> | null;
    createdAt?: string;
    updatedAt?: string;
  }): OutboxEntity {
    return new OutboxEntity(props);
  }

  get jobType(): string {
    return this.#jobType;
  }

  get payload(): Record<string, unknown> {
    return {...this.#payload};
  }

  get tenantId(): string {
    return this.#tenantId;
  }

  get status(): OutboxStatus {
    return this.#status;
  }

  get attempts(): number {
    return this.#attempts;
  }

  get sentAt(): Date | null {
    return this.#sentAt;
  }

  get lastError(): string | null {
    return this.#lastError;
  }

  get result(): Record<string, unknown> | null {
    return this.#result ? {...this.#result} : null;
  }

  markQueued(): void {
    this.#status = 'queued';
    this.#attempts += 1;
    this.markUpdated();
  }

  markSent(result: Record<string, unknown>, now = new Date()): void {
    this.#status = 'sent';
    this.#result = {...result};
    this.#sentAt = now;
    this.#lastError = null;
    this.markUpdated();
  }

  markFailed(params: {error: string}): void {
    this.#status = 'failed';
    this.#lastError = params.error;
    this.#attempts += 1;
    this.markUpdated();
  }
}
