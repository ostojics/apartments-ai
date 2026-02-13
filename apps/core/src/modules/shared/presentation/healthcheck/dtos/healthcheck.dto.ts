import {ApiProperty} from '@nestjs/swagger';

export class HealthCheckResponseDTO {
  @ApiProperty({
    description: 'Service status',
    example: 'pass',
  })
  status: 'pass' | 'fail' | 'warn';

  @ApiProperty({
    description: 'Service name',
    example: 'core-service',
  })
  serviceId: string;

  @ApiProperty({
    example: 'Service running',
  })
  description: string;

  @ApiProperty({
    description: 'Current server time',
  })
  timestamp: string;
}
