import {Command} from 'src/libs/domain/commands/command.base';

export class ForgotPasswordCommand extends Command {
  readonly data: {
    email: string;
  };

  constructor(data: {email: string}) {
    super({
      metadata: {
        email: data.email,
      },
    });
    this.data = data;
  }
}
