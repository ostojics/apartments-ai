import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {IContactRepository} from '../../domain/repositories/contact.repository.interface';
import {ContactEntity} from '../../domain/contact.entity';
import {ContactOrmEntity} from './contact.entity';
import {ContactMapper} from '../mappers/contact.mapper';
import {TypeOrmUnitOfWork} from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmContactRepository implements IContactRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gets the repository using the transaction manager from ALS if available,
   * otherwise falls back to the base dataSource manager.
   */
  private get repository(): Repository<ContactOrmEntity> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(ContactOrmEntity);
  }

  async save(contact: ContactEntity): Promise<void> {
    const persistenceModel = ContactMapper.toPersistence(contact);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<ContactEntity | null> {
    const record = await this.repository.findOne({where: {id}});
    if (!record) return null;

    return ContactMapper.toDomain(record);
  }
}
