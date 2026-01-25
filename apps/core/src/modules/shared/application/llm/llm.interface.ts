export interface IChatProps {
  messages: any[];
  conversationId?: string;
  systemPrompts?: string[];
}

export interface ILLMService {
  chat(props: IChatProps): Promise<any>;
}
