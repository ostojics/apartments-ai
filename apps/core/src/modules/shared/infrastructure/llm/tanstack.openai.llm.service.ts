import {Inject, Injectable} from '@nestjs/common';
import {IChatProps, ILLMService} from '../../application/llm/llm.interface';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';

@Injectable()
export class TanstackOpenAILLMService implements ILLMService {
  constructor(@Inject(LOGGER) private readonly logger: ILoggerPort) {}

  async chat(props: IChatProps): Promise<AsyncIterable<any>> {
    // Resolve imports dynamically to prevent crashes since @tanstack/ai is ESM only
    const {chat} = await import('@tanstack/ai');
    const {openaiText} = await import('@tanstack/ai-openai');

    this.logger.info('Using Tanstack OpenAI LLM Service to process chat request.', {
      conversationId: props.conversationId,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const stream: Promise<AsyncIterable<any>> = chat({
      adapter: openaiText('gpt-4.1-nano'),
      messages: props.messages,
      conversationId: props.conversationId,
      systemPrompts: props.systemPrompts,
    });

    return stream;
  }
}
