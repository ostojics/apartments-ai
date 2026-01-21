import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('knowledge_bases')
export class KnowledgeBaseOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', {name: 'building_id'})
  buildingId: string;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @Column('text')
  knowledge: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('jsonb', {default: () => "'{}'::jsonb"})
  metadata: Record<string, unknown>;
}
