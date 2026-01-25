import {Inject, Injectable} from '@nestjs/common';
import {IChatProps, ILLMService} from '../../application/llm/llm.interface';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {chat} from '@tanstack/ai';
import {openaiText} from '@tanstack/ai-openai';

@Injectable()
export class TanstackLLMService implements ILLMService {
  constructor(@Inject(LOGGER) private readonly logger: ILoggerPort) {}

  chat(props: IChatProps): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const stream = chat({
      adapter: openaiText('gpt-5-nano'),
      messages: props.messages,
      conversationId: props.conversationId,
      systemPrompts: props.systemPrompts,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return stream;
  }
}
