import {ContactEntity} from '../contact.entity';

export const CONTACT_REPOSITORY = Symbol('CONTACT_REPOSITORY');

export interface IContactRepository {
  save(contact: ContactEntity): Promise<void>;
  findById(id: string): Promise<ContactEntity | null>;
}
