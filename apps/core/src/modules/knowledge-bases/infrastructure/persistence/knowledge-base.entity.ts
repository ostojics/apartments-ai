import {Column, Entity, PrimaryColumn} from 'typeorm';

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

  @Column('text')
  information: string;

  @Column('jsonb', {default: () => "'{}'::jsonb"})
  metadata: Record<string, unknown>;
}
