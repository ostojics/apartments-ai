import {QueryBase} from 'src/libs/domain/queries/query.base';

export interface KnowledgeBaseQueryProps {
  buildingId: string;
}

export class KnowledgeBaseQuery extends QueryBase {
  public readonly buildingId: string;

  constructor(props: KnowledgeBaseQueryProps) {
    super();
    this.buildingId = props.buildingId;
  }
}
