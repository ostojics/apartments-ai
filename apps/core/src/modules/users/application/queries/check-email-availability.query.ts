import {QueryBase} from 'src/libs/domain/queries/query.base';

export interface CheckEmailAvailabilityQueryResult {
  available: boolean;
}

export class CheckEmailAvailabilityQuery extends QueryBase {
  constructor(public readonly email: string) {
    super();
  }
}
