import {PromotionOptInHandler} from './promotion-opt-in.command.handler';
import {PromotionOptInCommand} from '../commands/promotion-opt-in.command';
import {IContactRepository} from '../../domain/repositories/contact.repository.interface';
import {ContactEntity} from '../../domain/contact.entity';
import {IUnitOfWork} from 'src/libs/application/ports/unit-of-work.port';
import {IDomainEventDispatcher} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {VoucherEntity} from 'src/modules/vouchers/domain/voucher.entity';
import {OutboxEntity} from 'src/modules/shared/domain/outbox/outbox.entity';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {IContactsVoucherRepositoryPort} from '../ports/contacts.voucher.repository.port';
import {IContactsOutboxRepositoryPort} from '../ports/contacts.outbox.repository.port';

describe('PromotionOptInHandler', () => {
  const createContactRepository = () => {
    const save = jest.fn();
    const findByEmailAndTenantId = jest.fn().mockResolvedValue(null);
    return {
      repository: {
        save,
        findById: jest.fn(),
        findByEmailAndTenantId,
      } as jest.Mocked<IContactRepository>,
      save,
      findByEmailAndTenantId,
    };
  };

  const createVoucherRepository = () => {
    const save = jest.fn();

    return {
      repository: {
        save,
      } as jest.Mocked<IContactsVoucherRepositoryPort>,
      save,
    };
  };

  const createOutboxRepository = () => {
    const save = jest.fn();
    return {
      repository: {
        save,
      } as jest.Mocked<IContactsOutboxRepositoryPort>,
      save,
    };
  };

  const createUnitOfWork = () => {
    const runInTransaction = jest.fn(async (work: () => Promise<void>) => await work());
    return {
      unitOfWork: {runInTransaction} as IUnitOfWork,
      runInTransaction,
    };
  };

  const createEventDispatcher = () => {
    const dispatch = jest.fn();
    return {
      eventDispatcher: {dispatch} as IDomainEventDispatcher,
      dispatch,
    };
  };

  const createLogger = () => {
    return {
      logger: {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      } as jest.Mocked<ILoggerPort>,
    };
  };

  it('saves promotion opt-in as a contact', async () => {
    const {repository: contactRepository, save, findByEmailAndTenantId} = createContactRepository();
    const {unitOfWork, runInTransaction} = createUnitOfWork();
    const {eventDispatcher, dispatch} = createEventDispatcher();
    const {repository: voucherRepository, save: saveVoucher} = createVoucherRepository();
    const {repository: outboxRepository, save: saveOutbox} = createOutboxRepository();
    const {logger} = createLogger();
    const handler = new PromotionOptInHandler(
      contactRepository,
      unitOfWork,
      eventDispatcher,
      voucherRepository,
      outboxRepository,
      logger,
    );

    await handler.execute(
      new PromotionOptInCommand({
        name: 'Jamie Doe',
        email: 'jamie@example.com',
        phoneNumber: '+1 555 000 1234',
        preferredLanguage: 'en-US',
        tenantId: 'tenant-123',
      }),
    );

    expect(runInTransaction).toHaveBeenCalledTimes(1);
    expect(findByEmailAndTenantId).toHaveBeenCalledWith('jamie@example.com', 'tenant-123');
    expect(save).toHaveBeenCalledTimes(1);
    expect(saveVoucher).toHaveBeenCalledTimes(1);
    expect(saveOutbox).toHaveBeenCalledTimes(1);
    const [savedContact] = save.mock.calls[0] as [ContactEntity];
    const [savedVoucher] = saveVoucher.mock.calls[0] as [VoucherEntity];
    const [savedOutbox] = saveOutbox.mock.calls[0] as [OutboxEntity];
    expect(savedContact.name).toBe('Jamie Doe');
    expect(savedContact.email).toBe('jamie@example.com');
    expect(savedContact.phoneNumber).toBe('+1 555 000 1234');
    expect(savedContact.preferredLanguage).toBe('en-US');
    expect(savedContact.tenantId).toBe('tenant-123');
    expect(savedVoucher.email).toBe('jamie@example.com');
    expect(savedOutbox.tenantId).toBe('tenant-123');
    expect(dispatch).toHaveBeenCalledWith(savedContact);
  });

  it('dedupes by existing contact email and tenant', async () => {
    const {repository: contactRepository, findByEmailAndTenantId, save} = createContactRepository();
    findByEmailAndTenantId.mockResolvedValue(
      ContactEntity.create({
        id: 'contact-id',
        name: 'Existing',
        email: 'jamie@example.com',
        phoneNumber: null,
        preferredLanguage: 'en-US',
        tenantId: 'tenant-123',
      }),
    );
    const {unitOfWork, runInTransaction} = createUnitOfWork();
    const {eventDispatcher, dispatch} = createEventDispatcher();
    const {repository: voucherRepository, save: saveVoucher} = createVoucherRepository();
    const {repository: outboxRepository, save: saveOutbox} = createOutboxRepository();
    const {logger} = createLogger();
    const handler = new PromotionOptInHandler(
      contactRepository,
      unitOfWork,
      eventDispatcher,
      voucherRepository,
      outboxRepository,
      logger,
    );

    await handler.execute(
      new PromotionOptInCommand({
        name: 'Jamie Doe',
        email: 'jamie@example.com',
        phoneNumber: '+1 555 000 1234',
        preferredLanguage: 'en-US',
        tenantId: 'tenant-123',
      }),
    );

    expect(runInTransaction).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
    expect(saveVoucher).not.toHaveBeenCalled();
    expect(saveOutbox).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });
});
