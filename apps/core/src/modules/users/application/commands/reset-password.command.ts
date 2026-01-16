import {Command} from 'src/libs/domain/commands/command.base';

export class ResetPasswordCommand extends Command {
  readonly data: {
    token: string;
    password: string;
  };

  constructor(data: {token: string; password: string}) {
    super({});
    this.data = data;
  }
}
