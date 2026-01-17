import {ApiProperty} from '@nestjs/swagger';

export class UseLicenseSwaggerDTO {
  @ApiProperty({
    description: 'License key to use',
    format: 'uuid',
    example: 'd4e5f6g7-h8i9-0123-def0-456789012345',
  })
  key: string;
}
