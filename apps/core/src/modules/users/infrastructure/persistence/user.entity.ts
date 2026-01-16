import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', {name: 'household_id'})
  householdId: string;

  @Column('varchar', {length: 50, unique: true})
  username: string;

  @Column('varchar', {length: 255, unique: true})
  email: string;

  @Column('varchar', {length: 255, name: 'password_hash'})
  passwordHash: string;

  @Column('boolean', {name: 'is_household_author', default: false})
  isHouseholdAuthor: boolean;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
  updatedAt: Date;
}
