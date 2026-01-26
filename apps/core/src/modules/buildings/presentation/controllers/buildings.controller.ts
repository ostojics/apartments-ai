import {Controller, Get, Param, UseGuards, Req, NotFoundException} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam} from '@nestjs/swagger';
import {QueryBus} from '@nestjs/cqrs';
import {TenantGuard, TenantRequest} from 'src/common/guards/tenant.guard';

import {BuildingInformationResponseSwaggerDTO} from '../dtos/building-information-response.swagger.dto';
import {BuildingInformationQuery} from 'src/modules/building-information/application/queries/building-information.query';
import {BuildingInformationResult} from 'src/modules/building-information/application/handlers/building-information.query.handler';
import {buildingInformationResponseSchema, buildingsResponseSchema} from '@acme/contracts';
import {BuildingsResponseSwaggerDTO} from 'src/modules/buildings/presentation/dtos/buildings-response.swagger.dto';
import {BuildingsQuery} from '../../application/queries/buildings.query';
import {BuildingSummary} from '../../application/handlers/buildings.query.handler';

@ApiTags('Buildings')
@Controller({path: 'buildings', version: '1'})
@UseGuards(TenantGuard)
@ApiBearerAuth()
export class BuildingsController {
  constructor(private readonly queryBus: QueryBus) {}

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
}
