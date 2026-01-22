import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('building_information')
export class BuildingInformationOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', {name: 'knowledge_base_id'})
  knowledgeBaseId: string;

  @Column('uuid', {name: 'building_id'})
  buildingId: string;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @Column('text')
  locale: string;

  @Column('text')
  content: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;
}
