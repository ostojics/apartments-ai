import {BuildingInformationHandler} from './building-information.query.handler';
import {BuildingInformationQuery} from '../queries/building-information.query';
import {IBuildingRepository} from 'src/modules/buildings/domain/repositories/building.repository.interface';
import {IBuildingInformationRepository} from 'src/modules/building-information/domain/repositories/building-information.repository.interface';
import {BuildingEntity} from 'src/modules/buildings/domain/building.entity';
import {BuildingInformationEntity} from 'src/modules/building-information/domain/building-information.entity';

describe('BuildingInformationHandler', () => {
  const createBuildingRepository = (): jest.Mocked<IBuildingRepository> => ({
    save: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
    findByTenantId: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  });

  const createBuildingInformationRepository = (): jest.Mocked<IBuildingInformationRepository> => ({
    save: jest.fn(),
    findById: jest.fn(),
    findByKnowledgeBaseId: jest.fn(),
    findByBuildingIdAndLocale: jest.fn(),
  });

  it('returns null when building is missing', async () => {
    const buildingRepository = createBuildingRepository();
    const informationRepository = createBuildingInformationRepository();
    buildingRepository.findBySlug.mockResolvedValue(null);

    const handler = new BuildingInformationHandler(buildingRepository, informationRepository);
    const result = await handler.execute(
      new BuildingInformationQuery({tenantId: 'tenant-1', buildingSlug: 'slug', locale: 'en'}),
    );

    expect(result).toBeNull();
    expect(informationRepository.findByBuildingIdAndLocale).not.toHaveBeenCalled();
  });

  it('returns null when information is missing', async () => {
    const buildingRepository = createBuildingRepository();
    const informationRepository = createBuildingInformationRepository();
    const building = BuildingEntity.create({
      name: 'Test',
      slug: 'slug',
      tenantId: 'tenant-1',
    });

    buildingRepository.findBySlug.mockResolvedValue(building);
    informationRepository.findByBuildingIdAndLocale.mockResolvedValue(null);

    const handler = new BuildingInformationHandler(buildingRepository, informationRepository);
    const result = await handler.execute(
      new BuildingInformationQuery({tenantId: 'tenant-1', buildingSlug: 'slug', locale: 'en'}),
    );

    expect(result).toBeNull();
    expect(informationRepository.findByBuildingIdAndLocale).toHaveBeenCalledWith(building.id, 'en');
  });

  it('returns content when information exists', async () => {
    const buildingRepository = createBuildingRepository();
    const informationRepository = createBuildingInformationRepository();
    const building = BuildingEntity.create({
      name: 'Test',
      slug: 'slug',
      tenantId: 'tenant-1',
    });
    const information = BuildingInformationEntity.create({
      knowledgeBaseId: 'kb-1',
      buildingId: building.id,
      tenantId: 'tenant-1',
      locale: 'en',
      content: 'Hello',
    });

    buildingRepository.findBySlug.mockResolvedValue(building);
    informationRepository.findByBuildingIdAndLocale.mockResolvedValue(information);

    const handler = new BuildingInformationHandler(buildingRepository, informationRepository);
    const result = await handler.execute(
      new BuildingInformationQuery({tenantId: 'tenant-1', buildingSlug: 'slug', locale: 'en'}),
    );

    expect(result).toEqual({content: 'Hello'});
  });
});
