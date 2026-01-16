import {Command} from 'src/libs/domain/commands/command.base';

export class RequestEmailChangeCommand extends Command {
  readonly data: {
    userId: string;
    currentEmail: string;
    newEmail: string;
  };

  constructor(data: {userId: string; currentEmail: string; newEmail: string}) {
    super({
      metadata: {
        userId: data.userId,
        currentEmail: data.currentEmail,
        newEmail: data.newEmail,
      },
    });
    this.data = data;
  }
}
