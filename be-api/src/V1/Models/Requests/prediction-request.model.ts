import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PreditcionTypeRequestModel } from './prediction-type-request.model';

export class PredictionRequestModel {
  @ApiProperty()
  @IsNumber()
  readonly event_id: number;

  @ApiProperty()
  @IsEnum(PreditcionTypeRequestModel)
  readonly market_type: PreditcionTypeRequestModel;

  @ApiProperty()
  @IsString()
  readonly prediction: string;
}
