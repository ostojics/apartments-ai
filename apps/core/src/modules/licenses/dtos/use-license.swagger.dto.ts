import {ApiProperty} from '@nestjs/swagger';

export class UseLicenseSwaggerDTO {
  @ApiProperty({
    description: 'License key to use',
    format: 'uuid',
    example: 'd4e5f6g7-h8i9-0123-def0-456789012345',
  })
  key: string;

  @ApiProperty({
    description: 'Household ID that will use this license',
    format: 'uuid',
    example: 'e5f6g7h8-i9j0-1234-ef01-567890123456',
  })
  householdId: string;
}
