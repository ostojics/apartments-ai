import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TenantsController} from './presentation/controllers/tenants.controller';
import {TenantCheckHandler} from './application/handlers/tenant-check.query.handler';
import {TenantOrmEntity} from './infrastructure/persistence/tenant.entity';
import {TypeOrmTenantRepository} from './infrastructure/persistence/typeorm-tenant.repository';
import {TENANT_REPOSITORY} from './domain/repositories/tenant.repository.interface';
import {TENANT_LICENSE_REPOSITORY_PORT} from './application/ports/di-tokens';
import {TenantLicenseRepositoryAdapter} from './infrastructure/adapters/tenant-license.repository.adapter';
import {LICENSE_REPOSITORY} from '../licenses/domain/repositories/license.repository.interface';
import {TypeOrmLicenseRepository} from '../licenses/infrastructure/persistence/typeorm-license.repository';
import {LicenseOrmEntity} from '../licenses/infrastructure/persistence/license.entity';
import {BuildingsHandler} from '../buildings/application/handlers/buildings.query.handler';
import {BUILDING_REPOSITORY} from '../buildings/domain/repositories/building.repository.interface';
import {TypeOrmBuildingRepository} from '../buildings/infrastructure/persistence/typeorm-building.repository';
import {BuildingOrmEntity} from '../buildings/infrastructure/persistence/building.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TenantOrmEntity, LicenseOrmEntity, BuildingOrmEntity])],
  controllers: [TenantsController],
  providers: [
    TenantCheckHandler,
    BuildingsHandler,
    {
      provide: TENANT_REPOSITORY,
      useClass: TypeOrmTenantRepository,
    },
    {
      provide: LICENSE_REPOSITORY,
      useClass: TypeOrmLicenseRepository,
    },
    {
      provide: TENANT_LICENSE_REPOSITORY_PORT,
      useFactory: (licenseRepository: TypeOrmLicenseRepository) => {
        return new TenantLicenseRepositoryAdapter(licenseRepository);
      },
      inject: [LICENSE_REPOSITORY],
    },
    {
      provide: BUILDING_REPOSITORY,
      useClass: TypeOrmBuildingRepository,
    },
  ],
  exports: [TENANT_REPOSITORY],
})
export class TenantsModule {}
