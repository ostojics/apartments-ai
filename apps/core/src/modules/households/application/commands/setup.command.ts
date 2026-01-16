import {Command} from 'src/libs/domain/commands/command.base';

export class SetupCommand extends Command {
  readonly data: any;

  constructor(data: any) {
    super({
      metadata: {
        householdName: data.household.name,
        householdCurrencyCode: data.household.currencyCode,
        userEmail: data.user.email,
      },
    });
    this.data = data;
  }
}
