import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('tenants')
export class TenantOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  slug: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @Column('uuid', {name: 'license_id'})
  licenseId: string;
}
