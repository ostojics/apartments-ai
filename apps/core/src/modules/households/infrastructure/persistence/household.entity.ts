import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('households')
export class HouseholdOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', {length: 255})
  name: string;

  @Column('char', {length: 3, name: 'currency_code', default: 'USD'})
  currencyCode: string;

  @Column('decimal', {precision: 18, scale: 2, name: 'monthly_budget', default: 5000})
  monthlyBudget: number;

  @Column('uuid', {name: 'license_id', unique: true})
  licenseId: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
  updatedAt: Date;
}
