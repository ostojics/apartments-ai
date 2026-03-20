import {EntityManager} from 'typeorm';

export const TRANSACTION_CONTEXT = Symbol('TRANSACTION_CONTEXT');

export interface ITransactionContext {
  getManager(): EntityManager | null;
  runWithManager<T>(manager: EntityManager, work: () => Promise<T>): Promise<T>;
}
