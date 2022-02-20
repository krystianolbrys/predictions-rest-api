import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from 'src/V1/BackEnd/Shared/Enums/status';

export class UpdatePredictionStatusRequestModel {
  @ApiProperty()
  @IsEnum(Status)
  readonly status: Status;
}
