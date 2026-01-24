import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BuildingsController} from './presentation/controllers/buildings.controller';
import {BuildingInformationHandler} from '../building-information/application/handlers/building-information.query.handler';
import {BuildingOrmEntity} from './infrastructure/persistence/building.entity';
import {BuildingInformationOrmEntity} from '../building-information/infrastructure/persistence/building-information.entity';
import {TypeOrmBuildingRepository} from './infrastructure/persistence/typeorm-building.repository';
import {TypeOrmBuildingInformationRepository} from '../building-information/infrastructure/persistence/typeorm-building-information.repository';
import {BUILDING_REPOSITORY} from './domain/repositories/building.repository.interface';
import {BUILDING_INFORMATION_REPOSITORY} from '../building-information/domain/repositories/building-information.repository.interface';
import {BUILDING_INFORMATION_BUILDINGS_REPOSITORY_PORT} from '../building-information/application/ports/di-tokens';
import {BuildingInformationBuildingsRepositoryAdapter} from './infrastructure/adapters/building-information-buildings.repository.adapter';
import {BuildingsHandler} from './application/handlers/buildings.query.handler';
import {KNOWLEDGE_BASE_REPOSITORY} from '../knowledge-bases/domain/repositories/knowledge-base.repository.interface';
import {TypeOrmKnowledgeBaseRepository} from '../knowledge-bases/infrastructure/persistence/typeorm-knowledge-base.repository';
import {BUILDINGS_KNOWLEDGE_BASE_REPOSITORY_PORT} from './application/ports/di-tokens';
import {BuildingsKnowledgeBaseRepositoryAdapter} from '../knowledge-bases/infrastructure/adapters/buildings.knowledge-base.repository.adapter';

const handlers = [BuildingsHandler, BuildingInformationHandler];

@Module({
  imports: [TypeOrmModule.forFeature([BuildingOrmEntity, BuildingInformationOrmEntity])],
  controllers: [BuildingsController],
  providers: [
    ...handlers,
    {
      provide: BUILDING_REPOSITORY,
      useClass: TypeOrmBuildingRepository,
    },
    {
      provide: BUILDING_INFORMATION_REPOSITORY,
      useClass: TypeOrmBuildingInformationRepository,
    },
    {
      provide: KNOWLEDGE_BASE_REPOSITORY,
      useClass: TypeOrmKnowledgeBaseRepository,
    },
    {
      provide: BUILDING_INFORMATION_BUILDINGS_REPOSITORY_PORT,
      useFactory: (buildingRepository: TypeOrmBuildingRepository) => {
        return new BuildingInformationBuildingsRepositoryAdapter(buildingRepository);
      },
      inject: [BUILDING_REPOSITORY],
    },
    {
      provide: BUILDINGS_KNOWLEDGE_BASE_REPOSITORY_PORT,
      useFactory: (knowledgeBaseRepository: TypeOrmKnowledgeBaseRepository) => {
        return new BuildingsKnowledgeBaseRepositoryAdapter(knowledgeBaseRepository);
      },
      inject: [KNOWLEDGE_BASE_REPOSITORY],
    },
  ],
  exports: [BUILDING_REPOSITORY, BUILDING_INFORMATION_REPOSITORY],
})
export class BuildingsModule {}
