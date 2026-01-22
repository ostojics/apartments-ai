import {Module} from '@nestjs/common';
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
import {BuildingOrmEntity} from '../buildings/infrastructure/persistence/building.entity';

const handlers = [TenantCheckHandler];

@Module({
  imports: [TypeOrmModule.forFeature([TenantOrmEntity, LicenseOrmEntity, BuildingOrmEntity])],
  controllers: [TenantsController],
  providers: [
    ...handlers,
    {
      provide: TENANT_REPOSITORY,
      useClass: TypeOrmTenantRepository,
    },
    {
      provide: TENANT_LICENSE_REPOSITORY_PORT,
      useFactory: (licenseRepository: TypeOrmLicenseRepository) => {
        return new TenantLicenseRepositoryAdapter(licenseRepository);
      },
      inject: [LICENSE_REPOSITORY],
    },
  ],
  exports: [TENANT_REPOSITORY],
})
export class TenantsModule {}
