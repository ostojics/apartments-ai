import {ApiProperty} from '@nestjs/swagger';

export class CreateHouseholdSwaggerDTO {
  @ApiProperty({
    description: 'Household name',
    example: 'Smith Family',
    maxLength: 255,
  })
  name: string;

  @ApiProperty({
    description: 'Currency code used by the household',
    example: 'USD',
    minLength: 3,
    maxLength: 3,
    pattern: '^[A-Z]{3}$',
  })
  currencyCode: string;

  @ApiProperty({
    description: 'Monthly budget for the household',
    example: 5000,
    type: 'number',
    format: 'decimal',
    minimum: 0,
  })
  monthlyBudget: number;
}
