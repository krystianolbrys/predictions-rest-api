import { IPredictionStringValidator } from './predictionStringValidator.interface';

export class ScorePredictionStringValidator
  implements IPredictionStringValidator
{
  validate(value: string): boolean {
    // add implementation for "1:3" like values
    return true;
  }
}
