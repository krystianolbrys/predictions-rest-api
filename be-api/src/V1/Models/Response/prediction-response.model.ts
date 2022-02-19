import { PredictionStatusResponseModel } from './prediction-status-response.model';
import { PreditcionTypeResponseModel } from './prediction-type-response.model';

export class PreditcionResponseModel {
  readonly id: number;
  readonly event_id: number;
  readonly market_type: PreditcionTypeResponseModel;
  readonly prediction: string;
  readonly status: PredictionStatusResponseModel;

  constructor(
    id: number,
    event_id: number,
    prediction: string,
    market_type: PreditcionTypeResponseModel,
    status: PredictionStatusResponseModel,
  ) {
    this.id = id;
    this.event_id = event_id;
    this.prediction = prediction;
    this.market_type = market_type;
    this.status = status;
  }
}
