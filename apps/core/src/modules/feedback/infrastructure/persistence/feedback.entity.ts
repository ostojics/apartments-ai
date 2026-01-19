import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('feedback')
export class FeedbackOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('text')
  content: string;

  @Column('jsonb', {default: () => "'{}'::jsonb"})
  metadata: Record<string, unknown>;
}
