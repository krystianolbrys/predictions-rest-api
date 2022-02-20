import { PredictionType } from '../../Shared/Enums/predictionType';
import { Status } from '../../Shared/Enums/status';

export class PredictionDto {
  id: number;
  eventId: number;
  isSoftDeleted: boolean;
  predictionValue: string;
  predictionType: PredictionType;
  status: Status;
  creationDate: Date;
  modificationDate: Date;
}
