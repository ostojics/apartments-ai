import {ApiProperty} from '@nestjs/swagger';

export class TenantInfoSwaggerDTO {
  @ApiProperty({
    description: 'Tenant ID',
    format: 'uuid',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'Tenant slug',
    example: 'example-tenant',
  })
  slug: string;

  @ApiProperty({
    description: 'Tenant name',
    example: 'Example Tenant',
  })
  name: string;
}

export class TenantCheckDataSwaggerDTO {
  @ApiProperty({
    description: 'Whether the tenant is valid',
    example: true,
  })
  isValid: boolean;

  @ApiProperty({
    description: 'Tenant information',
    type: TenantInfoSwaggerDTO,
  })
  tenant: TenantInfoSwaggerDTO;
}

export class TenantCheckResponseSwaggerDTO {
  @ApiProperty({
    description: 'Tenant check data',
    type: TenantCheckDataSwaggerDTO,
  })
  data: TenantCheckDataSwaggerDTO;
}
