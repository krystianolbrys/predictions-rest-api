import { PredictionType } from '../../Shared/Enums/predictionType';
import { Status } from '../../Shared/Enums/status';
import { ILogger } from '../Ports/logger.interface';
import { IPredictionStringValidator } from '../Validators/predictionStringValidator.interface';
import { PredictionTime } from './prediction-time';
import { Prediction } from './prediction.abstract';

export class ScorePrediction extends Prediction {
  predictionType: PredictionType = PredictionType.Score;

  constructor(
    id: number,
    eventId: number,
    predictionString: string,
    stringValidator: IPredictionStringValidator,
    time: PredictionTime,
    isSoftDeleted: boolean,
    logger: ILogger,
    status: Status = Status.Unresolved,
  ) {
    super(
      id,
      eventId,
      predictionString,
      stringValidator,
      time,
      isSoftDeleted,
      status,
      logger,
    );
  }
}
