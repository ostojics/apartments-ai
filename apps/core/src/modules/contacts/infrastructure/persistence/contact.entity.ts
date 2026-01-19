import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('contacts')
export class ContactOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text', {name: 'phone_number', nullable: true})
  phoneNumber: string | null;

  @Column('text', {name: 'preferred_language'})
  preferredLanguage: string;

  @Column('uuid', {name: 'tenant_id'})
  tenantId: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;
}
