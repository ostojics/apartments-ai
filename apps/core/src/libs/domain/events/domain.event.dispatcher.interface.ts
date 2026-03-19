import {BaseEntity} from '../entities/entity.base';

export const DOMAIN_EVENT_DISPATCHER = Symbol('DOMAIN_EVENT_DISPATCHER');

export interface IDomainEventDispatcher {
  dispatch(entity: BaseEntity): void;
}
