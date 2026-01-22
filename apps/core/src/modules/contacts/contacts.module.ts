import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PromotionsController} from './presentation/controllers/promotions.controller';
import {PromotionOptInHandler} from './application/handlers/promotion-opt-in.command.handler';
import {ContactOrmEntity} from './infrastructure/persistence/contact.entity';
import {TypeOrmContactRepository} from './infrastructure/persistence/typeorm-contact.repository';
import {CONTACT_REPOSITORY} from './domain/repositories/contact.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ContactOrmEntity])],
  controllers: [PromotionsController],
  providers: [
    PromotionOptInHandler,
    {
      provide: CONTACT_REPOSITORY,
      useClass: TypeOrmContactRepository,
    },
  ],
  exports: [CONTACT_REPOSITORY],
})
export class ContactsModule {}
