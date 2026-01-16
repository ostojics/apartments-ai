import {QueryBase} from 'src/libs/domain/queries/query.base';

export interface GetMeQueryResult {
  id: string;
  householdId: string;
  username: string;
  email: string;
  isHouseholdAuthor: boolean;
  createdAt: string;
  updatedAt: string;
}

export class GetMeQuery extends QueryBase {
  constructor(public readonly userId: string) {
    super();
  }
}
