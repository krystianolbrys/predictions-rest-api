
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
        creationTime: Date,
        modificationTime: Date,
        isSoftDeleted: boolean,
        status: Status = Status.Unresolved,){
            super(id,eventId, predictionString, stringValidator, creationTime, modificationTime, isSoftDeleted, status);
        }
}