import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('dead_letter_queue')
export class DeadLetterOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', {name: 'outbox_id'})
  outboxId: string;

  @Column('varchar', {name: 'job_type'})
  jobType: string;

  @Column('jsonb')
  payload: Record<string, unknown>;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @Column('text')
  error: string;

  @Column('integer')
  attempts: number;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('timestamp with time zone', {name: 'updated_at', default: () => 'now()'})
  updatedAt: Date;
}
