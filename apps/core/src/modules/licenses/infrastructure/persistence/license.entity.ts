import {Entity, Column, PrimaryColumn, CreateDateColumn} from 'typeorm';

@Entity('licenses')
export class LicenseOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', {unique: true})
  key: string;

  @Column('timestamp with time zone', {name: 'valid_date'})
  validDate: Date;

  @Column('timestamp with time zone', {name: 'used_at', nullable: true})
  usedAt: Date | null;

  @Column('integer', {name: 'allowed_buildings'})
  allowedBuildings: number;

  @Column('jsonb')
  metadata: Record<string, unknown>;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;
}
