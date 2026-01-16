import {Command} from 'src/libs/domain/commands/command.base';

export interface SetupCommandData {
  household: {
    name: string;
    currencyCode: string;
  };
  user: {
    email: string;
    username: string;
    password: string;
  };
  licenseKey: string;
}

export class SetupCommand extends Command {
  readonly data: SetupCommandData;

  constructor(data: SetupCommandData) {
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
