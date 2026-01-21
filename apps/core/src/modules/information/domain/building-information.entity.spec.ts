import {BuildingInformationEntity} from './building-information.entity';
import {BuildingInformationCreatedEvent} from './events/building-information-created.event';

describe('BuildingInformationEntity', () => {
  it('creates building information and emits event', () => {
    const information = BuildingInformationEntity.create({
      knowledgeBaseId: 'knowledge-1',
      locale: 'en',
      content: 'Welcome',
    });

    expect(information.knowledgeBaseId).toBe('knowledge-1');
    expect(information.locale).toBe('en');
    expect(information.content).toBe('Welcome');
    expect(information.getEvents()).toHaveLength(1);
    expect(information.getEvents()[0]).toBeInstanceOf(BuildingInformationCreatedEvent);
  });
});
