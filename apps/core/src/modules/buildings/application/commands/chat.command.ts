import {Command, CommandProps} from 'src/libs/domain/commands/command.base';
import {ConstrainedModelMessage} from '@tanstack/ai';
import {OpenAIMessageMetadataByModality} from '@tanstack/ai-openai';

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCommandProps extends CommandProps {
  conversationId: string;
  messages: ConstrainedModelMessage<{
    inputModalities: ['text', 'image'];
    messageMetadataByModality: OpenAIMessageMetadataByModality;
  }>[];
  locale: string;
  apartmentSlug: string;
  tenantId: string;
}

export class ChatCommand extends Command {
  public readonly conversationId: string;
  public readonly messages: ConstrainedModelMessage<{
    inputModalities: ['text', 'image'];
    messageMetadataByModality: OpenAIMessageMetadataByModality;
  }>[];
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
