
import { PredictionType } from "../Enums/predictionType";
import { Status } from "../Enums/status";
import { IPredictionStringValidator } from "../Validators/predictionStringValidator.interface";
import { Prediction } from "./prediction.abstract";

export class ScorePrediction extends Prediction{
    predictionType: PredictionType = PredictionType.Score;

    constructor(
        id: number,
        eventId: number,
        predictionString: string,
        stringValidator: IPredictionStringValidator,
        createadAt: Date,
        updatedAt: Date,
        status: Status = Status.Unresolved){
            super(id,eventId, predictionString, stringValidator, createadAt, updatedAt, status);
        }
}