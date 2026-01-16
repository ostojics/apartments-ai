import {Command} from 'src/libs/domain/commands/command.base';

export class UpdateUsernameCommand extends Command {
  readonly data: {
    userId: string;
    username: string;
  };

  constructor(data: {userId: string; username: string}) {
    super({
      metadata: {
        userId: data.userId,
        username: data.username,
      },
    });
    this.data = data;
  }
}
