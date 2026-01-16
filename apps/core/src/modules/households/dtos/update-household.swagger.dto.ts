import {ApiProperty} from '@nestjs/swagger';

export class UpdateHouseholdSwaggerDTO {
  @ApiProperty({
    description: 'Household name',
    example: 'Smith Family',
    maxLength: 255,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Currency code used by the household',
    example: 'USD',
    minLength: 3,
    maxLength: 3,
    pattern: '^[A-Z]{3}$',
    required: false,
  })
  currencyCode?: string;

  @ApiProperty({
    description: 'Monthly budget for the household',
    example: 6000,
    type: 'number',
    format: 'decimal',
    minimum: 0,
    required: false,
  })
  monthlyBudget?: number;
}
