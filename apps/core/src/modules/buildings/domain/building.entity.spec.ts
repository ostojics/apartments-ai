import {BuildingCreatedEvent} from './events/building-created.event';
import {BuildingUpdatedEvent} from './events/building-updated.event';
import {BuildingEntity} from './building.entity';

describe('BuildingEntity', () => {
  it('creates a building with defaults and emits a created event', () => {
    const building = BuildingEntity.create({
      name: 'North Tower',
      slug: 'north-tower',
      tenantId: 'tenant-123',
    });

    expect(building.name).toBe('North Tower');
    expect(building.slug).toBe('north-tower');
    expect(building.tenantId).toBe('tenant-123');
    expect(building.imageUrl).toBeNull();
    expect(building.address).toBeNull();

    const events = building.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(BuildingCreatedEvent);
    const createdEvent = events[0] as BuildingCreatedEvent;
    expect(createdEvent.name).toBe('North Tower');
    expect(createdEvent.slug).toBe('north-tower');
    expect(createdEvent.tenantId).toBe('tenant-123');
  });

  it('updates a building and emits an updated event', () => {
    const building = BuildingEntity.create({
      name: 'South Tower',
      slug: 'south-tower',
      tenantId: 'tenant-456',
    });

    building.update({
      name: 'South Tower Annex',
      imageUrl: 'https://example.com/image.png',
      address: '123 Main St',
    });

    expect(building.name).toBe('South Tower Annex');
    expect(building.imageUrl).toBe('https://example.com/image.png');
    expect(building.address).toBe('123 Main St');

    const updatedEvent = building.getEvents().find((event) => event instanceof BuildingUpdatedEvent);

    expect(updatedEvent).toBeDefined();
    expect(updatedEvent?.updatedFields).toMatchObject({
      name: 'South Tower Annex',
      imageUrl: 'https://example.com/image.png',
      address: '123 Main St',
    });
  });
});
