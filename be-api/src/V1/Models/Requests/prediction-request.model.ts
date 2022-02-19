import { PreditcionTypeRequestModel } from './prediction-type-request.model';

export class PreditcionRequestModel {
  readonly event_id: number;
  readonly market_type: PreditcionTypeRequestModel;
  readonly prediction: string;
}
