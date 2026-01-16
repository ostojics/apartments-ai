import {ApiProperty} from '@nestjs/swagger';

export class LicenseResponseSwaggerDTO {
  @ApiProperty({
    description: 'License ID',
    format: 'uuid',
    example: 'c3d4e5f6-g7h8-9012-cdef-345678901234',
  })
  id: string;

  @ApiProperty({
    description: 'License key',
    format: 'uuid',
    example: 'd4e5f6g7-h8i9-0123-def0-456789012345',
  })
  key: string;

  @ApiProperty({
    description: 'License expiration date',
    example: '2024-12-31T23:59:59.000Z',
  })
  expiresAt: Date;

  @ApiProperty({
    description: 'Date when license was used (null if unused)',
    example: '2024-01-15T10:30:00.000Z',
    nullable: true,
  })
  usedAt: Date | null;

  @ApiProperty({
    description: 'Optional note about the license',
    example: 'License for premium features',
    nullable: true,
  })
  note: string | null;

  @ApiProperty({
    description: 'ID of household that used this license',
    format: 'uuid',
    example: 'e5f6g7h8-i9j0-1234-ef01-567890123456',
    nullable: true,
  })
  householdId: string | null;

  @ApiProperty({
    description: 'Whether the license has been used',
    example: true,
  })
  isUsed: boolean;

  @ApiProperty({
    description: 'Whether the license has expired',
    example: false,
  })
  isExpired: boolean;

  @ApiProperty({
    description: 'Whether the license is valid (not used and not expired)',
    example: false,
  })
  isValid: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T12:00:00.000Z',
  })
  updatedAt: Date;
}
