import {Controller, Get, UseGuards, Req} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import {QueryBus} from '@nestjs/cqrs';
import {TenantGuard, TenantRequest} from 'src/common/guards/tenant.guard';
import {TenantCheckQuery} from '../../application/queries/tenant-check.query';
import {TenantCheckResult} from '../../application/handlers/tenant-check.query.handler';
import {TenantCheckResponseSwaggerDTO} from '../dtos/tenant-check-response.swagger.dto';
import {tenantCheckResponseSchema} from '@host-elite/contracts';

@ApiTags('Tenants')
@Controller({path: 'tenants', version: '1'})
@UseGuards(TenantGuard)
@ApiBearerAuth()
export class TenantsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('check')
  @ApiOperation({summary: 'Check validity of the current tenant'})
  @ApiResponse({
    status: 200,
    description: 'Tenant check result',
    type: TenantCheckResponseSwaggerDTO,
  })
  async checkTenant(@Req() req: TenantRequest): Promise<{data: TenantCheckResult}> {
    const query = new TenantCheckQuery({slug: req.tenant.slug});
    const result = await this.queryBus.execute<TenantCheckQuery, TenantCheckResult>(query);

    return tenantCheckResponseSchema.parse({data: result});
  }
}
