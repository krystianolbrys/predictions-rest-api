import { PredictionType } from '../Shared/predictionType';
import { Status } from '../Shared/status';

export class PreditcionResponseModel {
  readonly id: number;
  readonly event_id: number;
  readonly market_type: PredictionType;
  readonly prediction: string;
  readonly status: Status;

  constructor(
    id: number,
    event_id: number,
    prediction: string,
    market_type: PredictionType,
    status: Status,
  ) {
    this.id = id;
    this.event_id = event_id;
    this.prediction = prediction;
    this.market_type = market_type;
    this.status = status;
  }
}
