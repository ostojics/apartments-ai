import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {SetupCommand} from '../commands/setup.command';
import {HOUSEHOLD_USER_REPOSITORY_PORT, IHouseholdUserRepositoryPort} from '../ports/household.user.repository.port';
import {Inject} from '@nestjs/common';
import {
  HOUSEHOLD_LICENSE_REPOSITORY_PORT,
  IHouseholdLicenseRepositoryPort,
} from '../ports/household.license.repository.port';
import {ANALYTICS_SERVICE} from 'src/modules/shared/application/analytics/di-tokens';
import {IAnalyticsService} from 'src/modules/shared/application/analytics/analytics.interface';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';
import {IJwtService} from 'src/modules/shared/application/jwt/jwt.interface';
import {HOUSEHOLD_REPOSITORY, IHouseholdRepository} from '../../domain/repositories/household.repository.interface';
import {HouseholdEntity} from '../../domain/household.entity';
import {
  DOMAIN_EVENT_DISPATCHER,
  IDomainEventDispatcher,
} from 'src/libs/domain/events/domain.event.dispatcher.interface';
import {IUnitOfWork, UNIT_OF_WORK} from 'src/libs/application/ports/unit-of-work.port';

@CommandHandler(SetupCommand)
export class SetupCommandHandler implements ICommandHandler<SetupCommand> {
  constructor(
    @Inject(HOUSEHOLD_REPOSITORY)
    private readonly householdRepository: IHouseholdRepository,
    @Inject(HOUSEHOLD_USER_REPOSITORY_PORT)
    private readonly householdUserRepository: IHouseholdUserRepositoryPort,
    @Inject(HOUSEHOLD_LICENSE_REPOSITORY_PORT)
    private readonly householdLicenseRepository: IHouseholdLicenseRepositoryPort,
    @Inject(ANALYTICS_SERVICE)
    private readonly analyticsService: IAnalyticsService,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(DOMAIN_EVENT_DISPATCHER)
    private readonly eventDispatcher: IDomainEventDispatcher,
    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(command: SetupCommand): Promise<{token: string}> {
    const {data} = command;

    // Validate license
    const license = await this.householdLicenseRepository.findByKey(data.licenseKey);
    if (!license) {
      throw new Error('Invalid license key');
    }

    if (!license.isValid()) {
      throw new Error('License is not valid');
    }

    const household = HouseholdEntity.create({
      name: data.household.name,
      currencyCode: data.household.currencyCode,
      monthlyBudget: 5000,
    });

    const user = await this.unitOfWork.runInTransaction(async () => {
      await this.householdRepository.create(household);

      const user = await this.householdUserRepository.createAuthorUser({
        email: data.user.email,
        username: data.user.username,
        password: data.user.password,
        householdId: household.id,
      });

      // Mark license as used
      license.markAsUsed();
      await this.householdLicenseRepository.save(license);

      return user;
    });

    this.analyticsService.captureEvent({
      distinctId: user.id,
      event: 'household_created',
      properties: {
        household_id: household.id,
        household_name: household.name,
        currency: household.currencyCode,
      },
    });

    this.analyticsService.captureEvent({
      distinctId: user.id,
      event: 'user_account_created',
      properties: {
        user_id: user.id,
        household_id: household.id,
      },
    });

    const token = await this.jwtService.craftJwt(user.id, user.email);

    this.eventDispatcher.dispatch(household);
    this.eventDispatcher.dispatch(user);

    return {token};
  }
}
