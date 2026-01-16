import {Command} from 'src/libs/domain/commands/command.base';

export class ConfirmEmailChangeCommand extends Command {
  readonly data: {
    token: string;
  };

  constructor(data: {token: string}) {
    super({});
    this.data = data;
  }
}
