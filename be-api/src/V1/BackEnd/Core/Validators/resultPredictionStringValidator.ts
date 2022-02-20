import { IPredictionStringValidator } from './predictionStringValidator.interface';

export class ResultPredictionStringValidator
  implements IPredictionStringValidator
{
  readonly validResults: Array<string>;

  constructor() {
    this.validResults = ['1', '2', 'X'];
  }

  validate(value: string): boolean {
    return (
      this.validResults.filter((validResult) => validResult == value).length ==
      1
    );
  }
}
