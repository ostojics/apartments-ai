import {QueryBase} from 'src/libs/domain/queries/query.base';

export interface BuildingInformationQueryProps {
  buildingSlug: string;
  tenantId: string;
  locale: string;
}

export class BuildingInformationQuery extends QueryBase {
  public readonly buildingSlug: string;
  public readonly tenantId: string;
  public readonly locale: string;

  constructor(props: BuildingInformationQueryProps) {
    super();
    this.buildingSlug = props.buildingSlug;
    this.tenantId = props.tenantId;
    this.locale = props.locale;
  }
}
