import {Command} from 'src/libs/domain/commands/command.base';

export class LoginCommand extends Command {
  readonly data: {
    email: string;
    password: string;
  };

  constructor(data: {email: string; password: string}) {
    super({
      metadata: {
        email: data.email,
      },
    });
    this.data = data;
  }
}
