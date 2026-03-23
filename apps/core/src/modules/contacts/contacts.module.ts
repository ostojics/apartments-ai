import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PromotionsController} from './presentation/controllers/promotions.controller';
import {PromotionOptInHandler} from './application/handlers/promotion-opt-in.command.handler';
import {ContactOrmEntity} from './infrastructure/persistence/contact.entity';
import {TypeOrmContactRepository} from './infrastructure/persistence/typeorm-contact.repository';
import {CONTACT_REPOSITORY} from './domain/repositories/contact.repository.interface';
import {VouchersModule} from '../vouchers/vouchers.module';
import {CONTACTS_OUTBOX_REPOSITORY_PORT, CONTACTS_VOUCHER_REPOSITORY_PORT} from './application/ports/di-tokens';
import {VOUCHER_REPOSITORY} from '../vouchers/domain/repositories/voucher.repository.interface';
import {TypeOrmVoucherRepository} from '../vouchers/infrastructure/persistence/typeorm-voucher.repository';
import {ContactsVoucherRepositoryAdapter} from '../vouchers/infrastructure/adapters/contacts-voucher.repository.adapter';
import {OUTBOX_REPOSITORY} from '../shared/domain/outbox/outbox.repository.interface';
import {TypeOrmOutboxRepository} from '../shared/infrastructure/outbox/typeorm-outbox.repository';
import {ContactsOutboxRepositoryAdapter} from '../shared/infrastructure/outbox/adapters/contacts-outbox.repository.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([ContactOrmEntity]), VouchersModule],
  controllers: [PromotionsController],
  providers: [
    PromotionOptInHandler,
    {
      provide: CONTACT_REPOSITORY,
      useClass: TypeOrmContactRepository,
    },
    {
      provide: CONTACTS_VOUCHER_REPOSITORY_PORT,
      useFactory: (voucherRepository: TypeOrmVoucherRepository) => {
        return new ContactsVoucherRepositoryAdapter(voucherRepository);
      },
      inject: [VOUCHER_REPOSITORY],
    },
    {
      provide: CONTACTS_OUTBOX_REPOSITORY_PORT,
      useFactory: (outboxRepository: TypeOrmOutboxRepository) => {
        return new ContactsOutboxRepositoryAdapter(outboxRepository);
      },
      inject: [OUTBOX_REPOSITORY],
    },
  ],
  exports: [CONTACT_REPOSITORY],
})
export class ContactsModule {}
