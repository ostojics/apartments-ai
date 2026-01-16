import {ApiProperty} from '@nestjs/swagger';

export class CreateLicenseSwaggerDTO {
  @ApiProperty({
    description: 'License expiration date',
    example: '2024-12-31T23:59:59.000Z',
  })
  expiresAt: Date;

  @ApiProperty({
    description: 'Optional note about the license',
    example: 'License for premium features',
    required: false,
    maxLength: 500,
  })
  note?: string;
}
