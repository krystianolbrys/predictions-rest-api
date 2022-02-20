import { IPredictionStringValidator } from '../../Core/Validators/predictionStringValidator.interface';
import { PredictionType } from '../../Shared/Enums/predictionType';

export interface IStringValidatorProvider {
  provide(type: PredictionType): IPredictionStringValidator;
}
