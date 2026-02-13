import {Controller, Get, Header, HttpCode} from '@nestjs/common';
import {HealthCheckResponseDTO} from './dtos/healthcheck.dto';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiTags('Health')
@Controller({path: 'health', version: '1'})
export class HealthCheckController {
  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/health+json')
  @ApiOperation({summary: 'Check service health'})
  @ApiResponse({
    status: 200,
    description: 'Health check result',
    type: HealthCheckResponseDTO,
  })
  healthCheck(): HealthCheckResponseDTO {
    return {
      status: 'pass',
      serviceId: 'core-service',
      description: 'Service is running',
      timestamp: new Date().toISOString(),
    };
  }
}
