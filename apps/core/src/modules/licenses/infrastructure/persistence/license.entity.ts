import {Entity, Column, PrimaryColumn, CreateDateColumn} from 'typeorm';

@Entity('licenses')
export class LicenseOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', {unique: true})
  key: string;

  @Column('timestamp with time zone', {name: 'expires_at'})
  expiresAt: Date;

  @Column('timestamp with time zone', {name: 'used_at', nullable: true})
  usedAt: Date | null;

  @Column('text', {nullable: true})
  note: string | null;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;
}
