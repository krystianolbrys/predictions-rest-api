import { IPredictionStringValidator } from './predictionStringValidator.interface';

export class ScorePredictionStringValidator
  implements IPredictionStringValidator
{
  private readonly matchRegex: string;

  constructor() {
    this.matchRegex = '^[0-9]+[:][0-9]+$';
  }

  validate(value: string): boolean {
    const matches = value.match(this.matchRegex);

    if (matches == null || undefined) {
      return false;
    }

    return matches.length == 1;
  }
}
