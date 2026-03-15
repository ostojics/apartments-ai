import {ApiProperty} from '@nestjs/swagger';

export class FeedbackSubmissionSwaggerDTO {
  @ApiProperty({
    description: 'Email address for follow-up (optional)',
    example: 'john.doe@example.com',
    required: false,
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    description: 'Feedback message content',
    example: 'The app is easy to use and fast.',
  })
  message: string;
}
