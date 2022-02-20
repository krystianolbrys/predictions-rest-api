import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PredictionType } from '../Shared/predictionType';

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
