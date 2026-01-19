import {ContactEntity} from './contact.entity';
import {ContactCreatedEvent} from './events/contact-created.event';

describe('ContactEntity', () => {
  it('creates a contact and emits a created event', () => {
    const contact = ContactEntity.create({
      name: 'Jamie Doe',
      email: 'jamie@example.com',
      phoneNumber: '+1 555 000 1234',
      preferredLanguage: 'en-US',
      tenantId: 'tenant-123',
    });

    expect(contact.name).toBe('Jamie Doe');
    expect(contact.email).toBe('jamie@example.com');
    expect(contact.phoneNumber).toBe('+1 555 000 1234');
    expect(contact.preferredLanguage).toBe('en-US');
    expect(contact.tenantId).toBe('tenant-123');

    const events = contact.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ContactCreatedEvent);
  });

  it('defaults phone number to null', () => {
    const contact = ContactEntity.create({
      name: 'Riley Smith',
      email: 'riley@example.com',
      preferredLanguage: 'nl-NL',
      tenantId: 'tenant-456',
    });

    expect(contact.phoneNumber).toBeNull();
  });
});
