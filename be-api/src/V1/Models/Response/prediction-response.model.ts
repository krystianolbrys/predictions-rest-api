import { PredictionStatusResponseModel } from './prediction-status-response.model';
import { PreditcionTypeResponseModel } from './prediction-type-response.model';

export class PreditcionResponseModel {
  readonly event_id: number;
  readonly market_type: PreditcionTypeResponseModel;
  readonly prediction: string;
  readonly status: PredictionStatusResponseModel;

  constructor(
    event_id: number,
    prediction: string,
    market_type: PreditcionTypeResponseModel,
    status: PredictionStatusResponseModel,
  ) {
    this.event_id = event_id;
    this.prediction = prediction;
    this.market_type = market_type;
    this.status = status;
  }
}
