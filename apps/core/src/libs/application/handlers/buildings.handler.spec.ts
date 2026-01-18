import {BuildingsHandler} from './buildings.handler';
import {BuildingsQuery} from '../queries/buildings.query';
import {IBuildingRepository} from 'src/modules/buildings/domain/repositories/building.repository.interface';
import {BuildingEntity} from 'src/modules/buildings/domain/building.entity';

describe('BuildingsHandler', () => {
  const createBuildingRepository = () => {
    const findByTenantId = jest.fn();
    return {
      repository: {
        create: jest.fn(),
        findById: jest.fn(),
        findBySlug: jest.fn(),
        findByTenantId,
        update: jest.fn(),
        delete: jest.fn(),
        exists: jest.fn(),
      } as jest.Mocked<IBuildingRepository>,
      findByTenantId,
    };
  };

  it('returns building summaries for a tenant', async () => {
    const {repository: buildingRepository, findByTenantId} = createBuildingRepository();
    const buildingOne = BuildingEntity.create({
      name: 'North Tower',
      slug: 'north-tower',
      tenantId: 'tenant-123',
      imageUrl: 'https://example.com/north.png',
      address: '123 Main St',
    });
    const buildingTwo = BuildingEntity.create({
      name: 'South Tower',
      slug: 'south-tower',
      tenantId: 'tenant-123',
    });

    findByTenantId.mockResolvedValue([buildingOne, buildingTwo]);

    const handler = new BuildingsHandler(buildingRepository);
    const result = await handler.execute(new BuildingsQuery({tenantId: 'tenant-123'}));

    expect(findByTenantId).toHaveBeenCalledWith('tenant-123');
    expect(result).toEqual([
      {
        id: buildingOne.id,
        name: 'North Tower',
        slug: 'north-tower',
        tenantId: 'tenant-123',
        imageUrl: 'https://example.com/north.png',
        address: '123 Main St',
      },
      {
        id: buildingTwo.id,
        name: 'South Tower',
        slug: 'south-tower',
        tenantId: 'tenant-123',
        imageUrl: null,
        address: null,
      },
    ]);
  });
});
