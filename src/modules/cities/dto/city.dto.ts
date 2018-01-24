import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiModelProperty() readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsInt()
  readonly totalPopulation: number;

  @ApiModelProperty()
  @IsString()
  readonly country: string;

  @ApiModelProperty()
  @IsInt()
  readonly zipCode: number;
}
