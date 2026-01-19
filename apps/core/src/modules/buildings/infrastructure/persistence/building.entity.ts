import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('buildings')
export class BuildingOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  slug: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @Column('text', {name: 'image_url', nullable: true})
  imageUrl: string | null;

  @Column('text', {nullable: true})
  address: string | null;
}
