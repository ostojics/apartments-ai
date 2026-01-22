import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PromotionsController} from './presentation/controllers/promotions.controller';
import {PromotionOptInHandler} from './application/handlers/promotion-opt-in.command.handler';
import {ContactOrmEntity} from './infrastructure/persistence/contact.entity';
import {TypeOrmContactRepository} from './infrastructure/persistence/typeorm-contact.repository';
import {CONTACT_REPOSITORY} from './domain/repositories/contact.repository.interface';
import {DOMAIN_EVENT_DISPATCHER} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {NestEventEmitterDomainEventDispatcher} from 'src/libs/infrastructure/events/nest-event-emitter.domain.event.dispatcher';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ContactOrmEntity])],
  controllers: [PromotionsController],
  providers: [
    PromotionOptInHandler,
    {
      provide: CONTACT_REPOSITORY,
      useClass: TypeOrmContactRepository,
    },
    {
      provide: DOMAIN_EVENT_DISPATCHER,
      useClass: NestEventEmitterDomainEventDispatcher,
    },
  ],
  exports: [CONTACT_REPOSITORY],
})
export class ContactsModule {}
