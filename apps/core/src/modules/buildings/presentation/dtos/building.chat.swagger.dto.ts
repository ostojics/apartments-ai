import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

class BuildingChatRequestDataPayloadSwaggerDTO {
  @ApiPropertyOptional({
    description: 'Conversation ID (optional when provided in root)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversationId?: string;
}

export class BuildingChatRequestDataSwaggerDTO {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversationId?: string;

  @ApiPropertyOptional({
    description: 'TanStack AI data payload (contains conversationId)',
    type: BuildingChatRequestDataPayloadSwaggerDTO,
  })
  data?: BuildingChatRequestDataPayloadSwaggerDTO;

  @ApiProperty({
    description: 'Messages exchanged in the chat',
    example: [{role: 'user', content: 'Hello, is the apartment available?'}],
  })
  messages: {role: string; content: string}[];
}
