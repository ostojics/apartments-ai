import {Injectable, Inject} from '@nestjs/common';
import {BaseEntity} from '../entities/entity.base';
import {EventEmitter2} from '@nestjs/event-emitter';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {LOGGER} from 'src/libs/application/ports/di-tokens';

@Injectable()
export class EventEmitter2DomainEventDispatcher {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(LOGGER)
    private readonly logger: ILoggerPort,
  ) {}

  dispatch(entity: BaseEntity): void {
    const events = entity.getEvents();

    void Promise.all(
      events.map((event) => {
        const eventName = event.constructor.name;
        this.logger.info(`Dispatching domain event: ${eventName}`, {
          eventName,
          aggregateId: entity.id,
          eventData: event,
        });

        return this.eventEmitter.emitAsync(eventName, event);
      }),
    );

    entity.clearEvents();
  }
}
