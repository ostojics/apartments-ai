import {ApiProperty} from '@nestjs/swagger';

export class AcceptInviteSwaggerDTO {
  @ApiProperty({
    description: 'Desired username (alphanumeric, underscore, and hyphen allowed)',
    example: 'jane_doe',
    minLength: 1,
    maxLength: 50,
    pattern: '^[a-zA-Z0-9_-]+$',
  })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'jane@example.com',
    format: 'email',
    maxLength: 255,
  })
  email: string;

  @ApiProperty({
    description: 'Password (min 8 chars, must contain uppercase, lowercase, and number)',
    example: 'StrongPass123',
    minLength: 8,
    maxLength: 128,
  })
  password: string;

  @ApiProperty({
    description: 'Password confirmation (must match password)',
    example: 'StrongPass123',
  })
  confirm_password: string;

  @ApiProperty({
    description: 'Invitation token received via email',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
