import {ApiProperty} from '@nestjs/swagger';

export class BuildingSummarySwaggerDTO {
  @ApiProperty({
    description: 'Building ID',
    format: 'uuid',
    example: 'b1c2d3e4-f5a6-7890-bcde-f12345678901',
  })
  id: string;

  @ApiProperty({
    description: 'Building name',
    example: 'Sunset Apartments',
  })
  name: string;

  @ApiProperty({
    description: 'Building slug',
    example: 'sunset-apartments',
  })
  slug: string;

  @ApiProperty({
    description: 'Tenant ID',
    format: 'uuid',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  tenantId: string;

  @ApiProperty({
    description: 'Building image URL',
    example: 'https://example.com/images/building.jpg',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    description: 'Building address',
    example: '123 Main Street, City, State 12345',
    nullable: true,
  })
  address: string | null;
}

export class BuildingsResponseSwaggerDTO {
  @ApiProperty({
    description: 'List of buildings',
    type: [BuildingSummarySwaggerDTO],
  })
  data: BuildingSummarySwaggerDTO[];
}
