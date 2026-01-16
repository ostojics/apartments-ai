import {ApiProperty} from '@nestjs/swagger';

export class InviteUserSwaggerDTO {
  @ApiProperty({
    description: 'Email address of the user to invite',
    example: 'new.member@example.com',
    format: 'email',
    maxLength: 255,
  })
  email: string;
}
