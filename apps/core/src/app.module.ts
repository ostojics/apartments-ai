import {Module} from '@nestjs/common';
import {SharedModule} from './modules/shared/shared.module';
import {TenantsModule} from './modules/tenants/tenants.module';
import {BuildingsModule} from './modules/buildings/buildings.module';
import {ContactsModule} from './modules/contacts/contacts.module';
import {TenantContextModule} from './modules/tenant-context/tenant-context.module';
import {APP_FILTER} from '@nestjs/core';
import {GlobalExceptionFilter} from './common/filters/global-exception.filter';

@Module({
  imports: [SharedModule, TenantContextModule, TenantsModule, BuildingsModule, ContactsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
