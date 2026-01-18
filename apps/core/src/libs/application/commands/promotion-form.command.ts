import {Command, CommandProps} from 'src/libs/domain/commands/command.base';

export interface PromotionFormCommandProps extends CommandProps {
  name: string;
  email: string;
  phone?: string;
  preferredLanguage: string;
}

export class PromotionFormCommand extends Command {
  public readonly name: string;
  public readonly email: string;
  public readonly phone?: string;
  public readonly preferredLanguage: string;

  constructor(props: PromotionFormCommandProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.preferredLanguage = props.preferredLanguage;
  }
}
