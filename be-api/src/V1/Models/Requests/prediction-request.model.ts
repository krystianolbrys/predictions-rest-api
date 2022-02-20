import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PredictionType } from 'src/V1/BackEnd/Shared/Enums/predictionType';

export class PredictionRequestModel {
  @ApiProperty()
  @IsNumber()
  readonly event_id: number;

  @ApiProperty()
  @IsEnum(PredictionType)
  readonly market_type: PredictionType;

  @ApiProperty()
  @IsString()
  readonly prediction: string;
}
