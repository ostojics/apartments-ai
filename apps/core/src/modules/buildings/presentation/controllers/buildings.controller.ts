import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  NotFoundException,
  Post,
  Body,
  Res,
  HttpCode,
  Inject,
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody} from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {TenantGuard, TenantRequest} from 'src/common/guards/tenant.guard';

import {BuildingInformationResponseSwaggerDTO} from '../dtos/building-information-response.swagger.dto';
import {BuildingInformationQuery} from 'src/modules/building-information/application/queries/building-information.query';
import {BuildingInformationResult} from 'src/modules/building-information/application/handlers/building-information.query.handler';
import {BuildingChatRequestDataSwaggerDTO} from '../dtos/building.chat.swagger.dto';
import {ChatCommand} from '../../application/commands/chat.command';
import type {StreamChunk} from '@tanstack/ai';
import {buildingInformationResponseSchema, buildingsResponseSchema} from '@host-elite/contracts';
import {BuildingsResponseSwaggerDTO} from 'src/modules/buildings/presentation/dtos/buildings-response.swagger.dto';
import {BuildingsQuery} from '../../application/queries/buildings.query';
import {BuildingSummary} from '../../application/handlers/buildings.query.handler';
import {Readable} from 'stream';
import type {Response as ExpressResponse} from 'express';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';

@ApiTags('Buildings')
@Controller({path: 'buildings', version: '1'})
@UseGuards(TenantGuard)
@ApiBearerAuth()
export class BuildingsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @Get('')
  @ApiOperation({summary: 'Get a list of buildings for the tenant'})
  @ApiResponse({
    status: 200,
    description: 'List of buildings',
    type: BuildingsResponseSwaggerDTO,
  })
  async getBuildings(@Req() req: TenantRequest): Promise<{data: BuildingSummary[]}> {
    const query = new BuildingsQuery({tenantId: req.tenant.id});
    const result = await this.queryBus.execute<BuildingsQuery, BuildingSummary[]>(query);

    return buildingsResponseSchema.parse({data: result});
  }

  @Get(':slug')
  @ApiOperation({summary: 'Get building information by slug (must belong to tenant)'})
  @ApiParam({
    name: 'slug',
    description: 'Building slug',
    example: 'sunset-apartments',
  })
  @ApiResponse({
    status: 200,
    description: 'Building information',
    type: BuildingInformationResponseSwaggerDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Building not found',
  })
  async getBuildingBySlug(
    @Param('slug') slug: string,
    @Req() req: TenantRequest,
  ): Promise<{data: BuildingInformationResult}> {
    const query = new BuildingInformationQuery({
      buildingSlug: slug,
      tenantId: req.tenant.id,
      locale: req.userContext.locale,
    });

    const result = await this.queryBus.execute<BuildingInformationQuery, BuildingInformationResult | null>(query);
    if (!result) {
      throw new NotFoundException('Building not found or no information available for this locale');
    }

    return buildingInformationResponseSchema.parse({data: result});
  }

  @Post(':slug/chat')
  @HttpCode(200)
  @ApiOperation({summary: 'Chat with apartment assistant for a specific building'})
  @ApiParam({
    name: 'slug',
    description: 'Building slug',
    example: 'sunset-apartments',
  })
  @ApiBody({type: BuildingChatRequestDataSwaggerDTO, description: 'Chat request data'})
  async chatWithBuildingAssistant(
    @Param('slug') slug: string,
    @Req() req: TenantRequest,
    @Body() body: BuildingChatRequestDataSwaggerDTO,
    @Res() res: ExpressResponse,
  ): Promise<void> {
    this.logger.log('Received chat request', req);

    const conversationId = body.data?.conversationId ?? '';
    const chatCommand = new ChatCommand({
      tenantId: req.tenant.id,
      apartmentSlug: slug,
      conversationId,
      messages: body.messages,
      locale: req.userContext.locale,
    });

    const stream: AsyncIterable<StreamChunk> | null = await this.commandBus.execute(chatCommand);
    if (!stream) {
      throw new NotFoundException('Building or knowledge base not found');
    }

    const {toServerSentEventsResponse} = await import('@tanstack/ai');
    const response = toServerSentEventsResponse(stream);

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      res.end();
      return;
    }

    Readable.fromWeb(response.body as any).pipe(res);
  }
}
