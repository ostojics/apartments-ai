import {HouseholdEntity} from '../household.entity';

export const HOUSEHOLD_REPOSITORY = Symbol('HOUSEHOLD_REPOSITORY');

export interface IHouseholdRepository {
  create(household: HouseholdEntity): Promise<void>;
  findById(id: string): Promise<HouseholdEntity | null>;
  findByAuthorId(authorId: string): Promise<HouseholdEntity | null>;
  update(household: HouseholdEntity): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
