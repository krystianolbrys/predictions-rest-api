import { PredictionRequest } from '../../Contracts/Prediction/Request/prediction-request';
import { PredictionResponse } from '../../Contracts/Prediction/Response/prediction-response';
import { Status } from '../../Shared/Enums/status';

export interface IPredictionService {
  insert(prediction: PredictionRequest): void;
  fetchAll(): Array<PredictionResponse>;
  delete(id: number): void;
  updateStatus(id: number, status: Status): void;
}
