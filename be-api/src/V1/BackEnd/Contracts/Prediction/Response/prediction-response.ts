import { PredictionType } from '../Common/predictionType';
import { Status } from '../Common/status';

export class PredictionResponse {
  readonly id: number;
  readonly predictionType: PredictionType;
  readonly eventId: number;
  readonly predictionString: string;
  readonly status: Status;

  constructor(
    id: number,
    eventId: number,
    predictionString: string,
    predictionType: PredictionType,
    status: Status,
  ) {
    this.id = id;
    this.eventId = eventId;
    this.predictionString = predictionString;
    this.predictionType = predictionType;
    this.status = status;
  }
}
