import {Inject, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {IContactRepository} from '../../domain/repositories/contact.repository.interface';
import {ContactEntity} from '../../domain/contact.entity';
import {ContactOrmEntity} from './contact.entity';
import {ContactMapper} from '../mappers/contact.mapper';
import {TypeOrmBaseRepository} from 'src/libs/infrastructure/persistence/typeorm-base.repository';
import {ITransactionContext, TRANSACTION_CONTEXT} from 'src/libs/application/ports/transaction-context.port';

@Injectable()
export class TypeOrmContactRepository extends TypeOrmBaseRepository<ContactOrmEntity> implements IContactRepository {
  constructor(dataSource: DataSource, @Inject(TRANSACTION_CONTEXT) transactionContext: ITransactionContext) {
    super(dataSource, ContactOrmEntity, transactionContext);
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
