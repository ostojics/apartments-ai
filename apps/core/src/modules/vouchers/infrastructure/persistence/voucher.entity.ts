import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';
import {VoucherStatusValue} from '../../domain/voucher.entity';

@Entity('vouchers')
export class VoucherOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', {length: 32, unique: true})
  code: string;

  @Column('integer', {name: 'discount_percent', default: 10})
  discountPercent: number;

  @Column('timestamp with time zone', {name: 'expires_at'})
  expiresAt: Date;

  @Column('varchar', {length: 16, default: 'issued'})
  status: VoucherStatusValue;

  @Column('varchar', {length: 320, nullable: true})
  email: string | null;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @Column('jsonb', {nullable: true})
  metadata: Record<string, unknown> | null;

  @Column('timestamp with time zone', {name: 'redeemed_at', nullable: true})
  redeemedAt: Date | null;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('timestamp with time zone', {name: 'updated_at', default: () => 'now()'})
  updatedAt: Date;
}
