import {Controller, Get, Param, UseGuards, Req, NotFoundException} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam} from '@nestjs/swagger';
import {QueryBus} from '@nestjs/cqrs';
import {TenantGuard, TenantRequest} from 'src/common/guards/tenant.guard';
import {BuildingInformationQuery} from '../../application/queries/building-information.query';
import {
  BuildingInformationHandler,
  BuildingInformationResult,
} from '../../application/handlers/building-information.query.handler';
import {BuildingInformationResponseSwaggerDTO} from '../dtos/building-information-response.swagger.dto';

@ApiTags('Buildings')
@Controller({path: 'buildings', version: '1'})
@UseGuards(TenantGuard)
@ApiBearerAuth()
export class BuildingsController {
  constructor(private readonly queryBus: QueryBus) {}

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

    return {data: result};
  }
}
