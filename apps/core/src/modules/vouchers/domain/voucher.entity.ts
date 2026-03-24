import {BaseEntity} from 'src/libs/domain/entities/entity.base';
import {VoucherDiscountPercent} from './value-objects/voucher-discount-percent.value-object';
import {VoucherStatus} from './value-objects/voucher-status.value-object';
import {addDays, isBefore} from 'date-fns';
import {VoucherCodeGenerator} from '../application/services/voucher-code.generator';

export type VoucherStatusValue = 'issued' | 'redeemed' | 'expired';

export class VoucherEntity extends BaseEntity {
  #code: string;
  #discountPercent: VoucherDiscountPercent;
  #expiresAt: Date;
  #status: VoucherStatus;
  #email: string | null;
  #tenantId: string;
  #metadata: Record<string, unknown>;
  #redeemedAt: Date | null;

  private constructor(props: {
    id?: string;
    code: string;
    discountPercent: VoucherDiscountPercent;
    expiresAt: Date;
    status?: VoucherStatus;
    email?: string | null;
    tenantId: string;
    metadata?: Record<string, unknown>;
    redeemedAt?: Date | null;
    createdAt?: string;
    updatedAt?: string;
  }) {
    super(props.id, props.createdAt, props.updatedAt);

    this.#code = props.code;
    this.#discountPercent = props.discountPercent;
    this.#expiresAt = props.expiresAt;
    this.#status = props.status ?? VoucherStatus.create('issued');
    this.#email = props.email ?? null;
    this.#tenantId = props.tenantId;
    this.#metadata = {...(props.metadata ?? {})};
    this.#redeemedAt = props.redeemedAt ?? null;
  }

  static create(props: {
    id?: string;
    code?: string;
    discountPercent?: number;
    expiresAt?: Date;
    status?: VoucherStatusValue;
    email?: string | null;
    tenantId: string;
    metadata?: Record<string, unknown>;
    redeemedAt?: Date | null;
    createdAt?: string;
    updatedAt?: string;
  }): VoucherEntity {
    return new VoucherEntity({
      ...props,
      code: props.code ?? VoucherCodeGenerator.generate(),
      expiresAt: props.expiresAt ?? addDays(new Date(), 180),
      discountPercent: VoucherDiscountPercent.create(props.discountPercent ?? 10),
      status: VoucherStatus.create(props.status ?? 'issued'),
    });
  }

  get code(): string {
    return this.#code;
  }

  get discountPercent(): number {
    return this.#discountPercent.getValue();
  }

  get expiresAt(): Date {
    return this.#expiresAt;
  }

  get status(): VoucherStatusValue {
    return this.#status.getValue();
  }

  get email(): string | null {
    return this.#email;
  }

  get tenantId(): string {
    return this.#tenantId;
  }

  get metadata(): Record<string, unknown> {
    return {...this.#metadata};
  }

  get redeemedAt(): Date | null {
    return this.#redeemedAt;
  }

  markRedeemed(): void {
    if (this.#status.getValue() === 'redeemed') {
      return;
    }

    this.#status = VoucherStatus.create('redeemed');
    this.#redeemedAt = new Date();
    this.markUpdated();
  }

  markExpired(): void {
    this.#status = VoucherStatus.create('expired');
    this.markUpdated();
  }

  isExpired(referenceDate: Date = new Date()): boolean {
    return isBefore(this.#expiresAt, referenceDate);
  }
}
