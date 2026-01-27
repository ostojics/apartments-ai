import {Inject, Injectable} from '@nestjs/common';
import {IChatProps, ILLMService} from '../../application/llm/llm.interface';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';

@Injectable()
export class TanstackGeminiLLMService implements ILLMService {
  constructor(@Inject(LOGGER) private readonly logger: ILoggerPort) {}

  async chat(props: IChatProps): Promise<AsyncIterable<any>> {
    // Resolve imports dynamically to prevent crashes since @tanstack/ai is ESM only
    const {chat} = await import('@tanstack/ai');
    const {openRouterText} = await import('@tanstack/ai-openrouter');

    this.logger.info('Using Tanstack Gemini LLM Service to process chat request.', {
      conversationId: props.conversationId,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const stream: Promise<AsyncIterable<any>> = chat({
      adapter: openRouterText('google/gemini-2.5-flash-lite-preview-09-2025'),
      messages: props.messages,
      conversationId: props.conversationId,
      systemPrompts: props.systemPrompts,
    });

    return stream;
  }
}
