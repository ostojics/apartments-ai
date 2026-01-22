import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BuildingInformationOrmEntity} from './infrastructure/persistence/building-information.entity';
import {BuildingOrmEntity} from '../buildings/infrastructure/persistence/building.entity';
import {BUILDING_INFORMATION_REPOSITORY} from './domain/repositories/building-information.repository.interface';
import {TypeOrmBuildingInformationRepository} from './infrastructure/persistence/typeorm-building-information.repository';
import {BUILDING_INFORMATION_BUILDINGS_REPOSITORY_PORT} from './application/ports/di-tokens';
import {BuildingInformationBuildingsRepositoryAdapter} from './infrastructure/providers/building-information-buildings.repository.adapter';
import {BuildingInformationHandler} from './application/handlers/building-information.query.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([BuildingInformationOrmEntity, BuildingOrmEntity])],
  providers: [
    {
      provide: BUILDING_INFORMATION_REPOSITORY,
      useClass: TypeOrmBuildingInformationRepository,
    },
    {
      provide: BUILDING_INFORMATION_BUILDINGS_REPOSITORY_PORT,
      useClass: BuildingInformationBuildingsRepositoryAdapter,
    },
    BuildingInformationHandler,
  ],
  exports: [BUILDING_INFORMATION_REPOSITORY, BUILDING_INFORMATION_BUILDINGS_REPOSITORY_PORT],
})
export class BuildingInformationModule {}
