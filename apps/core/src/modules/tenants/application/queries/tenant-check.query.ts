import {QueryBase} from 'src/libs/domain/queries/query.base';

export interface TenantCheckQueryProps {
  slug: string;
}

export class TenantCheckQuery extends QueryBase {
  public readonly slug: string;

  constructor(props: TenantCheckQueryProps) {
    super();
    this.slug = props.slug;
  }
}
