# Story: S-core-infrastructure-01 – Implement Core Infrastructure Layer

Status: not-started

## Description

Implement the infrastructure layer for the core project, following the conventions and structure of the provided example for households. This includes creating repository implementations and mappers for core entities, ensuring all interfaces and logic match the product requirements and existing architecture standards.

## Acceptance Criteria

- Infrastructure layer is present in `apps/core/src/modules/core/infrastructure/`
- Repository implementations follow the example from `TypeOrmHouseholdRepository`
- Mappers for core entities are present in `apps/core/src/modules/core/infrastructure/mappers/` and follow the provided mapping example
- All domain-to-persistence and persistence-to-domain conversions are covered
- All interfaces are aligned with domain requirements
- Code follows naming and architectural conventions
- All logic is tested and verified

## Tasks & Subtasks

- [ ] **T-core-infrastructure-01.1**: Review acceptance criteria
- [ ] **T-core-infrastructure-01.2**: Analyze existing core domain and infrastructure files
- [ ] **T-core-infrastructure-01.3**: Implement repository classes for core entities
- [ ] **T-core-infrastructure-01.4**: Implement mappers for core entities (handle domain-to-persistence and persistence-to-domain conversions)
- [ ] **T-core-infrastructure-01.5**: Ensure code follows conventions
- [ ] **T-core-infrastructure-01.6**: Test and verify infrastructure and mapper logic
- [ ] **T-core-infrastructure-01.7**: Commit changes following naming convention

---

## Dev Notes

### References

- Example: `src/modules/households/infrastructure/persistence/typeorm-household.repository.ts`
- Example: `src/modules/households/infrastructure/mappers/household.mapper.ts`
- [naming-convention.md](../naming-convention.md)
- Existing domain and infrastructure files in `apps/core/src/modules/core/`

### Project Structure Notes

- All infrastructure logic (repositories, mappers) should be in the `infrastructure` folder of the core module.
- All mapper logic should be in the `mappers` folder of the core infrastructure module.
- Remove or refactor any infrastructure or mapper logic not matching the product.

## Dev Agent Record

### Agent Model Used

- GPT-4.1 (placeholder)

### Debug Log References

- Lint: `pnpm -C apps/core lint` (pending)

### Completion Notes List

- Placeholder: Implementation pending.

### File List

- apps/core/src/modules/core/infrastructure/persistence/
- apps/core/src/modules/core/infrastructure/mappers/

### Change Log

- 2026-01-19: Story created for core infrastructure layer implementation.

---

Refer to the [naming convention](../naming-convention.md) for branch, PR, and task identifiers.

## Examples

### Repository Example

```

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IHouseholdRepository } from '../../domain/repositories/household.repository.interface';
import { HouseholdEntity } from '../../domain/household.entity';
import { HouseholdSchema } from './household.schema';
import { HouseholdMapper } from '../mappers/household.mapper';
import { TypeOrmUnitOfWork } from 'src/libs/infrastructure/persistence/typeorm-unit-of-work';

@Injectable()
export class TypeOrmHouseholdRepository implements IHouseholdRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * This is the secret sauce.
   * It checks ALS for a transaction manager, otherwise uses the base dataSource.
   */
  private get repository(): Repository<HouseholdSchema> {
    const manager = TypeOrmUnitOfWork.getManager();
    const target = manager ?? this.dataSource.manager;
    return target.getRepository(HouseholdSchema);
  }

  async findById(id: string): Promise<HouseholdEntity | null> {
    const record = await this.repository.findOne({ where: { id } as any });
    return record ? HouseholdMapper.toDomain(record) : null;
  }

  async save(entity: HouseholdEntity): Promise<void> {
    const persistenceModel = HouseholdMapper.toPersistence(entity);
    await this.repository.save(persistenceModel);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
```

### Mapper example

```
import { HouseholdEntity } from '../../domain/household.entity';
import { HouseholdSchema } from '../persistence/household.schema';

export class HouseholdMapper {
  /**
   * Domain Entity -> Persistence Schema
   * Used when saving to the database.
   */
  public static toPersistence(entity: HouseholdEntity): HouseholdSchema {
    const schema = new HouseholdSchema();

    schema.id = entity.id;
    schema.name = entity.name;
    // Map the Value Object back to a raw string for the DB
    schema.currencyCode = entity.currencyCode;
    schema.monthlyBudget = entity.monthlyBudget;
    schema.authorId = entity.authorId;

    // Ensure dates are handled as Date objects for TypeORM
    schema.createdAt = new Date(entity.createdAt);
    schema.updatedAt = new Date(entity.updatedAt);

    return schema;
  }

  /**
   * Persistence Schema -> Domain Entity
   * Used when fetching from the database.
   */
  public static toDomain(schema: HouseholdSchema): HouseholdEntity {
    // We use the static 'create' method of the entity.
    // This re-validates the CurrencyCode Value Object upon loading.
    return HouseholdEntity.create({
      id: schema.id,
      name: schema.name,
      currencyCode: schema.currencyCode,
      monthlyBudget: Number(schema.monthlyBudget),
      createdAt: schema.createdAt.toISOString(),
      updatedAt: schema.updatedAt.toISOString(),
    });
  }
}
```
