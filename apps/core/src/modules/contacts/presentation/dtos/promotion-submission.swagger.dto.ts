import {ApiProperty} from '@nestjs/swagger';

export class PromotionSubmissionSwaggerDTO {
  @ApiProperty({
    description: 'Name of the person submitting',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number (optional)',
    example: '+1-555-123-4567',
    required: false,
    nullable: true,
  })
  phoneNumber?: string | null;

  @ApiProperty({
    description: 'Preferred language',
    example: 'en-US',
  })
  preferredLanguage: string;
}
