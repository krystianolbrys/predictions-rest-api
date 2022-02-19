import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum PredictionStatusRequestModel {
  Win = 'win',
  Lost = 'lost',
  Draw = 'draw',
  Unresolved = 'unresolved',
}

export class UpdatePredictionStatusRequestModel {
  @ApiProperty()
  @IsEnum(PredictionStatusRequestModel)
  readonly status: PredictionStatusRequestModel;
}
