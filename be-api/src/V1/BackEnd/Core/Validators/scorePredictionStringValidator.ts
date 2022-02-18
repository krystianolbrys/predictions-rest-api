import { IPredictionStringValidator } from "./predictionStringValidator.interface";

export class ScorePredictionStringValidator implements IPredictionStringValidator{
    validate(value: string): boolean {
        // add implementation
        return true;
    }
}