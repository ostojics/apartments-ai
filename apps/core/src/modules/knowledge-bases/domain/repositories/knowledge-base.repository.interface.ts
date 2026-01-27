import {KnowledgeBaseEntity} from '../knowledge-base.entity';

export const KNOWLEDGE_BASE_REPOSITORY = Symbol('KNOWLEDGE_BASE_REPOSITORY');

export interface IKnowledgeBaseRepository {
  save(knowledgeBase: KnowledgeBaseEntity): Promise<void>;
  findById(id: string): Promise<KnowledgeBaseEntity | null>;
  findByBuildingId(buildingId: string): Promise<KnowledgeBaseEntity | null>;
  findByBuildingIdAndTenantId(buildingId: string, tenantId: string): Promise<KnowledgeBaseEntity | null>;
  findByTenantId(tenantId: string): Promise<KnowledgeBaseEntity | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
