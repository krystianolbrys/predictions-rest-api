import { PredictionRequest } from '../../Contracts/Prediction/Request/prediction-request';
import { PredictionResponse } from '../../Contracts/Prediction/Response/prediction-response';

export interface IPredictionService {
  insert(prediction: PredictionRequest): void;
  fetchAll(): Array<PredictionResponse>;
  delete(id: number): void;
}
