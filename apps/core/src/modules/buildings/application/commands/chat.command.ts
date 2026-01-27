import {Command, CommandProps} from 'src/libs/domain/commands/command.base';

export interface ChatCommandProps extends CommandProps {
  conversationId: string;
  messages: any[];
  locale: string;
  apartmentSlug: string;
  tenantId: string;
}

export class ChatCommand extends Command {
  public readonly conversationId: string;
  // tanstack ai message types are kinda weird :(
  public readonly messages: any[];
  public readonly locale: string;
  public readonly apartmentSlug: string;
  public readonly tenantId: string;

  constructor(props: ChatCommandProps) {
    super(props);
    this.conversationId = props.conversationId;
    this.messages = props.messages;
    this.locale = props.locale;
    this.apartmentSlug = props.apartmentSlug;
    this.tenantId = props.tenantId;
  }
}
