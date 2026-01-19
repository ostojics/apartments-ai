import {PromotionOptInHandler} from './promotion-opt-in.command.handler';
import {PromotionOptInCommand} from '../commands/promotion-opt-in.command';
import {IContactRepository} from '../../domain/repositories/contact.repository.interface';
import {ContactEntity} from '../../domain/contact.entity';
import {IUnitOfWork} from 'src/libs/application/ports/unit-of-work.port';
import {IDomainEventDispatcher} from 'src/libs/domain/events/domain.event.dispatcher.interface';

describe('PromotionOptInHandler', () => {
  const createContactRepository = () => {
    const save = jest.fn();
    return {
      repository: {
        save,
        findById: jest.fn(),
      } as jest.Mocked<IContactRepository>,
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

  it('saves promotion opt-in as a contact', async () => {
    const {repository: contactRepository, save} = createContactRepository();
    const {unitOfWork, runInTransaction} = createUnitOfWork();
    const {eventDispatcher, dispatch} = createEventDispatcher();
    const handler = new PromotionOptInHandler(contactRepository, unitOfWork, eventDispatcher);

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
    expect(save).toHaveBeenCalledTimes(1);
    const [savedContact] = save.mock.calls[0] as [ContactEntity];
    expect(savedContact.name).toBe('Jamie Doe');
    expect(savedContact.email).toBe('jamie@example.com');
    expect(savedContact.phoneNumber).toBe('+1 555 000 1234');
    expect(savedContact.preferredLanguage).toBe('en-US');
    expect(savedContact.tenantId).toBe('tenant-123');
    expect(dispatch).toHaveBeenCalledWith(savedContact);
  });
});
