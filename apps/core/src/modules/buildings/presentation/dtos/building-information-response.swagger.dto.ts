import {ApiProperty} from '@nestjs/swagger';

export class BuildingInformationDataSwaggerDTO {
  @ApiProperty({
    description: 'Building information content for the requested locale',
    example: 'Welcome to our beautiful apartment complex...',
  })
  content: string;
}

export class BuildingInformationResponseSwaggerDTO {
  @ApiProperty({
    description: 'Building information data',
    type: BuildingInformationDataSwaggerDTO,
  })
  data: BuildingInformationDataSwaggerDTO;
}
