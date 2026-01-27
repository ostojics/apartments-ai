import {Injectable} from '@nestjs/common';
import {IBuildingsKnowledgeBaseRepositoryPort} from 'src/modules/buildings/application/ports/buildings.knowledge-base.repository.port';
import {IKnowledgeBaseRepository} from '../../domain/repositories/knowledge-base.repository.interface';
import {KnowledgeBaseEntity} from '../../domain/knowledge-base.entity';

@Injectable()
export class BuildingsKnowledgeBaseRepositoryAdapter implements IBuildingsKnowledgeBaseRepositoryPort {
  constructor(private readonly knowledgeBaseRepository: IKnowledgeBaseRepository) {}

  async findByBuildingIdAndTenantId(buildingId: string, tenantId: string): Promise<KnowledgeBaseEntity | null> {
    return await this.knowledgeBaseRepository.findByBuildingIdAndTenantId(buildingId, tenantId);
  }
}
