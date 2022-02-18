import { Prediction } from "../../Core/Model/prediction.abstract";

export interface IPredictionService {

    getOkMessage(): string;

    getBusinessError(): void;

    getPrediction(): Prediction;
}