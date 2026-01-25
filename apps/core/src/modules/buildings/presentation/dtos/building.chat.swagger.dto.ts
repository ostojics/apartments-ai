import {ApiProperty} from '@nestjs/swagger';

export class BuildingChatRequestDataSwaggerDTO {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversationId: string;

  @ApiProperty({
    description: 'Messages exchanged in the chat',
    example: ['Hello, is the apartment available?', 'Yes, it is available.'],
  })
  messages: string[];
}
