import {KnowledgeBaseHandler} from './knowledge-base.query.handler';
import {KnowledgeBaseQuery} from '../queries/knowledge-base.query';
import {IKnowledgeBaseRepository} from 'src/modules/knowledge-bases/domain/repositories/knowledge-base.repository.interface';
import {KnowledgeBaseEntity} from 'src/modules/knowledge-bases/domain/knowledge-base.entity';

describe('KnowledgeBaseHandler', () => {
  const createKnowledgeBaseRepository = (): jest.Mocked<IKnowledgeBaseRepository> => ({
    create: jest.fn(),
    findById: jest.fn(),
    findByBuildingId: jest.fn(),
    findByTenantId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  });

  it('returns null when no knowledge base is found', async () => {
    const knowledgeBaseRepository = createKnowledgeBaseRepository();
    knowledgeBaseRepository.findByBuildingId.mockResolvedValue(null);

    const handler = new KnowledgeBaseHandler(knowledgeBaseRepository);
    const result = await handler.execute(new KnowledgeBaseQuery({buildingId: 'building-1'}));

    expect(result).toBeNull();
  });

  it('returns knowledge base details when found', async () => {
    const knowledgeBaseRepository = createKnowledgeBaseRepository();
    const knowledgeBase = KnowledgeBaseEntity.create({
      buildingId: 'building-2',
      tenantId: 'tenant-2',
      knowledge: 'Knowledge text',
      information: 'Info text',
      metadata: {source: 'import'},
    });

    knowledgeBaseRepository.findByBuildingId.mockResolvedValue(knowledgeBase);

    const handler = new KnowledgeBaseHandler(knowledgeBaseRepository);
    const result = await handler.execute(new KnowledgeBaseQuery({buildingId: 'building-2'}));

    expect(result).toEqual({
      id: knowledgeBase.id,
      buildingId: 'building-2',
      tenantId: 'tenant-2',
      knowledge: 'Knowledge text',
      information: 'Info text',
      metadata: {source: 'import'},
    });
  });
});
