import {BaseEntity} from 'src/libs/domain/entities/entity.base';

export class DeadLetterEntity extends BaseEntity {
  #outboxId: string;
  #jobType: string;
  #payload: Record<string, unknown>;
  #tenantId: string;
  #error: string;
  #attempts: number;

  private constructor(props: {
    id?: string;
    outboxId: string;
    jobType: string;
    payload: Record<string, unknown>;
    tenantId: string;
    error: string;
    attempts: number;
    createdAt?: string;
    updatedAt?: string;
  }) {
    super(props.id, props.createdAt, props.updatedAt);

    this.#outboxId = props.outboxId;
    this.#jobType = props.jobType;
    this.#payload = {...props.payload};
    this.#tenantId = props.tenantId;
    this.#error = props.error;
    this.#attempts = props.attempts;
  }

  static create(props: {
    id?: string;
    outboxId: string;
    jobType: string;
    payload: Record<string, unknown>;
    tenantId: string;
    error: string;
    attempts: number;
    createdAt?: string;
    updatedAt?: string;
  }): DeadLetterEntity {
    return new DeadLetterEntity(props);
  }

  get outboxId(): string {
    return this.#outboxId;
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

  get error(): string {
    return this.#error;
  }

  get attempts(): number {
    return this.#attempts;
  }
}
