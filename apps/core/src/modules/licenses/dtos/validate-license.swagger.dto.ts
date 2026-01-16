import {ApiProperty} from '@nestjs/swagger';

export class ValidateLicenseSwaggerDTO {
  @ApiProperty({
    description: 'License key to validate',
    format: 'uuid',
    example: 'd4e5f6g7-h8i9-0123-def0-456789012345',
  })
  key: string;
}
