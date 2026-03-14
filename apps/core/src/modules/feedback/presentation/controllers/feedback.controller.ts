import {Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, UseGuards, UsePipes} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CommandBus} from '@nestjs/cqrs';
import {feedbackSubmissionSchema} from '@host-elite/contracts';
import type {FeedbackSubmissionDTO} from '@host-elite/contracts';

import {TenantGuard, TenantRequest} from 'src/common/guards/tenant.guard';
import {LOGGER} from 'src/libs/application/ports/di-tokens';
import {ILoggerPort} from 'src/libs/application/ports/logger.port';
import {ZodValidationPipe} from 'src/libs/pipes/zod.validation.pipe';

import {FeedbackCommand} from '../../application/commands/feedback.command';
import {FeedbackSubmissionSwaggerDTO} from '../dtos/feedback-submission.swagger.dto';

@ApiTags('Feedback')
@Controller({path: 'feedback', version: '1'})
@UseGuards(TenantGuard)
@ApiBearerAuth()
export class FeedbackController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(LOGGER) private readonly logger: ILoggerPort,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Submit user feedback'})
  @ApiBody({
    description: 'Feedback submission payload',
    type: FeedbackSubmissionSwaggerDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Feedback submitted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body',
  })
  @UsePipes(new ZodValidationPipe(feedbackSubmissionSchema))
  async submitFeedback(@Body() body: FeedbackSubmissionDTO, @Req() req: TenantRequest): Promise<{success: true}> {
    this.logger.log('Received feedback submission', req.body);

    const command = new FeedbackCommand({
      content: body.message,
      tenantId: req.tenant.id,
      feedbackMetadata: {
        email: body.email ?? null,
        submittedAt: new Date().toISOString(),
        locale: req.userContext.locale,
      },
    });

    await this.commandBus.execute(command);

    return {success: true};
  }
}
