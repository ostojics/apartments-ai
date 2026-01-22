import {Module} from '@nestjs/common';
import {SharedModule} from './modules/shared/shared.module';
import {TenantsModule} from './modules/tenants/tenants.module';
import {BuildingsModule} from './modules/buildings/buildings.module';
import {ContactsModule} from './modules/contacts/contacts.module';
import {TenantContextModule} from './modules/tenant-context/tenant-context.module';

@Module({
  imports: [SharedModule, TenantContextModule, TenantsModule, BuildingsModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
