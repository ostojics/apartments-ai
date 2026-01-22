// src/modules/tenant-context/tenant-context.module.ts
import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TenantOrmEntity} from '../tenants/infrastructure/persistence/tenant.entity';
import {LicenseOrmEntity} from '../licenses/infrastructure/persistence/license.entity';
import {TENANT_REPOSITORY} from '../tenants/domain/repositories/tenant.repository.interface';
import {LICENSE_REPOSITORY} from '../licenses/domain/repositories/license.repository.interface';
import {TypeOrmTenantRepository} from '../tenants/infrastructure/persistence/typeorm-tenant.repository';
import {TypeOrmLicenseRepository} from '../licenses/infrastructure/persistence/typeorm-license.repository';

/**
 * TenantContextModule is a global module that provides tenant and license repositories
 * which allows guards and other services to perform multi-tenant operations
 */
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TenantOrmEntity, LicenseOrmEntity])],
  providers: [
    {
      provide: TENANT_REPOSITORY,
      useClass: TypeOrmTenantRepository,
    },
    {
      provide: LICENSE_REPOSITORY,
      useClass: TypeOrmLicenseRepository,
    },
  ],
  exports: [TENANT_REPOSITORY, LICENSE_REPOSITORY],
})
export class TenantContextModule {}
