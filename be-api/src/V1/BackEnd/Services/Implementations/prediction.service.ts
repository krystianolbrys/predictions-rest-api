import { Inject, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Status } from '../../Core/Enums/status';
import { BusinessException } from '../../Core/Exceptions/business.exception';
import { ILogger } from '../../Core/Ports/logger.interface';
import { Prediction } from '../../Core/Model/prediction.abstract';
import { ScorePrediction } from '../../Core/Model/score-prediction';
import { IPredictionStringValidator } from '../../Core/Validators/predictionStringValidator.interface';
import { ScorePredictionStringValidator } from '../../Core/Validators/scorePredictionStringValidator';
import { TimeProvider } from '../../Infrastructure/TimeProvider/time-provider';
import { ITimeProvider } from '../../Infrastructure/TimeProvider/time-provider.interface';
import { IPredictionService } from '../Interfaces/prediction.service.interface';
import DummyConsoleLogger from './logger';
import { PredictionTime } from '../../Core/Model/prediction-time';
import { PredictionRequest } from '../../Contracts/Prediction/Request/prediction-request';
import { PredictionType } from '../../Contracts/Prediction/Common/predictionType';

@Injectable()
export class PredictionService implements IPredictionService {
  private readonly DefaultZeroIdentifierValue: number;

  constructor(
    @Inject(TimeProvider) private readonly timeProvider: ITimeProvider,
    @Inject(DummyConsoleLogger) private readonly logger: ILogger,
  ) {
    this.DefaultZeroIdentifierValue = 0;
  }

  insert(prediction: PredictionRequest): void {
    const now = this.timeProvider.getNowUTC();
    const predictionTime = new PredictionTime(now, now);
    const scoreValidator = this.getStringValidatorBasedOnType(
      prediction.predictionType,
    );
    const notDeleted = false;

    this.logger.log(prediction.eventId.toString());

    const scorePrediction: Prediction = new ScorePrediction(
      this.DefaultZeroIdentifierValue,
      prediction.eventId,
      prediction.predictionString,
      scoreValidator,
      predictionTime,
      notDeleted,
      this.logger,
    );

    // persist
  }

  private getStringValidatorBasedOnType(
    type: PredictionType,
  ): IPredictionStringValidator {
    if (type === PredictionType.Score) {
      return new ScorePredictionStringValidator();
    }

    // if(type === PredictionType.Result){
    //   return new ResultPredictionStringValidator();
    // }

    throw new BusinessException(
      `No PredictionStringValidator for given type ${PredictionType[type]}`,
    );
  }

  getPrediction(): Prediction {
    const scoreValidator: IPredictionStringValidator =
      new ScorePredictionStringValidator();

    const now = this.timeProvider.getNowUTC();

    const predictionTime = new PredictionTime(now, now);

    const scorePrediction: Prediction = new ScorePrediction(
      1,
      2,
      '3:5',
      scoreValidator,
      predictionTime,
      false,
      this.logger,
    );

    scorePrediction.updateStatus(Status.Lost, now);
    //scorePrediction.updateStatus(Status.Win, now);

    return scorePrediction;
  }

  getBusinessError(): void {
    throw new BusinessException('getBusinessErrorExmaple');
  }

  getOkMessage(): string {
    return 'OkFromService';
  }
}
