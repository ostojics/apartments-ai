import {KnowledgeBaseEntity} from 'src/modules/knowledge-bases/domain/knowledge-base.entity';

export interface IBuildingsKnowledgeBaseRepositoryPort {
  findByBuildingIdAndTenantId(buildingId: string, tenantId: string): Promise<KnowledgeBaseEntity | null>;
}
