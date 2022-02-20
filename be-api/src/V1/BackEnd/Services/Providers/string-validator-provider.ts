import { BusinessException } from '../../Core/Exceptions/business.exception';
import { IPredictionStringValidator } from '../../Core/Validators/predictionStringValidator.interface';
import { ResultPredictionStringValidator } from '../../Core/Validators/resultPredictionStringValidator';
import { ScorePredictionStringValidator } from '../../Core/Validators/scorePredictionStringValidator';
import { PredictionType } from '../../Shared/Enums/predictionType';
import { IStringValidatorProvider } from '../Interfaces/string-validator-provider.interface';

export class StringValidatorProvider implements IStringValidatorProvider {
  provide(type: PredictionType): IPredictionStringValidator {
    switch (type) {
      case PredictionType.Score:
        return new ScorePredictionStringValidator();
      case PredictionType.Result:
        return new ResultPredictionStringValidator();
      default:
        throw new BusinessException(
          `No PredictionStringValidator for given type ${PredictionType[type]}`,
        );
    }
  }
}
