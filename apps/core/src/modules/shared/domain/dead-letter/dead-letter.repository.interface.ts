import {DeadLetterEntity} from './dead-letter.entity';

export const DEAD_LETTER_REPOSITORY = Symbol('DEAD_LETTER_REPOSITORY');

export interface IDeadLetterRepository {
  save(deadLetter: DeadLetterEntity): Promise<void>;
}
