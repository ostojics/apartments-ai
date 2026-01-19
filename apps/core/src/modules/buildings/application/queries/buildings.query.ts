import {QueryBase} from 'src/libs/domain/queries/query.base';

export interface BuildingsQueryProps {
  tenantId: string;
}

export class BuildingsQuery extends QueryBase {
  public readonly tenantId: string;

  constructor(props: BuildingsQueryProps) {
    super();
    this.tenantId = props.tenantId;
  }
}
