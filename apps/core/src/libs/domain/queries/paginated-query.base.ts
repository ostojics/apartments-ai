import {QueryBase} from './query.base';

export interface PaginatedQueryProps {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export abstract class PaginatedQueryBase extends QueryBase {
  public readonly page: number;
  public readonly pageSize: number;
  public readonly sortBy?: string;
  public readonly sortOrder?: 'asc' | 'desc';

  constructor(props: PaginatedQueryProps = {}) {
    super();
    this.page = props.page ?? 1;
    this.pageSize = props.pageSize ?? 20;
    this.sortBy = props.sortBy;
    this.sortOrder = props.sortOrder;
  }
}
