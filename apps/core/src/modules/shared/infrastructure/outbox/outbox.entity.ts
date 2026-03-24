import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';
import {OutboxStatus} from '../../domain/outbox/outbox.entity';

@Entity('outbox')
export class OutboxOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', {name: 'job_type'})
  jobType: string;

  @Column('jsonb')
  payload: Record<string, unknown>;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @Column('varchar', {length: 16, default: 'pending'})
  status: OutboxStatus;

  @Column('integer', {default: 0})
  attempts: number;

  @Column('timestamp with time zone', {name: 'sent_at', nullable: true})
  sentAt: Date | null;

  @Column('text', {name: 'last_error', nullable: true})
  lastError: string | null;

  @Column('jsonb', {nullable: true})
  result: Record<string, unknown> | null;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('timestamp with time zone', {name: 'updated_at', default: () => 'now()'})
  updatedAt: Date;
}
