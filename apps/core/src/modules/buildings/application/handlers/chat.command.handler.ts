import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import {ChatCommand} from '../commands/chat.command';
import {BUILDING_REPOSITORY, IBuildingRepository} from '../../domain/repositories/building.repository.interface';
import {BUILDINGS_KNOWLEDGE_BASE_REPOSITORY_PORT} from '../ports/di-tokens';
import {IBuildingsKnowledgeBaseRepositoryPort} from '../ports/buildings.knowledge-base.repository.port';
import {chat} from '@tanstack/ai';
import {openaiText} from '@tanstack/ai-openai';

@CommandHandler(ChatCommand)
export class ChatHandler implements ICommandHandler<ChatCommand> {
  constructor(
    @Inject(BUILDING_REPOSITORY) private readonly buildingRepository: IBuildingRepository,
    @Inject(BUILDINGS_KNOWLEDGE_BASE_REPOSITORY_PORT)
    private readonly knowledgeBaseRepository: IBuildingsKnowledgeBaseRepositoryPort,
  ) {}

  async execute(command: ChatCommand): Promise<any> {
    const building = await this.buildingRepository.findBySlug(command.tenantId, command.apartmentSlug);
    if (!building) {
      return null;
    }

    const knowledgeBase = await this.knowledgeBaseRepository.findByBuildingIdAndTenantId(building.id, command.tenantId);
    if (!knowledgeBase) {
      return null;
    }

    const systemPrompts = ['System'];
    if (knowledgeBase.knowledge) {
      systemPrompts.push(knowledgeBase.knowledge);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const stream = chat({
      adapter: openaiText('gpt-4.1-mini'),
      messages: command.messages,
      conversationId: command.conversationId,
      systemPrompts,
    });

    return stream;
  }
}
