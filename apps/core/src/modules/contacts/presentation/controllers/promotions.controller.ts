import {Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus, UsePipes} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody} from '@nestjs/swagger';
import {CommandBus} from '@nestjs/cqrs';
import {TenantGuard, TenantRequest} from 'src/common/guards/tenant.guard';
import {PromotionOptInCommand} from '../../application/commands/promotion-opt-in.command';
import {PromotionSubmissionSwaggerDTO} from '../dtos/promotion-submission.swagger.dto';
import {ZodValidationPipe} from 'src/libs/pipes/zod.validation.pipe';
import {promotionSubmissionSchema} from '@acme/contracts';

@ApiTags('Promotions')
@Controller({path: 'promotions', version: '1'})
@UseGuards(TenantGuard)
@ApiBearerAuth()
export class PromotionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Receive promotion tabs submission and save for tenant'})
  @ApiBody({
    description: 'Promotion submission data',
    type: PromotionSubmissionSwaggerDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Promotion submission created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body',
  })
  @UsePipes(new ZodValidationPipe(promotionSubmissionSchema))
  async submitPromotion(@Body() body: PromotionSubmissionSwaggerDTO, @Req() req: TenantRequest): Promise<void> {
    const command = new PromotionOptInCommand({
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      preferredLanguage: body.preferredLanguage,
      tenantId: req.tenant.id,
    });

    await this.commandBus.execute(command);
  }
}
