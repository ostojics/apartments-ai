import {Inject} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import {ChatCommand} from '../commands/chat.command';
import {BUILDING_REPOSITORY, IBuildingRepository} from '../../domain/repositories/building.repository.interface';
import {BUILDINGS_KNOWLEDGE_BASE_REPOSITORY_PORT} from '../ports/di-tokens';
import {IBuildingsKnowledgeBaseRepositoryPort} from '../ports/buildings.knowledge-base.repository.port';
import {LLM_SERVICE} from 'src/modules/shared/application/llm/di-tokens';
import {ILLMService} from 'src/modules/shared/application/llm/llm.interface';
import {apartmentAssistantPrompt} from '../prompts/apartmentAssistantPrompt';
import type {StreamChunk} from '@tanstack/ai';

@CommandHandler(ChatCommand)
export class ChatCommandHandler implements ICommandHandler<ChatCommand> {
  constructor(
    @Inject(BUILDING_REPOSITORY)
    private readonly buildingRepository: IBuildingRepository,
    @Inject(BUILDINGS_KNOWLEDGE_BASE_REPOSITORY_PORT)
    private readonly knowledgeBaseRepository: IBuildingsKnowledgeBaseRepositoryPort,
    @Inject(LLM_SERVICE)
    private readonly llmService: ILLMService,
  ) {}

  async execute(command: ChatCommand): Promise<AsyncIterable<StreamChunk> | null> {
    const building = await this.buildingRepository.findBySlug(command.tenantId, command.apartmentSlug);
    if (!building) {
      return null;
    }

    const knowledgeBase = await this.knowledgeBaseRepository.findByBuildingIdAndTenantId(building.id, command.tenantId);
    if (!knowledgeBase) {
      return null;
    }

    const systemPrompts = [
      apartmentAssistantPrompt({locale: command.locale, knowledgeBaseContent: knowledgeBase.knowledge}),
    ];

    const stream = this.llmService.chat({
      messages: command.messages,
      conversationId: command.conversationId,
      systemPrompts,
    });

    return stream as Promise<AsyncIterable<StreamChunk>>;
  }
}
