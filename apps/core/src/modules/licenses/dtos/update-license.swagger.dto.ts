import {ApiProperty} from '@nestjs/swagger';

export class UpdateLicenseSwaggerDTO {
  @ApiProperty({
    description: 'Optional note about the license',
    example: 'Updated license description',
    required: false,
    maxLength: 500,
  })
  note?: string;

  @ApiProperty({
    description: 'New expiration date (must be later than current)',
    example: '2025-12-31T23:59:59.000Z',
    required: false,
  })
  expiresAt?: Date;
}
