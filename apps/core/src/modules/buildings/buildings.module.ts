import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
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
import {BuildingInformationBuildingsRepositoryAdapter} from '../building-information/infrastructure/adapters/building-information-buildings.repository.adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([BuildingOrmEntity, BuildingInformationOrmEntity])],
  controllers: [BuildingsController],
  providers: [
    BuildingInformationHandler,
    {
      provide: BUILDING_REPOSITORY,
      useClass: TypeOrmBuildingRepository,
    },
    {
      provide: BUILDING_INFORMATION_REPOSITORY,
      useClass: TypeOrmBuildingInformationRepository,
    },
    {
      provide: BUILDING_INFORMATION_BUILDINGS_REPOSITORY_PORT,
      useFactory: (buildingRepository: TypeOrmBuildingRepository) => {
        return new BuildingInformationBuildingsRepositoryAdapter(buildingRepository);
      },
      inject: [BUILDING_REPOSITORY],
    },
  ],
  exports: [BUILDING_REPOSITORY, BUILDING_INFORMATION_REPOSITORY],
})
export class BuildingsModule {}
