import {Command, CommandProps} from 'src/libs/domain/commands/command.base';

export interface PromotionOptInCommandProps extends CommandProps {
  name: string;
  email: string;
  phoneNumber?: string | null;
  preferredLanguage: string;
  tenantId: string;
}

export class PromotionOptInCommand extends Command {
  public readonly name: string;
  public readonly email: string;
  public readonly phoneNumber?: string | null;
  public readonly preferredLanguage: string;
  public readonly tenantId: string;

  constructor(props: PromotionOptInCommandProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber ?? null;
    this.preferredLanguage = props.preferredLanguage;
    this.tenantId = props.tenantId;
  }
}
