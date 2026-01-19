import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {KnowledgeBaseQuery} from '../queries/knowledge-base.query';
import {
  IKnowledgeBaseRepository,
  KNOWLEDGE_BASE_REPOSITORY,
} from 'src/modules/knowledge-bases/domain/repositories/knowledge-base.repository.interface';

export interface KnowledgeBaseResult {
  id: string;
  buildingId: string;
  tenantId: string;
  knowledge: string;
  information: string;
  metadata: Record<string, unknown>;
}

@QueryHandler(KnowledgeBaseQuery)
export class KnowledgeBaseHandler implements IQueryHandler<KnowledgeBaseQuery, KnowledgeBaseResult | null> {
  constructor(@Inject(KNOWLEDGE_BASE_REPOSITORY) private readonly knowledgeBaseRepository: IKnowledgeBaseRepository) {}

  async execute(query: KnowledgeBaseQuery): Promise<KnowledgeBaseResult | null> {
    const knowledgeBase = await this.knowledgeBaseRepository.findByBuildingId(query.buildingId);
    if (!knowledgeBase) {
      return null;
    }

    return {
      id: knowledgeBase.id,
      buildingId: knowledgeBase.buildingId,
      tenantId: knowledgeBase.tenantId,
      knowledge: knowledgeBase.knowledge,
      information: knowledgeBase.information,
      metadata: knowledgeBase.metadata,
    };
  }
}
