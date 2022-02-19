import { PredictionRequest } from '../../Contracts/Prediction/Request/prediction-request';
import { Prediction } from '../../Core/Model/prediction.abstract';

export interface IPredictionService {
  insert(prediction: PredictionRequest): void;

  getOkMessage(): string;

  getBusinessError(): void;

  getPrediction(): Prediction;
}
